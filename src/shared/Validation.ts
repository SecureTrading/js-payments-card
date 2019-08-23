import Translator from "../models/Translation/Translation";
import Formatter from "./Formatter";

type input = "PAN" | "CODE" | 'DATE';

export default class Validation {
  public static ERROR_FIELD_CLASS: string = 'error-field';
  private static LUHN_CHECK_ARRAY: number[] = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  private _errorMessage: string;
  private _luhnPassed: boolean;
  private _translator: Translator;

  public validate(inputType: input, inputId: string, labelId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const label = document.getElementById(labelId) as HTMLElement;

    this._translator = new Translator('en_GB');
    input.value = Formatter.trimNonNumeric(input.value);
    this._getMessage(input.validity);
    inputType === 'PAN' && this._panDedicatedValidation(input.value);
    this._setValidity(input, this._errorMessage);
    this._toggleErrorClass(input);
    this._translate(this._errorMessage);
    this._insertErrorMessage(label);
  }

  private _panDedicatedValidation(value: string) {
    this._luhnCheck(value);
    return !this._luhnPassed && (this._errorMessage = 'Value mismatch pattern');
  }

  private _insertErrorMessage(label: HTMLElement) {
    return label.textContent = this._errorMessage;
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
    return this._luhnPassed = sum && sum % 10 === 0;
  }


  private _toggleErrorClass(input: HTMLInputElement) {
    return input.validity.valid
      ? input.classList.remove(Validation.ERROR_FIELD_CLASS)
      : input.classList.add(Validation.ERROR_FIELD_CLASS);
  };

  private _setValidity(inputElement: HTMLInputElement, errorContent: string) {
    return this._errorMessage && inputElement.setCustomValidity(errorContent);
  }

  private _translate(content: string) {
    return this._errorMessage = this._translator.translate(content);
  }

  private _getMessage(validityState: ValidityState) {
    const {customError, patternMismatch, valid, valueMissing} = validityState;
    if (!valid) {
      if (valueMissing) {
        this._errorMessage = 'field is required';
      } else if (patternMismatch) {
        this._errorMessage = 'pattern mismatch';
      } else if (customError) {
        this._errorMessage = 'Validation error';
      } else {
        this._errorMessage = '';
      }
    }
  }
}
