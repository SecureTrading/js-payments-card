import STCard from '../src/STCard';
import Card from '../src/models/Card/Card';

jest.mock('../src/models/Card/Card');
jest.mock('../src/shared/Validation');

// given
describe('STCard', () => {
  Card.ifElementExists = jest.fn().mockReturnValue(true);
  // when
  beforeEach(() => {});

  // given
  describe('onCardNumberInput', () => {
    const { instance } = STCardFixture();

    // when
    beforeEach(() => {
      instance._validation.validate = jest.fn();
      instance._validation.luhnCheck = jest.fn();
      instance._validation.keepCursorAtSamePosition = jest.fn();
      instance._validation.setKeyDownProperties = jest.fn();
      instance._changeSecurityCodePattern = jest.fn();
      instance._card.onCardNumberChanged = jest.fn().mockReturnValue({ nonformat: '' });
      instance._cardNumberInput.addEventListener = jest
        .fn()
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        });
      instance.onCardNumberInput('st-card-number-input', jest.fn());
    });

    // then
    it('should call luhn check on blur', () => {
      expect(instance._validation.luhnCheck).toHaveBeenCalled();
    });

    // then
    it('should call validate on blur', () => {
      expect(instance._validation.validate).toHaveBeenCalled();
    });

    // then
    it('should call _changeSecurityCodePattern on input', () => {
      expect(instance._changeSecurityCodePattern).toHaveBeenCalled();
    });

    // then
    it('should call keepCursorAtSamePosition on input', () => {
      expect(instance._validation.keepCursorAtSamePosition).toHaveBeenCalled();
    });

    // then
    it('should call _validation.setKeyDownProperties on keydown', () => {
      expect(instance._validation.setKeyDownProperties).toHaveBeenCalled();
    });
  });

  // given
  describe('onExpirationDateInput', () => {
    const { instance } = STCardFixture();
    // when
    beforeEach(() => {
      instance._validation.validate = jest.fn();
      instance._card.onExpirationDateChanged = jest.fn();
      instance._validation.keepCursorAtSamePosition = jest.fn();
      instance._validation.setKeyDownProperties = jest.fn();
      instance._expirationDateInput.addEventListener = jest
        .fn()
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        });
      instance.onExpirationDateInput('st-expiration-date-input', jest.fn());
    });

    // then
    it('should call validation.validate method on blur', () => {
      expect(instance._validation.validate).toHaveBeenCalled();
    });

    // then
    it('should call validation.keepCursorAtSamePosition method on input', () => {
      expect(instance._validation.keepCursorAtSamePosition).toHaveBeenCalled();
    });

    // then
    it('should call _validation.setKeyDownProperties method on keydown', () => {
      expect(instance._validation.setKeyDownProperties).toHaveBeenCalled();
    });

    // then
    it('should call _card.onExpirationDateChanged method on input', () => {
      expect(instance._card.onExpirationDateChanged).toHaveBeenCalled();
    });
  });

  // given
  describe('onSecurityCodeInput', () => {
    const { instance } = STCardFixture();
    // when
    beforeEach(() => {
      instance._validation.validate = jest.fn();
      instance._card.flipCard = jest.fn();
      instance._card.onSecurityCodeChanged = jest.fn();
      instance._securityCodeInput.addEventListener = jest
        .fn()
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        })
        .mockImplementationOnce((event, callback) => {
          callback();
        });
      instance.onSecurityCodeInput('st-security-code-input', jest.fn());
    });

    // then
    it('should call validate and flipCard on blur ', () => {
      expect(instance._validation.validate).toHaveBeenCalled();
      expect(instance._card.flipCard).toHaveBeenCalled();
    });

    // then
    it('should call flipCard on focus', () => {
      expect(instance._card.flipCard).toHaveBeenCalled();
    });

    // then
    it('should call _card.onSecurityCodeChanged on input', () => {
      expect(instance._card.onSecurityCodeChanged).toHaveBeenCalled();
    });
  });

  // given
  describe('_addInputs', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_addInputErrorLabels', () => {
    const { instance } = STCardFixture();

    // then
    it('should set error containers for each field', () => {
      expect(instance._cardNumberError.getAttribute('id')).toEqual('st-card-number-message');
      expect(instance._expirationDateError.getAttribute('id')).toEqual('st-expiration-date-message');
      expect(instance._securityCodeError.getAttribute('id')).toEqual('st-security-code-message');
    });
  });

  // given
  describe('_addAnimatedCardContainer', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_setInputsAttributes', () => {
    // then
    it('', () => {});
  });
  // given
  describe('_changeSecurityCodePattern', () => {
    const { instance } = STCardFixture();

    // when
    beforeEach(() => {});
    // then
    it('should set extended pattern and placeholder when card is AMEX ', () => {
      instance._card.getCardDetails = jest.fn().mockReturnValueOnce({ type: 'AMEX' });
      instance._changeSecurityCodePattern('3400');
      expect(instance._securityCodeInput.getAttribute('pattern')).toEqual('^[0-9]{4}$');
      expect(instance._securityCodeInput.getAttribute('placeholder')).toEqual('XXXX');
    });
    // then
    it('should set standard pattern and placeholder when card is not AMEX', () => {
      instance._card.getCardDetails = jest.fn().mockReturnValueOnce({ type: 'VISA' });
      instance._changeSecurityCodePattern('411111');
      expect(instance._securityCodeInput.getAttribute('pattern')).toEqual('^[0-9]{3}$');
      expect(instance._securityCodeInput.getAttribute('placeholder')).toEqual('XXX');
    });
  });
});

