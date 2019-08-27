import BinLookup from "./BinLookup";
import Utils from "./Utils";

class Formatter {
  public static SPECIAL_LENGTH_PATTERN: string = '^[0-9]{4}$';
  public static STANDARD_LENGTH_PATTERN: string = '^[0-9]{3}$';
  private static DATA_NON_NUMERIC: RegExp = /\D/g;
  private static DATA_NON_NUMERIC_EXCEPT_SLASH: RegExp = /[^0-9\/]/g;
  private static DATA_NON_NUMERIC_EXCEPT_SPACE: RegExp = /[^0-9\ ]/g;
  private static BACKSPACE_KEY_CODE: number = 8;
  private static BLOCKS: number[] = [2, 2];
  private static DELETE_KEY_CODE: number = 46;
  private static DISABLE_FIELD_CLASS: string = 'st-input--disabled';
  private static DISABLE_STATE: string = 'disabled';
  private static INPUT_PATTERN: string = '^(0[1-9]|1[0-2])\\/([0-9]{2})$';
  private static ONLY_DIGITS_REGEXP = /[^\d]/g;
  private static EXPIRATION_DATE_DIGITS_AMOUNT = 4;
  private static EXPIRATION_DATE_FORMAT = /^([\d]{2})([\d]{2})$/;
  private static EXPIRATION_DATE_REPLACE_VALUE = '$1/$2';
  private _binLookup: BinLookup;
  private _cardNumberValue: string;
  private readonly _cardNumberField: HTMLInputElement;
  private _cardNumberFormatted: string;
  private _date: any;

  constructor(){
    this._binLookup = new BinLookup()
  }

  public maskExpirationDateOnPaste(data: string): string {
    let date: string = Formatter._clearNonDigitsChars(data);
    let result: string = '';

    Formatter.BLOCKS.forEach(length => {
      if (date.length > 0) {
        const sub = date.slice(0, length);
        const rest = date.slice(length);
        result += sub;
        date = rest;
      }
    });
    return this._getFixedDateString(result);
  }

  public static trimNonNumericExceptSpace(data: string): string {
    return data.trim().replace(Formatter.DATA_NON_NUMERIC_EXCEPT_SPACE, '');
  }

  public static trimNonNumeric(data: string): string {
    return data.trim().replace(Formatter.DATA_NON_NUMERIC, '');
  }

  private static _clearNonDigitsChars = (value: string) => {
    return value.replace(Formatter.ONLY_DIGITS_REGEXP, '');
  };


  private static _getISOFormatDate(previousDate: string[], currentDate: string[]) {
    const currentDateMonth = currentDate[0];
    const currentDateYear = currentDate[1];
    const previousDateYear = previousDate[1];

    if (!currentDateMonth.length) {
      return '';
    } else if (currentDateMonth.length && currentDateYear.length === 0) {
      return currentDateMonth;
    } else if (currentDateMonth.length === 2 && currentDateYear.length === 1 && previousDateYear.length === 0) {
      return currentDateMonth + '/' + currentDateYear;
    } else if (
      (currentDateMonth.length === 2 &&
        currentDateYear.length === 1 &&
        (previousDateYear.length === 1 || previousDateYear.length === 2)) ||
      (currentDateMonth.length === 2 && currentDateYear.length === 2)
    ) {
      return currentDateMonth + '/' + currentDateYear;
    }
  }

  private _getFixedDateString(value: string) {
    let date: string[];
    let month;
    let year;
    month = value.slice(0, 2);
    year = value.slice(2, 4);
    date = [month, year];
    return Formatter._getISOFormatDate(this._date, date);
  }

  private _getValidatedDate(value: string) {
    let date: string = Formatter._clearNonDigitsChars(value);
    let result: string = '';

    Formatter.BLOCKS.forEach(length => {
      if (date.length > 0) {
        const sub = date.slice(0, length);
        const rest = date.slice(length);
        result += sub;
        date = rest;
      }
    });
    return this._getFixedDateString(result);
  }

  private _formatCardNumber(cardNumber: string) {
    const format = this._getCardFormat(cardNumber);
    const previousValue = cardNumber;
    let value = previousValue;
    let selectEnd = this._cardNumberField.selectionEnd;
    let selectStart = this._cardNumberField.selectionStart;

    if (format && value.length > 0) {
      value = Utils.stripChars(value, undefined);
      let matches = value.match(new RegExp(format, '')).slice(1);
      if (Utils.inArray(matches, undefined)) {
        matches = matches.slice(0, matches.indexOf(undefined));
      }
      const matched = matches.length;
      if (this._binLookup.binLookup(value).format && matched > 1) {
        const preMatched = previousValue.split(' ').length;
        selectStart += matched - preMatched;
        selectEnd += matched - preMatched;
        value = matches.join(' ');
      }
    }

    if (value !== previousValue) {
      this._setCardNumberAttributes({ value });
      this._cardNumberField.setSelectionRange(selectStart, selectEnd);
    }
    this._cardNumberFormatted = value;
    this._cardNumberValue = value.replace(/\s/g, '');
    return value;
  }

  private _getCardFormat = (cardNumber: string) =>
    this._getBinLookupDetails(cardNumber) ? this._getBinLookupDetails(cardNumber).format : undefined;

  private _getBinLookupDetails = (cardNumber: string) =>
    this._binLookup.binLookup(cardNumber).type ? this._binLookup.binLookup(cardNumber) : undefined;

  private _setCardNumberAttributes(attributes: any) {
    for (const attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        const value = attributes[attribute];
        if (Utils.inArray(['value'], attribute)) {
          // @ts-ignore
          this._cardNumberField[attribute] = value;
        } else if (value === false) {
          this._cardNumberField.removeAttribute(attribute);
        } else {
          this._cardNumberField.setAttribute(attribute, value);
        }
      }
    }
  }
}

export default Formatter;
