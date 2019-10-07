import { BrandDetailsType } from '../imports/card/card-type';
import Translator from '../models/Translation';
import BinLookup from './BinLookup';
import Utils from './Utils';

class Validation {
  protected static STANDARD_FORMAT_PATTERN: string = '(\\d{1,4})(\\d{1,4})?(\\d{1,4})?(\\d+)?';
  private static BACKSPACE_KEY_CODE: number = 8;
  private static CARD_NUMBER_DEFAULT_LENGTH: number = 16;
  private static DELETE_KEY_CODE: number = 46;
  private static MATCH_CHARS = /[^\d]/g;
  private static MATCH_DIGITS = /^[0-9]*$/;
  private static SECURITY_CODE_DEFAULT_LENGTH: number = 3;
  private static LUHN_CHECK_ARRAY: number[] = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  private static ERROR_CLASS: string = 'error';
  private static CURSOR_SINGLE_SKIP: number = 1;
  private static CURSOR_DOUBLE_SKIP: number = 2;

  protected binLookup: BinLookup;
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
    this.binLookup = new BinLookup();
    this._translator = new Translator(locale);
    this._matchDigitsRegexp = new RegExp(Validation.MATCH_DIGITS);
  }

  public setKeyDownProperties(element: HTMLInputElement, event: KeyboardEvent) {
    this._currentKeyCode = event.keyCode;
    this._selectionRangeStart = element.selectionStart;
    this._selectionRangeEnd = element.selectionEnd;
  }

  public keepCursorAtSamePosition(element: HTMLInputElement, nonformat?: string) {
    console.log(element);
    const lengthNonFormat: number = nonformat ? nonformat.length : 0;
    const lengthFormatted: number = element.value.length;
    const isLastCharSlash: boolean = element.value.charAt(lengthFormatted - 2) === '/';

    if (this._isPressedKeyDelete()) {
      element.setSelectionRange(this._selectionRangeStart, this._selectionRangeEnd);
    } else if (this._isPressedKeyBackspace()) {
      element.setSelectionRange(
        this._selectionRangeStart - Validation.CURSOR_SINGLE_SKIP,
        this._selectionRangeEnd - Validation.CURSOR_SINGLE_SKIP
      );
    } else if (isLastCharSlash) {
      ++this._cursorSkip;
      element.setSelectionRange(
        this._selectionRangeStart + Validation.CURSOR_DOUBLE_SKIP,
        this._selectionRangeEnd + Validation.CURSOR_DOUBLE_SKIP
      );
    } else if (lengthFormatted - lengthNonFormat > 0) {
      ++this._cursorSkip;
      element.setSelectionRange(
        this._selectionRangeStart + Validation.CURSOR_DOUBLE_SKIP,
        this._selectionRangeEnd + Validation.CURSOR_DOUBLE_SKIP
      );
    } else {
      element.setSelectionRange(
        this._selectionRangeStart + Validation.CURSOR_SINGLE_SKIP,
        this._selectionRangeEnd + Validation.CURSOR_SINGLE_SKIP
      );
    }
  }

  public luhnCheck(element: HTMLInputElement) {
    const { value } = element;
    this._luhnAlgorithm(value) ? element.setCustomValidity('') : element.setCustomValidity('luhn');
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
    return this.binLookup.binLookup(cardNumber);
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

  private _isNumber(key: string): boolean {
    return this._matchDigitsRegexp.test(key);
  }

  /**
   * Luhn Algorithm
   * From the right:
   *    Step 1: take the value of this digit
   *    Step 2: if the offset from the end is even
   *    Step 3: double the value, then sum the digits
   *    Step 4: if sum of those above is divisible by ten, YOU PASS THE LUHN !
   * @param cardNumber
   * @private
   */
  private _luhnAlgorithm(cardNumber: string): boolean {
    const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, '');
    let bit = 1;
    let cardNumberLength = cardNumberWithoutSpaces.length;
    let sum = 0;

    while (cardNumberLength) {
      const val = parseInt(cardNumberWithoutSpaces.charAt(--cardNumberLength), 10);
      bit = bit ^ 1;
      const algorithmValue = bit ? Validation.LUHN_CHECK_ARRAY[val] : val;
      sum += algorithmValue;
    }
    return sum && sum % 10 === 0;
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
