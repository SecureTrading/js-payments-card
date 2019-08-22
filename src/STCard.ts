import Card from './models/Card/Card';
import template from './card.html';

interface IIds {
  cardNumberId: string,
  expirationDateId: string,
  securityCodeId: string
}

/**
 *
 */
class STCard {

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
    this._animatedCardTargetContainer = document.getElementById(animatedCardContainer) as HTMLDivElement;
    this._animatedCardTargetContainer.innerHTML = template;
    Card.ifCardExists() && new Card();

  }

  public onCardNumberInput(id: string, callback: any) {
    const cardNumber = document.getElementById(id) as HTMLInputElement;
    cardNumber.addEventListener('input', () => {
      this.changeCardNumber(cardNumber.value);
    })
  }

  public onExpirationDateInput(id: string, callback: any) {
    const expirationDate = document.getElementById(id) as HTMLInputElement;
    expirationDate.addEventListener('input', () => {
      this.changeExpirationDate(expirationDate.value);
    })
  }

  public onSecurityCodeInput(id: string, callback: any) {
    const securityCode = document.getElementById(id) as HTMLInputElement;
    securityCode.addEventListener('input', () => {
      this.changeSecurityCode(securityCode.value);
    })
  }

  public changeCardNumber(value: string) {
    const element = document.getElementById('st-animated-card-number');
    element.textContent = value;
  }

  public changeExpirationDate(value: string) {
    const element = document.getElementById('st-animated-card-expiration-date');
    element.textContent = value;
  }

  public changeSecurityCode(value: string) {
    const element = document.getElementById('st-animated-card-security-code');
    element.textContent = value;
  }

}

export default (config: any) => new STCard(config);
