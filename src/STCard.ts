// @ts-ignore
import template from './card.html';
import {
  CARD_NUMBER_PROPERTIES,
  EXPIRATION_DATE_PROPERTIES,
  SECURITY_CODE_PROPERTIES
} from './imports/card/card-properties';
import { CARD_SELECTORS } from './imports/card/card-selectors';
import Card from './models/Card/Card';
import { IConfig, IErrorContainers, IFields, IInputContainers } from './models/STCard/ISTCard';
import Utils from './shared/Utils';
import Validation from './shared/Validation';

class STCard {
  private static FOUR_DIGITS_CARDS: string[] = ['AMEX'];
  private static MATCH_EXACTLY_FOUR_DIGITS: string = '^[0-9]{4}$';
  private static MATCH_EXACTLY_THREE_DIGITS: string = '^[0-9]{3}$';
  private static SECURITY_CODE_PLACEHOLDER: string = 'XXX';
  private static SECURITY_CODE_EXTENDED_PLACEHOLDER: string = 'XXXX';
  private _animatedCardTargetContainer: HTMLDivElement;
  private _card: Card;
  private _cardNumberError: HTMLElement;
  private _cardNumberInput: HTMLInputElement;
  private _expirationDateError: HTMLElement;
  private _expirationDateInput: HTMLInputElement;
  private _securityCodeError: HTMLElement;
  private _securityCodeInput: HTMLInputElement;
  private _validation: Validation;

  constructor(config: IConfig) {
    const { animatedCardContainer, locale, fields } = config;
    this._init(fields, animatedCardContainer, locale, config);
  }

  /**
   * Method called when card number event from outside of js-payments-card has been received.
   * It refers to the same methods in Card class and that's why we need outsideValue
   * to distinguish local and remote events.
   * @param value
   * @param outsideValue
   */
  public onCardNumberChange(value: string, outsideValue: boolean) {
    this._card.onCardNumberChanged(value, outsideValue);
  }

  /**
   * Method called when expiration date event from outside of js-payments-card has been received.
   * It refers to the same methods in Card class and that's why we need outsideValue
   * to distinguish local and remote events.
   * @param value
   * @param outsideValue
   */
  public onExpirationDateChange(value: string, outsideValue: boolean) {
    this._card.onExpirationDateChanged(value, outsideValue);
  }

  /**
   * Method called when security code event from outside of js-payments-card has been received.
   * It refers to the same methods in Card class and that's why we need outsideValue
   * to distinguish local and remote events.
   * @param value
   * @param outsideValue
   */
  public onSecurityCodeChange(value: string, outsideValue: boolean) {
    this._card.onSecurityCodeChanged(value, outsideValue);
  }

  public onFieldFocusOrBlur(focused: boolean) {
    this._card.onFieldFocusOrBlur(focused);
  }

  public onCardNumberInput(id: string, callback: any) {
    this._cardNumberInput.addEventListener('blur', () => {
      this._cardNumberInput.blur();
      this._validation.luhnCheck(this._cardNumberInput);
      this._validation.validate(this._cardNumberInput, this._cardNumberError);
    });

    this._cardNumberInput.addEventListener('focus', () => {
      this._cardNumberInput.focus();
    });

    this._cardNumberInput.addEventListener('input', (event: KeyboardEvent) => {
      callback(event);
      const { nonformat } = this._card.onCardNumberChanged(this._cardNumberInput.value);
      this._changeSecurityCodePattern(nonformat);
      if (this._isActive(this._cardNumberInput)) {
        this._validation.keepCursorAtSamePosition(this._cardNumberInput);
      }
    });

    this._cardNumberInput.addEventListener('keydown', (event: any) => {
      this._validation.setKeyDownProperties(this._cardNumberInput, event);
    });

    this._cardNumberInput.addEventListener('paste', (event: ClipboardEvent) => {
      const value = this._validation.onPaste(event);
      // @ts-ignore
      this._card.onCardNumberChanged(value);
      this._changeSecurityCodePattern(this._cardNumberInput.value);
      if (this._isActive(this._cardNumberInput)) {
        this._validation.keepCursorAtSamePosition(this._cardNumberInput);
      }
    });
  }

