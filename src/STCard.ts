// @ts-ignore
import template from './card.html';
import Card from './models/Card/Card';
import Validation from './shared/Validation';

class STCard {
  private _animatedCardTargetContainer: HTMLDivElement;
  private _card: Card;
  private _validation: Validation;

  constructor(config: any) {
    const { animatedCardContainer } = config;
    this._animatedCardTargetContainer = document.getElementById(animatedCardContainer) as HTMLDivElement;
    this._animatedCardTargetContainer.innerHTML = template;
    this._validation = new Validation();
  }

  public onCardNumberInput(id: string, callback: any) {
    const cardNumber = document.getElementById(id) as HTMLInputElement;
    cardNumber.addEventListener('input', event => {
      callback(event);
    });
  }

  public onExpirationDateInput(id: string, callback: any) {
    const expirationDate = document.getElementById(id) as HTMLInputElement;
    expirationDate.addEventListener('input', event => {
      callback(event);
    });
  }

  public onSecurityCodeInput(id: string, callback: any) {
    const securityCode = document.getElementById(id) as HTMLInputElement;
    securityCode.addEventListener('input', event => {
      callback(event);
    });
  }
}

export default (config: any) => new STCard(config);
