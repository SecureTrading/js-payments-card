import Translator from "../models/Translation/Translation";

type input = "PAN" | "CODE" | 'DATE';

/**
 * Base class for validation, aggregates common methods and attributes for all subclasses
 */
export default class Validation {
  public static ERROR_FIELD_CLASS: string = 'error-field';
  private static LUHN_CHECK_ARRAY: number[] = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

  /**
   * Method for prevent inserting non digits
   * @param event
   */
  public static isCharNumber(event: KeyboardEvent) {
    const key: string = event.key;
    const regex = new RegExp(Validation.ONLY_DIGITS_REGEXP);
    return regex.test(key);
  }

  public setValidity(inputElement: HTMLInputElement, errorContent: string) {
    return this._errorMessage && inputElement.setCustomValidity(errorContent);
  }

  /**
   * Gets validity state from input object and sets proper Validation message.
   * @param validityState
   * @private
   */
  public static getMessage(validityState: ValidityState): string {
    const {customError, patternMismatch, valid, valueMissing} = validityState;
    let validationMessage: string = '';
    if (!valid) {
      if (valueMissing) {
        validationMessage = 'field is required';
      } else if (patternMismatch) {
        validationMessage = 'pattern mismatch';
      } else if (customError) {
        validationMessage = 'Validation error';
      } else {
        validationMessage = '';
      }
    }
    return validationMessage;
  }

  private static BACKEND_ERROR_FIELDS_NAMES = {
    cardNumber: 'pan',
    expirationDate: 'expirydate',
    securityCode: 'securitycode'
  };
  private static ENTER_KEY_CODE = 13;
  private static ONLY_DIGITS_REGEXP = /^[0-9]*$/;
  private _translator: Translator;
  private _luhnPassed: boolean;
  private _errorMessage: string;

  public validate(inputType: input, inputId: string, labelId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const label = document.getElementById(labelId) as HTMLInputElement;
    const {validity, value} = input;
    this._errorMessage = Validation.getMessage(validity);
    inputType === 'PAN' && this._panDedicatedValidation(value, input);
    this.setValidity(input, this._errorMessage);
    label.textContent = this._errorMessage;
    console.log(this._errorMessage);
    this._toggleErrorClass(input);
  }

  private _panDedicatedValidation(value: string, input: HTMLInputElement){
    this._luhnCheck(value);
    !this._luhnPassed && (this._errorMessage = 'Luhn failed');
  }

  private _luhnCheck(cardNumber: string) {
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

    const luhnCheck = sum && sum % 10 === 0;
    this._luhnPassed = luhnCheck;
    return luhnCheck;
  }


  private _toggleErrorClass = (input: HTMLInputElement) => {
    input.validity.valid
      ? input.classList.remove(Validation.ERROR_FIELD_CLASS)
      : input.classList.add(Validation.ERROR_FIELD_CLASS);
  };


  private _getProperTranslation(
    inputElement: HTMLInputElement,
    isCardNumberInput: boolean,
    validityState: string,
    messageElement?: HTMLElement,
    customErrorMessage?: string
  ) {
    if (messageElement && customErrorMessage && !isCardNumberInput) {
      return this._translator.translate(customErrorMessage);
    } else if (messageElement && inputElement.value && isCardNumberInput && !inputElement.validity.valid) {
      return this._translator.translate('pattern mismatch');
    } else {
      return this._translator.translate(validityState);
    }
  }

}
