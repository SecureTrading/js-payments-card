import { CARD_DETAILS_PLACEHOLDERS } from '../../src/imports/card/card-type';
import Formatter from '../../src/shared/Formatter';
import Utils from '../../src/shared/Utils';

jest.mock('./../../src/shared/Validation');

// given
describe('Formatter', () => {
  const { instance, cardDetails, cardNumber, cardNumberFormatted, date, dateFormatted } = FormatterFixture();
  // when
  beforeEach(() => {
    document.body.innerHTML =
      '<form id="st-form" class="merchants-form" autocomplete="off" novalidate=""> <header> <img src="https://www.securetrading.com/wp-content/uploads/2018/08/st-logo.svg" alt="Online Payment Partners" id="logo" height="54" width="300"> <h2>Secure Trading Animated Card Example</h2> </header> <div class="merchants-form__fields"> <div class="merchants-form__field"> <label for="st-card-number-input">Card number: </label> <input type="text" class="merchants-form__input error" id="st-card-number-input" name="st-card-number-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Expiration date" ariaplaceholder="MM / YY" inputmode="numeric" placeholder="XXXX XXXX XXXX XXXX"> <div class="merchants-form__error" id="st-card-number-input-error">Value mismatch pattern</div> </div> <div class="merchants-form__field"> <label for="st-expiration-date-input">Expiration date: </label> <input type="text" class="merchants-form__input" id="st-expiration-date-input" name="st-expiration-date-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Expiration date" ariaplaceholder="MM / YY" inputmode="numeric" pattern="^(0[1-9]|1[0-2])/([0-9]{2})$" placeholder="MM / YY"> <div class="merchants-form__error" id="st-expiration-date-input-error"></div> </div> <div class="merchants-form__field"> <label for="st-security-code-input">Security code: </label> <input type="text" class="merchants-form__input" id="st-security-code-input" name="st-security-code-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Security code" ariaplaceholder="XXX" inputmode="numeric" pattern="^[0-9]{3}$" placeholder="XXX"> <div class="merchants-form__error" id="st-security-code-input-error"></div> </div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"><div class="st-animated-card" id="st-animated-card"> <div class="st-animated-card__content"> <div class="st-animated-card__side st-animated-card__front st-animated-card__visa" id="st-animated-card-side-front"> <div class="st-animated-card__logos"> <div class="st-animated-card__chip-logo"> <img class="st-animated-card__chip-logo-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAArCAYAAAAtxEsrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAU8SURBVGhD3ZnHSjRBFIX/1xLUhaKgqLhRXIhiWohi2JjBHBYi5uxCFCMqigkVzBHFnLMLX6P+PgUlt2puz3SPrmbxUdO3qnvON52qe/4JIQIathhIsMVAgi2atLa2ip2dHXF5eSnu7u5Y7u/vHfHw8OCVx8dHr2AbyDE3NycSExOteHxmBVtULCwsyA1yQk5Q6yq5v4L+EAcHB1ZUPj9gi+Di4oLduCnhhJOTE9Hf3y+amppki2XUb29vfwW2AVm0MTExVmxPD48CsJOjqPC+mJ+fF6GhoaKwsFA0NzfLNjIyUoyOjsp+LrhbIInW9AAeBXVYusGUUgwNDYmgoCBxfHwsvr6+xPv7u2z39/dlfWpqShtvBncDJHd3dy0F3UdbAJyAUxBStcvLyyIqKkqcnp7Kc4WKYBkXCkguLS1pfYAT8AXWg2R8fLylYSPY1tbmEdpfkpOTxcTEhIecAvXx8XE5juuncEIcEMQ2qZMmuLe3x4Z1y8zMjLyEv729yWUuNHh9fRUJCQlyPNdvwklR8F1nZ2eWio3g1dWV/BUADeyWvLw8+UuadS705OSkyMnJYfu8YSeIljppgkpOCfoje3NzI8LDw4W3KzENinFhYWHi+vpaq/sCIqqlgshLnWwFTcyQdszOzoq0tDRX66Snpzs+TO34taDCDGdSWVkp+vr62D47uru7RXV1tfzMhXcK1kdG6qQJ4kvcUFVV5UFGRobo6enRBHwxNjYmz8O6ujpJbW2tX2Dd+vp6S8VGsLe3V7gFMqoFRUVFckrGidjR0tIiA66vr2usra25AutsbGxYKjaCmGn8BtwWVldXRWZmJitiR0pKigz49PTkFdw7vYExz8/PloqNIAaZ55xbcLLjKoqrIpY5Icr5+bkcr84hJ5jnnkL1UycPQSXpryzWw1UUUzWzj4ZUYDKelZXF9jnBFMT3UCdW0MQM6ov8/HwxPT3tUTfDgeHhYVFaWsr2OeXXghQzNAduFYODg2wfBYEGBgbkeBr4N2C71Mm1oMIMSykpKREjIyNsnwkeqSoqKtiw/oBtUie/BSlmaNzT8M7ErHNgzlpcXPyzzIV2C3X6E0EFAqJNSkoSm5ubP6G9gXtXamqqVuNCOwXrU6c/FQR4wI2IiJD3IxraDqyjJudcP+BEvEGd/lwQD7kFBQVajQtNyc7OZq+6JpyMCcZRJ00Q8ziFmhe6BbOYrq4uTdCXKK64eIY055beqKmpYUEfddIE1XwSYIZPPzslNzdXBuYEFaYgLjQQxA/jlM7Ozp+Wghp10gQ/Pz+FHR8fH47o6OgQjY2NrBgHBBsaGgTennPzW6dgHqw+UydN0JzccnAhKdvb2/I9C9dnB8ZvbW3Jz+bedQvOQ+qkCWKizEnZYQYFLy8vIi4uTv6XwfWb4F1mbGysXE/VuOBOwXsl6qQJHh4esiLeQCDVKvDgi0OV1uzAeYPxXB8n4Au8GaROmiBCmQJuQCi0+O8hOjpavoAyQ1PQj/8UMJ7rN+GETNrb2y0VG0FghvYHvO8sLy+XtxsuqAK3lbKyMu3wdAInpjB9tAWA5zgutFuwd0JCQuQtQNVoSLyYwrnnay/7gsotLi5aCrqPtqDA0zgN6w/YK5iuQRLnGWoqFPZscHCwfAuNMTSwP0AO/3WYHsCjoPgrSVyZ8cSOvUVbHMZuD007zCsnhS0qVlZW2OBugMj397d8R4M3XmixDDn0c4HdwB2WFLZoginY0dGR3BumgFMgilkGWq5fwUlQcM7ib2tc8c2cHGwxkGCLgQRbDBzEv/+fMNX6EnMcrwAAAABJRU5ErkJggg==" alt=""> </div> <div class="st-animated-card__payment-logo" id="st-animated-card-payment-logo"><img alt="visa" class="st-animated-card__payment-logo-img" id="st-payment-logo" src="../../../images/visa.png"></div> </div> <div class="st-animated-card__pan"> <label class="st-animated-card__label" id="st-animated-card-card-number-label">Card number</label> <div class="st-animated-card__value" id="st-animated-card-number">4554 3543 5435</div> </div> <div class="st-animated-card__expiration-date-and-security-code"> <div class="st-animated-card__expiration-date"> <label class="st-animated-card__label" id="st-animated-card-expiration-date-label">Expiration date</label> <div class="st-animated-card__value" id="st-animated-card-expiration-date">MM/YY</div> </div> <div class="st-animated-card__security-code st-animated-card__security-code--front st-animated-card__security-code--front-hidden" id="st-animated-card-security-code-front"> <label class="st-animated-card__label" id="st-animated-card-security-code-label">Security code</label> <div class="st-animated-card__value" id="st-animated-card-security-code-front-field"></div> </div> </div> </div> <div class="st-animated-card__side st-animated-card__back st-animated-card__visa" id="st-animated-card-side-back"> <div class="st-animated-card__signature"></div> <div class="st-animated-card__security-code" id="st-animated-card-security-code">∙∙∙</div> </div> </div> </div> </div> </form>';
  });

  // then
  describe('number()', () => {
    // then
    it('should set dedicated format if card number is specified and card details are also specified', () => {
      // @ts-ignore
      instance.getCardDetails = jest.fn().mockReturnValueOnce(cardDetails);
      // @ts-ignore
      instance.removeNonDigits = jest.fn().mockReturnValueOnce(cardNumber);
      Utils.stripChars = jest.fn().mockReturnValueOnce(cardNumber);
      expect(instance.number(cardNumber, 'st-card-number-input')).toEqual({
        // @ts-ignore
        value: cardNumberFormatted,
        nonformat: cardNumber
      });
    });
    // then
    it('should set dedicated format if card number is specified and card details are null', () => {
      // @ts-ignore
      instance.getCardDetails = jest.fn().mockReturnValueOnce(null);
      // @ts-ignore
      instance.removeNonDigits = jest.fn().mockReturnValueOnce(cardNumber);
      Utils.stripChars = jest.fn().mockReturnValueOnce(cardNumber);
      expect(instance.number(cardNumber, 'st-card-number-input')).toEqual({
        // @ts-ignore
        value: cardNumberFormatted,
        nonformat: cardNumber
      });
    });

    // then
    it('should set standard format if cardDetails format is null', () => {
      // @ts-ignore
      instance.getCardDetails = jest.fn().mockReturnValueOnce(null);
      // @ts-ignore
      instance.removeNonDigits = jest.fn().mockReturnValueOnce('');
      Utils.stripChars = jest.fn().mockReturnValueOnce('');
      expect(instance.number('', 'st-card-number-input')).toEqual({
        // @ts-ignore
        value: CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER,
        nonformat: ''
      });
    });
  });

  // then
  describe('date()', () => {
    // then
    it('should set placeholder format if cardDetails format is null and value is empty', () => {
      // @ts-ignore
      instance.expirationDateValue = '';
      expect(instance.date('', 'st-expiration-date-input')).toEqual('MM/YY');
    });
    // then
    it('should set standard format if cardDetails format is null', () => {
      // @ts-ignore
      instance.expirationDateValue = date;
      expect(instance.date(date, 'st-expiration-date-input')).toEqual(dateFormatted);
    });
  });

  // then
  describe('code()', () => {
    // then
    it('should return security code value and set security code on specified element', () => {
      // @ts-ignore
      expect(instance.code('111', 'st-security-code-input')).toEqual(instance.securityCodeValue);
    });
  });

  // then
  describe('_dateISO()', () => {
    // then
    it('should return only month digits if first two digits are specified', () => {
      // @ts-ignore
      expect(instance._dateISO(['1', ''], ['11', ''])).toEqual('11');
    });

    // then
    it('should return formatted date with slash between month and year', () => {
      // @ts-ignore
      expect(instance._dateISO(['12', '1'], ['12', '19'])).toEqual('12/19');
    });

    // then
    it('should return month digits and first digit of year separated by slash when last digit has been deleted', () => {
      // @ts-ignore
      expect(instance._dateISO(['12', '11'], ['12', '1'])).toEqual('12/1');
    });
  });

  // then
  describe('_dateFixed()', () => {
    // then
    it('should return formatted date with slash between month and year', () => {
      // @ts-ignore
      expect(instance._dateFixed(date)).toEqual(dateFormatted);
    });
  });
});

function FormatterFixture() {
  const locale: string = 'en_GB';
  const cardNumber: string = '411111';
  const cardNumberFormatted: string = '4111 11';
  const date: string = '1219';
  const dateFormatted: string = '12/19';
  const cardDetails = {
    type: 'VISA',
    luhn: true,
    length: [16, 17],
    cvcLength: [3],
    format: '(\\d{1,4})(\\d{1,4})?(\\d{1,4})?(\\d+)?'
  };
  const instance = new Formatter(locale);
  return { instance, cardDetails, cardNumber, cardNumberFormatted, date, dateFormatted };
}
