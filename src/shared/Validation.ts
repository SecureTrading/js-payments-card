import BinLookup from "./BinLookup";
import Utils from "./Utils";
import { BrandDetailsType } from "../imports/card/card-type";

class Validation {
  private static BACKSPACE_KEY_CODE: number = 8;
  private static CARD_NUMBER_DEFAULT_LENGTH: number = 16;
  private static DELETE_KEY_CODE: number = 46;
  private static ONLY_DIGITS_REGEXP = /[^\d]/g;
  private static SECURITY_CODE_DEFAULT_LENGTH: number = 3;
  protected static STANDARD_FORMAT_PATTERN: string = "(\\d{1,4})(\\d{1,4})?(\\d{1,4})?(\\d+)?";
  protected binLookup: BinLookup;
  protected cardNumberValue: string;
  protected expirationDateValue: string;
  protected securityCodeValue: string;
  private _currentKeyCode: number;
  private _selectionRangeEnd: number;
  private _selectionRangeStart: number;

  constructor() {
    this.binLookup = new BinLookup();
  }

  public setKeyDownProperties(element: HTMLInputElement, event: KeyboardEvent) {
    this._currentKeyCode = event.keyCode;
    this._selectionRangeStart = element.selectionStart;
    this._selectionRangeEnd = element.selectionEnd;
  }

  public keepCursorAtSamePosition(element: HTMLInputElement) {
    if (this._isPressedKeyDelete()) {
      element.setSelectionRange(this._selectionRangeStart, this._selectionRangeEnd);
    }
  }

  protected cardNumber(value: string) {
    this.cardNumberValue = this.removeNonDigits(value);
    const cardDetails = this.getCardDetails(this.cardNumberValue);
    const length = cardDetails.type ? Utils.getLastElementOfArray(cardDetails.length) : Validation.CARD_NUMBER_DEFAULT_LENGTH;
    this.cardNumberValue = this.limitLength(this.cardNumberValue, length);
  }

  protected expirationDate(value: string) {
    this.expirationDateValue = this.removeNonDigits(value);
  }

  protected securityCode(value: string) {
    this.securityCodeValue = this.removeNonDigits(value);
    const cardDetails = this.getCardDetails(this.cardNumberValue);
    const length = cardDetails.type ? Utils.getLastElementOfArray(cardDetails.cvcLength) : Validation.SECURITY_CODE_DEFAULT_LENGTH;
    this.securityCodeValue = this.limitLength(this.securityCodeValue, length);
  }

  protected getCardDetails(cardNumber: string = ""): BrandDetailsType {
    return this.binLookup.binLookup(cardNumber);
  }

  protected _isPressedKeyDelete(): boolean {
    return (
      this._currentKeyCode === Validation.DELETE_KEY_CODE ||
      this._currentKeyCode === Validation.BACKSPACE_KEY_CODE
    );
  }

  protected limitLength(value: string, length: number): string {
    return value.substring(0, length);
  }

  protected removeNonDigits(value: string) {
    return value.replace(Validation.ONLY_DIGITS_REGEXP, "");
  };

  public validate(element: HTMLInputElement, errorContainer: HTMLElement, customCondition?: string) {
    const { customError, patternMismatch, typeMismatch, valid, valueMissing } = element.validity;
    if (customCondition) {
      element.setCustomValidity("custom validity");
    }
    if (!valid) {
      if (valueMissing) {
        element.classList.add("error");
        errorContainer.textContent = "Field is required";
      } else if (patternMismatch) {
        errorContainer.textContent = "Pattern mismatch";
      } else {
        errorContainer.textContent = customCondition;
      }
    } else {
      errorContainer.textContent = "";
      element.classList.remove("error");
    }
  }
}

export default Validation;
