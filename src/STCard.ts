import Card from './models/Card/Card';
import Validation from './shared/Validation';
// @ts-ignore
import template from './card.html';

class STCard {
  private _animatedCardTargetContainer: HTMLDivElement;
  private _card: Card;
  private _validation: Validation;

  constructor(config: any) {
    const { animatedCardContainer } = config;
    this._animatedCardTargetContainer = document.getElementById(animatedCardContainer) as HTMLDivElement;
    this._animatedCardTargetContainer.innerHTML = template;
    this._validation = new Validation();
    Card.ifCardWrapperExist() && (this._card = new Card(config));
  }

  public onCardNumberInput(id: string, callback: any) {
    const cardNumber = document.getElementById(id) as HTMLInputElement;
    cardNumber.addEventListener('input', event => {
      callback(event);
      this._card.onCardNumberChanged(cardNumber.value);
    });
  }

  public onExpirationDateInput(id: string, callback: any) {
    const expirationDate = document.getElementById(id) as HTMLInputElement;
    expirationDate.addEventListener('input', event => {
      callback(event);
      this._card.onExpirationDateChanged(expirationDate.value);
    });
  }

  public onSecurityCodeInput(id: string, callback: any) {
    const securityCode = document.getElementById(id) as HTMLInputElement;
    securityCode.addEventListener('input', event => {
      callback(event);
      this._card.onSecurityCodeChanged(securityCode.value);
    });

    securityCode.addEventListener('focus', event => {
      this._card.flipCard();
    });

    securityCode.addEventListener('blur', event => {
      this._card.flipCard();
    });
  }
}

export default (config: any) => new STCard(config);
