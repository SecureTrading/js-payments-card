import Card from './models/Card/Card';
import template from './card.html';
import Validation from "./shared/Validation";

interface IIds {
  cardNumberId: string,
  expirationDateId: string,
  securityCodeId: string
}

/**
 *
 */
class STCard {
  private static CARD_PAN_FIELD: string = 'st-animated-card-number';
  private static CARD_EXPIRATION_DATE_FIELD: string = 'st-animated-card-expiration-date';
  private static CARD_SECURITY_CODE_FIELD: string = 'st-animated-card-security-code';

  private _validation: Validation;
  /**
   *
   * @param value
   * @param id
   * @private
   */
  private static _onChange(value: string, id: string) {
    const element = document.getElementById(id);
    element.textContent = value;
  }


  private _cardNumberElement: HTMLInputElement;
  private _cardNumberValue: string;
  private _securityCodeElement: HTMLInputElement;
  private _securityCodeValue: string;
  private _expirationDateElement: HTMLInputElement;
  private _expirationDateValue: string;
  private _cardBrand: string;
  private _animatedCardTargetContainer: HTMLDivElement;

  constructor(config: any) {
    const {animatedCardContainer} = config;
    this._validation = new Validation();
    this._animatedCardTargetContainer = document.getElementById(animatedCardContainer) as HTMLDivElement;
    this._animatedCardTargetContainer.innerHTML = template;
    Card.ifCardExists() && new Card();
  }

  public onCardNumberInput(id: string, callback: any) {
    const cardNumber = document.getElementById(id) as HTMLInputElement;
    cardNumber.addEventListener('input', (event) => {
      callback(event);
      this._validation.validate('PAN', cardNumber.id, 'merchants-card-number-error');
      STCard._onChange(cardNumber.value, STCard.CARD_PAN_FIELD);
    })
  }

  public onExpirationDateInput(id: string, callback: any) {
    const expirationDate = document.getElementById(id) as HTMLInputElement;
    expirationDate.addEventListener('input', (event) => {
      callback(event);
      this._validation.validate('DATE', expirationDate.id, 'merchants-card-number-error');
      STCard._onChange(expirationDate.value, STCard.CARD_EXPIRATION_DATE_FIELD);
    })
  }

  public onSecurityCodeInput(id: string, callback: any) {
    const securityCode = document.getElementById(id) as HTMLInputElement;
    securityCode.addEventListener('input', (event) => {
      callback(event);
      this._validation.validate('CODE', securityCode.id, 'merchants-card-number-error');
      STCard._onChange(securityCode.value, STCard.CARD_SECURITY_CODE_FIELD);
    })
  }
}

export default (config: any) => new STCard(config);
