import Translator from '../models/Translation';
import Utils from './Utils';
import { iinLookup } from '@securetrading/ts-iin-lookup';
import { BrandDetailsType } from '@securetrading/ts-iin-lookup/dist/types';
import { luhnCheck } from '@securetrading/ts-luhn-check';

class Validation {
  protected static STANDARD_FORMAT_PATTERN: string = '(\\d{1,4})(\\d{1,4})?(\\d{1,4})?(\\d+)?';
  private static BACKSPACE_KEY_CODE: number = 8;
  private static CARD_NUMBER_DEFAULT_LENGTH: number = 16;
  private static DELETE_KEY_CODE: number = 46;
  private static MATCH_CHARS = /[^\d]/g;
  private static MATCH_DIGITS = /^[0-9]*$/;
  private static SECURITY_CODE_DEFAULT_LENGTH: number = 3;
  private static ERROR_CLASS: string = 'error';
  private static CURSOR_SINGLE_SKIP: number = 1;
  private static CURSOR_DOUBLE_SKIP: number = 2;

  protected cardNumberValue: string;
  protected expirationDateValue: string;
  protected securityCodeValue: string;
  private _translator: Translator;
  private _currentKeyCode: number;
  private _selectionRangeEnd: number;
  private _selectionRangeStart: number;
  private _matchDigitsRegexp: RegExp;
  private _cursorSkip: number = 0;

  constructor(locale: string) {
    this._translator = new Translator(locale);
    this._matchDigitsRegexp = new RegExp(Validation.MATCH_DIGITS);
  }

  public setKeyDownProperties(element: HTMLInputElement, event: KeyboardEvent) {
    this._currentKeyCode = event.keyCode;
    this._selectionRangeStart = element.selectionStart;
    this._selectionRangeEnd = element.selectionEnd;
  }

  public keepCursorAtSamePosition(element: HTMLInputElement) {
    const lengthFormatted: number = element.value.length;
    const isLastCharSlash: boolean = element.value.charAt(lengthFormatted - 2) === '/';
    const start: number = this._selectionRangeStart;
    const end: number = this._selectionRangeEnd;

    if (this._isPressedKeyDelete()) {
      element.setSelectionRange(start, end);
    } else if (this._isPressedKeyBackspace()) {
      element.setSelectionRange(start - Validation.CURSOR_SINGLE_SKIP, end - Validation.CURSOR_SINGLE_SKIP);
    } else if (isLastCharSlash) {
      ++this._cursorSkip;
      element.setSelectionRange(start + Validation.CURSOR_DOUBLE_SKIP, end + Validation.CURSOR_DOUBLE_SKIP);
    } else if (element.value.charAt(end) === ' ') {
      ++this._cursorSkip;
      element.setSelectionRange(start + Validation.CURSOR_DOUBLE_SKIP, end + Validation.CURSOR_DOUBLE_SKIP);
    } else {
      element.setSelectionRange(start + Validation.CURSOR_SINGLE_SKIP, end + Validation.CURSOR_SINGLE_SKIP);
    }
  }

  public luhnCheck(element: HTMLInputElement) {
    const { value } = element;
    luhnCheck(value) ? element.setCustomValidity('') : element.setCustomValidity('luhn');
  }

  public validate(element: HTMLInputElement, errorContainer: HTMLElement) {
    const { customError, patternMismatch, valid, valueMissing } = element.validity;
    if (!valid) {
      if (valueMissing) {
        this._setError(element, errorContainer, 'Field is required');
      } else if (patternMismatch) {
        this._setError(element, errorContainer, 'Value mismatch pattern');
      } else if (customError) {
        this._setError(element, errorContainer, 'Value mismatch pattern');
      } else {
        this._setError(element, errorContainer, 'Invalid field');
      }
    } else {
      this._removeError(element, errorContainer);
    }
  }

  public onPaste(event: ClipboardEvent) {
    let { clipboardData } = event;
    event.preventDefault();
    if (typeof clipboardData === 'undefined') {
      // @ts-ignore
      clipboardData = window.clipboardData.getData('Text');
    } else {
      // @ts-ignore
      clipboardData = event.clipboardData.getData('text/plain');
    }
    return clipboardData;
  }

  protected cardNumber(value: string) {
    this.cardNumberValue = this.removeNonDigits(value);
    const cardDetails = this.getCardDetails(this.cardNumberValue);
    const length = cardDetails.type
      ? Utils.getLastElementOfArray(cardDetails.length)
      : Validation.CARD_NUMBER_DEFAULT_LENGTH;
    this.cardNumberValue = this.limitLength(this.cardNumberValue, length);
  }

  protected expirationDate(value: string) {
    this.expirationDateValue = this.removeNonDigits(value);
  }

  protected securityCode(value: string) {
    this.securityCodeValue = this.removeNonDigits(value);
    const cardDetails = this.getCardDetails(this.cardNumberValue);
    const cardLength = Utils.getLastElementOfArray(cardDetails.cvcLength);
    const length = cardDetails.type && cardLength ? cardLength : Validation.SECURITY_CODE_DEFAULT_LENGTH;
    this.securityCodeValue = this.limitLength(this.securityCodeValue, length);
  }

  protected getCardDetails(cardNumber: string = ''): BrandDetailsType {
    return iinLookup.lookup(cardNumber);
  }

  protected _isPressedKeyBackspace(): boolean {
    return this._currentKeyCode === Validation.BACKSPACE_KEY_CODE;
  }

  protected _isPressedKeyDelete(): boolean {
    return this._currentKeyCode === Validation.DELETE_KEY_CODE;
  }

  protected limitLength(value: string, length: number): string {
    return value.substring(0, length);
  }

  protected removeNonDigits(value: string): string {
    return value.replace(Validation.MATCH_CHARS, '');
  }

  private _setError(element: HTMLInputElement, errorContainer: HTMLElement, errorMessage: string) {
    element.classList.add(Validation.ERROR_CLASS);
    errorContainer.textContent = this._translator.translate(errorMessage);
  }

  private _removeError(element: HTMLInputElement, errorContainer: HTMLElement) {
    element.classList.remove(Validation.ERROR_CLASS);
    errorContainer.textContent = '';
  }
}

export default Validation;
