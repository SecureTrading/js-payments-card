import BinLookup from "./BinLookup";
import Utils from "./Utils";
import {BrandDetailsType} from "../imports/card/card-type";

class Validation {
  private static DATA_NON_NUMERIC: RegExp = /\D/g;
  private static DATA_NON_NUMERIC_EXCEPT_SLASH: RegExp = /[^0-9\/]/g;
  private static DELETE_KEY_CODE: number = 46;
  private static DISABLE_FIELD_CLASS: string = 'st-input--disabled';
  private static DISABLE_STATE: string = 'disabled';
  private static INPUT_PATTERN: string = '^(0[1-9]|1[0-2])\\/([0-9]{2})$';
  private static BACKSPACE_KEY_CODE: number = 8;
  private static ONLY_DIGITS_REGEXP = /[^\d]/g;
  private static EXPIRATION_DATE_DIGITS_AMOUNT = 4;
  private static EXPIRATION_DATE_FORMAT = /^([\d]{2})([\d]{2})$/;
  private static EXPIRATION_DATE_REPLACE_VALUE = '$1/$2';
  private static DATA_NON_NUMERIC_EXCEPT_SPACE: RegExp = /[^0-9\ ]/g;
  public static SPECIAL_LENGTH_PATTERN: string = '^[0-9]{4}$';
  public static STANDARD_LENGTH_PATTERN: string = '^[0-9]{3}$';
  protected binLookup: BinLookup;
  protected cardNumberValue: string;
  protected expirationDateValue: string;
  protected securityCodeValue: string;

  constructor() {
    this.binLookup = new BinLookup();
  }

  protected cardNumber(value: string) {
    this.cardNumberValue = this.removeNonDigits(value);
    const length = Utils.getLastElementOfArray(this.getCardDetails(this.cardNumberValue).length);
    this.cardNumberValue = this.limitLength(this.cardNumberValue, length);
  }

  protected expirationDate(value: string) {
    this.expirationDateValue = this.removeNonDigits(value);
  }

  protected securityCode(value: string) {
    this.securityCodeValue = this.removeNonDigits(value);
    const length = Utils.getLastElementOfArray(this.getCardDetails(this.cardNumberValue).cvcLength);
    this.securityCodeValue = this.limitLength(this.securityCodeValue, length);
  }

  protected removeNonDigits(value: string) {
    return value.replace(Validation.ONLY_DIGITS_REGEXP, '');
  };

  protected trimExceptSpace(data: string): string {
    return data.trim().replace(Validation.DATA_NON_NUMERIC_EXCEPT_SPACE, '');
  }

  protected limitLength(value: string, length: number): string {
    return value.substring(0, length);
  }

  protected getCardDetails(cardNumber: string): BrandDetailsType {
    return this.binLookup.binLookup(cardNumber).type ? this.binLookup.binLookup(cardNumber) : undefined;
  }

}

export default Validation;