function STCardFixture() {
  document.body.innerHTML =
    '<form id="st-form" class="merchants-form" autocomplete="off" novalidate> <header> <img src="https://www.securetrading.com/wp-content/uploads/2018/08/st-logo.svg" alt="Online Payment Partners" id="logo" height="54" width="300" /> <h2>Secure Trading Animated Card Example</h2> </header> <div class="merchants-form__fields"> <div class="merchants-form__field"> <label for="st-card-number-input">Card number: </label> <input type="text" class="merchants-form__input" id="st-card-number-input" name="st-card-number-input" /> <div class="merchants-form__error" id="st-card-number-message"></div> </div> <div class="merchants-form__field"> <label for="st-expiration-date-input">Expiration date: </label> <input type="text" class="merchants-form__input" id="st-expiration-date-input" name="st-expiration-date-input" /> <div class="merchants-form__error" id="st-expiration-date-message"></div> </div> <div class="merchants-form__field"> <label for="st-security-code-input">Security code: </label> <input type="text" class="merchants-form__input" id="st-security-code-input" name="st-security-code-input" /> <div class="merchants-form__error" id="st-security-code-message"></div> </div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"><div class="st-animated-card" id="st-animated-card"> <div class="st-animated-card__content"> <div class="st-animated-card__side st-animated-card__front" id="st-animated-card-side-front"> <div class="st-animated-card__logos"> <div class="st-animated-card__chip-logo"> <img class="st-animated-card__chip-logo-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAArCAYAAAAtxEsrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAU8SURBVGhD3ZnHSjRBFIX/1xLUhaKgqLhRXIhiWohi2JjBHBYi5uxCFCMqigkVzBHFnLMLX6P+PgUlt2puz3SPrmbxUdO3qnvON52qe/4JIQIathhIsMVAgi2atLa2ip2dHXF5eSnu7u5Y7u/vHfHw8OCVx8dHr2AbyDE3NycSExOteHxmBVtULCwsyA1yQk5Q6yq5v4L+EAcHB1ZUPj9gi+Di4oLduCnhhJOTE9Hf3y+amppki2XUb29vfwW2AVm0MTExVmxPD48CsJOjqPC+mJ+fF6GhoaKwsFA0NzfLNjIyUoyOjsp+LrhbIInW9AAeBXVYusGUUgwNDYmgoCBxfHwsvr6+xPv7u2z39/dlfWpqShtvBncDJHd3dy0F3UdbAJyAUxBStcvLyyIqKkqcnp7Kc4WKYBkXCkguLS1pfYAT8AXWg2R8fLylYSPY1tbmEdpfkpOTxcTEhIecAvXx8XE5juuncEIcEMQ2qZMmuLe3x4Z1y8zMjLyEv729yWUuNHh9fRUJCQlyPNdvwklR8F1nZ2eWio3g1dWV/BUADeyWvLw8+UuadS705OSkyMnJYfu8YSeIljppgkpOCfoje3NzI8LDw4W3KzENinFhYWHi+vpaq/sCIqqlgshLnWwFTcyQdszOzoq0tDRX66Snpzs+TO34taDCDGdSWVkp+vr62D47uru7RXV1tfzMhXcK1kdG6qQJ4kvcUFVV5UFGRobo6enRBHwxNjYmz8O6ujpJbW2tX2Dd+vp6S8VGsLe3V7gFMqoFRUVFckrGidjR0tIiA66vr2usra25AutsbGxYKjaCmGn8BtwWVldXRWZmJitiR0pKigz49PTkFdw7vYExz8/PloqNIAaZ55xbcLLjKoqrIpY5Icr5+bkcr84hJ5jnnkL1UycPQSXpryzWw1UUUzWzj4ZUYDKelZXF9jnBFMT3UCdW0MQM6ov8/HwxPT3tUTfDgeHhYVFaWsr2OeXXghQzNAduFYODg2wfBYEGBgbkeBr4N2C71Mm1oMIMSykpKREjIyNsnwkeqSoqKtiw/oBtUie/BSlmaNzT8M7ErHNgzlpcXPyzzIV2C3X6E0EFAqJNSkoSm5ubP6G9gXtXamqqVuNCOwXrU6c/FQR4wI2IiJD3IxraDqyjJudcP+BEvEGd/lwQD7kFBQVajQtNyc7OZq+6JpyMCcZRJ00Q8ziFmhe6BbOYrq4uTdCXKK64eIY055beqKmpYUEfddIE1XwSYIZPPzslNzdXBuYEFaYgLjQQxA/jlM7Ozp+Wghp10gQ/Pz+FHR8fH47o6OgQjY2NrBgHBBsaGgTennPzW6dgHqw+UydN0JzccnAhKdvb2/I9C9dnB8ZvbW3Jz+bedQvOQ+qkCWKizEnZYQYFLy8vIi4uTv6XwfWb4F1mbGysXE/VuOBOwXsl6qQJHh4esiLeQCDVKvDgi0OV1uzAeYPxXB8n4Au8GaROmiBCmQJuQCi0+O8hOjpavoAyQ1PQj/8UMJ7rN+GETNrb2y0VG0FghvYHvO8sLy+XtxsuqAK3lbKyMu3wdAInpjB9tAWA5zgutFuwd0JCQuQtQNVoSLyYwrnnay/7gsotLi5aCrqPtqDA0zgN6w/YK5iuQRLnGWoqFPZscHCwfAuNMTSwP0AO/3WYHsCjoPgrSVyZ8cSOvUVbHMZuD007zCsnhS0qVlZW2OBugMj397d8R4M3XmixDDn0c4HdwB2WFLZoginY0dGR3BumgFMgilkGWq5fwUlQcM7ib2tc8c2cHGwxkGCLgQRbDBzEv/+fMNX6EnMcrwAAAABJRU5ErkJggg==" alt=""> </div> <div class="st-animated-card__payment-logo st-animated-card__payment-logo--default" id="st-animated-card-payment-logo"></div> </div> <div class="st-animated-card__pan"> <label class="st-animated-card__label" id="st-animated-card-card-number-label">Card number</label> <div class="st-animated-card__value" id="st-animated-card-number">∙∙∙∙ ∙∙∙∙ ∙∙∙∙ ∙∙∙∙</div> </div> <div class="st-animated-card__expiration-date-and-security-code"> <div class="st-animated-card__expiration-date"> <label class="st-animated-card__label" id="st-animated-card-expiration-date-label">Expiration date</label> <div class="st-animated-card__value" id="st-animated-card-expiration-date">MM/YY</div> </div> <div class="st-animated-card__security-code st-animated-card__security-code--front st-animated-card__security-code--front-hidden" id="st-animated-card-security-code-front"> <label class="st-animated-card__label" id="st-animated-card-security-code-label">Security code</label> <div class="st-animated-card__value" id="st-animated-card-security-code-front-field"></div> </div> </div> </div> <div class="st-animated-card__side st-animated-card__back" id="st-animated-card-side-back"> <div class="st-animated-card__signature"></div> <div class="st-animated-card__security-code" id="st-animated-card-security-code">∙∙∙</div> </div> </div> </div> </div></form>';
  const config: any = {
    locale: 'en_GB',
    fields: {
      inputs: {
        cardNumber: 'st-card-number-input',
        expirationDate: 'st-expiration-date-input',
        securityCode: 'st-security-code-input'
      },
      errors: {
        cardNumber: 'st-card-number-message',
        expirationDate: 'st-expiration-date-message',
        securityCode: 'st-security-code-message'
      }
    },
    animatedCardContainer: 'st-animated-card'
  };

  // @ts-ignore
  const instance = new STCard(config);
  return { instance };
}
