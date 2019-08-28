import Utils from "./Utils";
import Validation from "./Validation";

class Formatter extends Validation {
  private static BLOCKS: number[] = [2, 2];
  private _cardNumberFormatted: string;
  private _date: string[] = ['', ''];

  constructor() {
    super();
  }

  public number(cardNumber: string, id?: string) {
    super.cardNumber(cardNumber);
    const element: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    let cardNumberCleaned: string = this.removeNonDigits(this.cardNumberValue);
    element.value = cardNumberCleaned;
    const format = this.getCardDetails(cardNumberCleaned).format;
    const previousValue = cardNumberCleaned;
    let value = previousValue;
    let selectEnd = element.selectionEnd;
    let selectStart = element.selectionStart;

    if (format && value.length > 0) {
      value = Utils.stripChars(value, undefined);
      let matches = value.match(new RegExp(format, '')).slice(1);
      if (Utils.inArray(matches, undefined)) {
        matches = matches.slice(0, matches.indexOf(undefined));
      }
      const matched = matches.length;
      if (this.binLookup.binLookup(value).format && matched > 1) {
        const preMatched = previousValue.split(' ').length;
        selectStart += matched - preMatched;
        selectEnd += matched - preMatched;
        value = matches.join(' ');
      }
    }

    if (value !== previousValue) {
      Utils.setElementAttributes({value}, element);
      element.setSelectionRange(selectStart, selectEnd);
    }
    this._cardNumberFormatted = value;
    this.cardNumberValue = value.replace(/\s/g, '');
    return value;
  }

  public date(value: string, id: string) {
    super.expirationDate(value);
    let date: string = this.removeNonDigits(value);
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

  public code(value: string, id: string) {
    super.securityCode(value);
    const element: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    let securityCodeCleaned: string = this.removeNonDigits(this.securityCodeValue);
    element.value = securityCodeCleaned;
    return securityCodeCleaned;
  }

  private _getISOFormatDate(previousDate: string[], currentDate: string[]) {
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
    return this._getISOFormatDate(this._date, date);
  }

  public maskDate(data: string): string {
    let date: string = this.removeNonDigits(data);
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

}

export default Formatter;
