import Card from './models/Card/Card';
import Validation from "./shared/Validation";
// @ts-ignore
import template from "./card.html";

class STCard {
  private _animatedCardTargetContainer: HTMLDivElement;
  private _cardNumberError: HTMLElement;
  private _cardNumberInput: HTMLInputElement;
  private _expirationDateError: HTMLElement;
  private _expirationDateInput: HTMLInputElement;
  private _securityCodeError: HTMLElement;
  private _securityCodeInput: HTMLInputElement;
  private _card: Card;
  private _validation: Validation;

  constructor(config: any) {
    const {fields: {inputs, errors}, animatedCardContainer} = config;
    this._addInputs(inputs);
    this._addInputErrorLabels(errors);
    this._addAnimatedCardContainer(animatedCardContainer);
    this._validation = new Validation();
    Card.ifCardWrapperExist() && (this._card = new Card(config));
  }

  public onCardNumberInput(id: string, callback: any) {
    this._cardNumberInput.addEventListener('input', (event) => {
      callback(event);
      this._card.onCardNumberChanged(this._cardNumberInput.value);
      this._validation.keepCursorAtSamePosition(this._cardNumberInput)
    });
    this._cardNumberInput.addEventListener('paste', () => {

    });
    this._cardNumberInput.addEventListener('keydown', (event: any) => {
      this._validation.setKeyDownProperties(this._cardNumberInput, event);
    });
  }

  public onExpirationDateInput(id: string, callback: any) {
    this._expirationDateInput.addEventListener('input', (event) => {
      callback(event);
      this._card.onExpirationDateChanged(this._expirationDateInput.value);
      this._validation.keepCursorAtSamePosition(this._expirationDateInput)
    });
    this._expirationDateInput.addEventListener('paste', () => {

    });
    this._expirationDateInput.addEventListener('keydown', (event: any) => {
      this._validation.setKeyDownProperties(this._expirationDateInput, event);
    });
  }

  public onSecurityCodeInput(id: string, callback: any) {
    this._securityCodeInput.addEventListener('input', (event) => {
      callback(event);
      this._card.onSecurityCodeChanged(this._securityCodeInput.value);
    });

    this._securityCodeInput.addEventListener('focus', (event) => {
      this._card.flipCard();
    });

    this._securityCodeInput.addEventListener('blur', (event) => {
      this._validation.validate(this._securityCodeInput, this._expirationDateError);
      this._card.flipCard();
    });
  }

  private _addInputs(inputs: any) {
    this._cardNumberInput = document.getElementById(inputs.cardNumber) as HTMLInputElement;
    this._expirationDateInput = document.getElementById(inputs.expirationDate) as HTMLInputElement;
    this._securityCodeInput = document.getElementById(inputs.securityCode) as HTMLInputElement;
  }

  private _addInputErrorLabels(errors: any) {
    this._cardNumberError = document.getElementById(errors.cardNumber) as HTMLInputElement;
    this._expirationDateError = document.getElementById(errors.expirationDate) as HTMLInputElement;
    this._securityCodeError = document.getElementById(errors.securityCode) as HTMLInputElement;
  }

  private _addAnimatedCardContainer(animatedCardContainer: string) {
    this._animatedCardTargetContainer = document.getElementById(animatedCardContainer) as HTMLDivElement;
    this._animatedCardTargetContainer.innerHTML = template;
  }
}

export default (config: any) => new STCard(config);