  public onExpirationDateInput(id: string, callback: any) {
    this._expirationDateInput.addEventListener('blur', () => {
      this._expirationDateInput.blur();
      this._validation.validate(this._expirationDateInput, this._expirationDateError);
    });

    this._expirationDateInput.addEventListener('focus', () => {
      this._expirationDateInput.focus();
    });

    this._expirationDateInput.addEventListener('input', event => {
      callback(event);
      this._card.onExpirationDateChanged(this._expirationDateInput.value);
      if (this._isActive(this._expirationDateInput)) {
        this._validation.keepCursorAtSamePosition(this._expirationDateInput);
      }
    });

    this._expirationDateInput.addEventListener('keydown', (event: any) => {
      this._validation.setKeyDownProperties(this._expirationDateInput, event);
    });
  }

  public onSecurityCodeInput(id: string, callback: any) {
    this._securityCodeInput.addEventListener('blur', () => {
      this._securityCodeInput.blur();
      this._validation.validate(this._securityCodeInput, this._securityCodeError);
      this._card.flipCard();
    });

    this._securityCodeInput.addEventListener('focus', () => {
      this._securityCodeInput.focus();
      this._card.flipCard();
    });

    this._securityCodeInput.addEventListener('input', event => {
      callback(event);
      this._card.onSecurityCodeChanged(this._securityCodeInput.value);
    });
  }

  private _addInputs(inputs: IInputContainers) {
    this._cardNumberInput = document.getElementById(inputs.cardNumber) as HTMLInputElement;
    this._expirationDateInput = document.getElementById(inputs.expirationDate) as HTMLInputElement;
    this._securityCodeInput = document.getElementById(inputs.securityCode) as HTMLInputElement;
    this._setInputsAttributes(CARD_NUMBER_PROPERTIES, this._cardNumberInput);
    this._setInputsAttributes(EXPIRATION_DATE_PROPERTIES, this._expirationDateInput);
    this._setInputsAttributes(SECURITY_CODE_PROPERTIES, this._securityCodeInput);
  }

  private _addInputErrorLabels(errors: IErrorContainers) {
    this._cardNumberError = document.getElementById(errors.cardNumber) as HTMLInputElement;
    this._expirationDateError = document.getElementById(errors.expirationDate) as HTMLInputElement;
    this._securityCodeError = document.getElementById(errors.securityCode) as HTMLInputElement;
  }

  private _addAnimatedCardContainer(animatedCardContainer: string) {
    this._animatedCardTargetContainer = document.getElementById(animatedCardContainer) as HTMLDivElement;
    if (this._animatedCardTargetContainer) {
      this._animatedCardTargetContainer.innerHTML = template;
    }
  }

  private _changeSecurityCodePattern(value: string) {
    if (STCard.FOUR_DIGITS_CARDS.includes(this._card.getCardDetails(value).type)) {
      this._securityCodeInput.setAttribute('pattern', STCard.MATCH_EXACTLY_FOUR_DIGITS);
      this._securityCodeInput.setAttribute('placeholder', STCard.SECURITY_CODE_EXTENDED_PLACEHOLDER);
    } else {
      this._securityCodeInput.setAttribute('pattern', STCard.MATCH_EXACTLY_THREE_DIGITS);
      this._securityCodeInput.setAttribute('placeholder', STCard.SECURITY_CODE_PLACEHOLDER);
    }
  }

  private _init(fields: IFields, animatedCardContainer: string, locale: string, config: IConfig) {
    this._validation = new Validation(locale);
    this._setInputsAndErrorsTargets(fields);
    this._addAnimatedCardContainer(animatedCardContainer);
    this._setCardConfig(config);
  }

  private _setCardConfig(config: IConfig) {
    if (Utils.ifElementExists(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR)) {
      this._card = new Card(config);
    } else {
      throw new Error('Animated card input does not exist');
    }
  }

  private _setInputsAndErrorsTargets(fields: { inputs: IInputContainers; errors: IErrorContainers }) {
    if (fields) {
      if (fields.inputs && fields.errors) {
        this._addInputs(fields.inputs);
        this._addInputErrorLabels(fields.errors);
      }
    }
  }

  private _setInputsAttributes(attributes: any, element: HTMLInputElement) {
    Object.keys(attributes).map(item => {
      element.setAttribute(item, attributes[item]);
    });
  }

  private _isActive(element: HTMLElement) {
    return element === document.activeElement;
  }
}

export default (config: any) => new STCard(config);
