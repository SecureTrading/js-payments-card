// @ts-ignore
import template from './card.html';
import {
  CARD_NUMBER_PROPERTIES,
  EXPIRATION_DATE_PROPERTIES,
  SECURITY_CODE_PROPERTIES
} from './imports/card/card-properties';
import Card from './models/Card/Card';
import Validation from './shared/Validation';

class STCard {
  private static MATCH_EXACTLY_THREE_DIGITS: string = '^[0-9]{3}$';
  private static MATCH_EXACTLY_FOUR_DIGITS: string = '^[0-9]{4}$';
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
    const {
      fields: { inputs, errors },
      animatedCardContainer,
      locale
    } = config;
    this._addInputs(inputs);
    this._addInputErrorLabels(errors);
    this._addAnimatedCardContainer(animatedCardContainer);
    this._validation = new Validation(locale);
    if (Card.ifCardWrapperExist()) {
      this._card = new Card(config);
    }
  }

  public onCardNumberInput(id: string, callback: any) {
    this._cardNumberInput.addEventListener('blur', () => {
      this._validation.luhnCheck(this._cardNumberInput);
      this._validation.validate(this._cardNumberInput, this._cardNumberError);
    });

    this._cardNumberInput.addEventListener('input', (event: KeyboardEvent) => {
      callback(event);
      const { nonformat } = this._card.onCardNumberChanged(this._cardNumberInput.value);
      this._changeSecurityCodePattern(this._cardNumberInput.value);
      this._validation.keepCursorAtSamePosition(this._cardNumberInput, nonformat);
    });

    this._cardNumberInput.addEventListener('keydown', (event: any) => {
      this._validation.setKeyDownProperties(this._cardNumberInput, event);
    });

    this._cardNumberInput.addEventListener('paste', (event: ClipboardEvent) => {
      const value = this._validation.onPaste(event);
      // @ts-ignore
      this._card.onCardNumberChanged(value);
      this._changeSecurityCodePattern(this._cardNumberInput.value);
      this._validation.keepCursorAtSamePosition(this._cardNumberInput);
    });
  }

  public onExpirationDateInput(id: string, callback: any) {
    this._expirationDateInput.addEventListener('blur', () => {
      this._validation.validate(this._expirationDateInput, this._expirationDateError);
    });

    this._expirationDateInput.addEventListener('input', event => {
      callback(event);
      this._card.onExpirationDateChanged(this._expirationDateInput.value);
      this._validation.keepCursorAtSamePosition(this._expirationDateInput);
    });

    this._expirationDateInput.addEventListener('keydown', (event: any) => {
      this._validation.setKeyDownProperties(this._expirationDateInput, event);
    });
  }

  public onSecurityCodeInput(id: string, callback: any) {
    this._securityCodeInput.addEventListener('blur', () => {
      this._validation.validate(this._securityCodeInput, this._securityCodeError);
      this._card.flipCard();
    });

    this._securityCodeInput.addEventListener('focus', () => {
      this._card.flipCard();
    });

    this._securityCodeInput.addEventListener('input', event => {
      callback(event);
      this._card.onSecurityCodeChanged(this._securityCodeInput.value);
    });
  }

  private _addInputs(inputs: any) {
    this._cardNumberInput = document.getElementById(inputs.cardNumber) as HTMLInputElement;
    this._expirationDateInput = document.getElementById(inputs.expirationDate) as HTMLInputElement;
    this._securityCodeInput = document.getElementById(inputs.securityCode) as HTMLInputElement;
    this._setInputsAttributes(CARD_NUMBER_PROPERTIES, this._cardNumberInput);
    this._setInputsAttributes(EXPIRATION_DATE_PROPERTIES, this._expirationDateInput);
    this._setInputsAttributes(SECURITY_CODE_PROPERTIES, this._securityCodeInput);
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

  private _setInputsAttributes(attributes: any, element: HTMLInputElement) {
    Object.keys(attributes).map(item => {
      element.setAttribute(item, attributes[item]);
    });
  }

  private _changeSecurityCodePattern(value: string) {
    if (this._card.getCardDetails(value).type === 'AMEX') {
      this._securityCodeInput.setAttribute('pattern', STCard.MATCH_EXACTLY_FOUR_DIGITS);
      this._securityCodeInput.setAttribute('placeholder', 'XXXX');
    } else {
      this._securityCodeInput.setAttribute('pattern', STCard.MATCH_EXACTLY_THREE_DIGITS);
      this._securityCodeInput.setAttribute('placeholder', 'XXX');
    }
  }
}

export default (config: any) => new STCard(config);
