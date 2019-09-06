import Card from '../../src/models/Card/Card';
import { CARD_SELECTORS } from '../../src/imports/card/card-selectors';

// given
describe('Card', () => {
  document.body.innerHTML = `<div class="st-animated-card" id="st-animated-card"><div class="st-animated-card__content"><div class="st-animated-card__side st-animated-card__front" id="st-animated-card-side-front"><div class="st-animated-card__logos"><div class="st-animated-card__chip-logo"><img class="st-animated-card__chip-logo-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAArCAYAAAAtxEsrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAU8SURBVGhD3ZnHSjRBFIX/1xLUhaKgqLhRXIhiWohi2JjBHBYi5uxCFCMqigkVzBHFnLMLX6P+PgUlt2puz3SPrmbxUdO3qnvON52qe/4JIQIathhIsMVAgi2atLa2ip2dHXF5eSnu7u5Y7u/vHfHw8OCVx8dHr2AbyDE3NycSExOteHxmBVtULCwsyA1yQk5Q6yq5v4L+EAcHB1ZUPj9gi+Di4oLduCnhhJOTE9Hf3y+amppki2XUb29vfwW2AVm0MTExVmxPD48CsJOjqPC+mJ+fF6GhoaKwsFA0NzfLNjIyUoyOjsp+LrhbIInW9AAeBXVYusGUUgwNDYmgoCBxfHwsvr6+xPv7u2z39/dlfWpqShtvBncDJHd3dy0F3UdbAJyAUxBStcvLyyIqKkqcnp7Kc4WKYBkXCkguLS1pfYAT8AXWg2R8fLylYSPY1tbmEdpfkpOTxcTEhIecAvXx8XE5juuncEIcEMQ2qZMmuLe3x4Z1y8zMjLyEv729yWUuNHh9fRUJCQlyPNdvwklR8F1nZ2eWio3g1dWV/BUADeyWvLw8+UuadS705OSkyMnJYfu8YSeIljppgkpOCfoje3NzI8LDw4W3KzENinFhYWHi+vpaq/sCIqqlgshLnWwFTcyQdszOzoq0tDRX66Snpzs+TO34taDCDGdSWVkp+vr62D47uru7RXV1tfzMhXcK1kdG6qQJ4kvcUFVV5UFGRobo6enRBHwxNjYmz8O6ujpJbW2tX2Dd+vp6S8VGsLe3V7gFMqoFRUVFckrGidjR0tIiA66vr2usra25AutsbGxYKjaCmGn8BtwWVldXRWZmJitiR0pKigz49PTkFdw7vYExz8/PloqNIAaZ55xbcLLjKoqrIpY5Icr5+bkcr84hJ5jnnkL1UycPQSXpryzWw1UUUzWzj4ZUYDKelZXF9jnBFMT3UCdW0MQM6ov8/HwxPT3tUTfDgeHhYVFaWsr2OeXXghQzNAduFYODg2wfBYEGBgbkeBr4N2C71Mm1oMIMSykpKREjIyNsnwkeqSoqKtiw/oBtUie/BSlmaNzT8M7ErHNgzlpcXPyzzIV2C3X6E0EFAqJNSkoSm5ubP6G9gXtXamqqVuNCOwXrU6c/FQR4wI2IiJD3IxraDqyjJudcP+BEvEGd/lwQD7kFBQVajQtNyc7OZq+6JpyMCcZRJ00Q8ziFmhe6BbOYrq4uTdCXKK64eIY055beqKmpYUEfddIE1XwSYIZPPzslNzdXBuYEFaYgLjQQxA/jlM7Ozp+Wghp10gQ/Pz+FHR8fH47o6OgQjY2NrBgHBBsaGgTennPzW6dgHqw+UydN0JzccnAhKdvb2/I9C9dnB8ZvbW3Jz+bedQvOQ+qkCWKizEnZYQYFLy8vIi4uTv6XwfWb4F1mbGysXE/VuOBOwXsl6qQJHh4esiLeQCDVKvDgi0OV1uzAeYPxXB8n4Au8GaROmiBCmQJuQCi0+O8hOjpavoAyQ1PQj/8UMJ7rN+GETNrb2y0VG0FghvYHvO8sLy+XtxsuqAK3lbKyMu3wdAInpjB9tAWA5zgutFuwd0JCQuQtQNVoSLyYwrnnay/7gsotLi5aCrqPtqDA0zgN6w/YK5iuQRLnGWoqFPZscHCwfAuNMTSwP0AO/3WYHsCjoPgrSVyZ8cSOvUVbHMZuD007zCsnhS0qVlZW2OBugMj397d8R4M3XmixDDn0c4HdwB2WFLZoginY0dGR3BumgFMgilkGWq5fwUlQcM7ib2tc8c2cHGwxkGCLgQRbDBzEv/+fMNX6EnMcrwAAAABJRU5ErkJggg==" alt="" /> </div> <div class="st-animated-card__payment-logo st-animated-card__payment-logo--default" id="st-animated-card-payment-logo" ></div> </div> <div class="st-animated-card__pan"> <label class="st-animated-card__label" id="st-animated-card-card-number-label"></label> <div class="st-animated-card__value" id="st-animated-card-number"></div> </div> <div class="st-animated-card__expiration-date-and-security-code"> <div class="st-animated-card__expiration-date"> <label class="st-animated-card__label" id="st-animated-card-expiration-date-label"></label> <div class="st-animated-card__value" id="st-animated-card-expiration-date"></div> </div> <div class="st-animated-card__security-code st-animated-card__security-code--front st-animated-card__security-code--front-hidden" id="st-animated-card-security-code-front" > <label class="st-animated-card__label" id="st-animated-card-security-code-label"></label> <div class="st-animated-card__value" id="st-animated-card-security-code-front-field"></div> </div> </div> </div> <div class="st-animated-card__side st-animated-card__back" id="st-animated-card-side-back"> <div class="st-animated-card__signature"></div> <div class="st-animated-card__security-code" id="st-animated-card-security-code"></div> </div> </div> </div>`;
  const { instance } = CardFixture();
  // given
  describe('onCardNumberChanged()', () => {
    const { correctCardNumber } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._resetTheme = jest.fn();
      // @ts-ignore
      instance._setTheme = jest.fn();
      // @ts-ignore
      instance._setCardNumberDetails = jest.fn().mockReturnValueOnce({ type: 'VISA', nonformat: '4111' });
    });

    // then
    it('_setCardNumberDetails() has been called with cardNumber', () => {
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance._setCardNumberDetails).toHaveBeenCalledWith(correctCardNumber);
    });

    // then
    it('should return nonformat', () => {
      // @ts-ignore
      expect(instance.onCardNumberChanged(correctCardNumber)).toEqual({ nonformat: '4111' });
    });

    // then
    it('should call resetTheme if type is undefined', () => {
      // @ts-ignore
      instance._setCardNumberDetails = jest.fn().mockReturnValueOnce({ type: null, nonformat: '4111' });
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance._resetTheme).toBeCalled();
    });

    // then
    it('should call setContent ', () => {
      // @ts-ignore
      instance.setContent = jest.fn();
      // @ts-ignore
      instance._setCardNumberDetails = jest.fn().mockReturnValueOnce({ type: null, nonformat: '4111' });
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance.setContent).toBeCalled();
    });

    // then
    it('should set security code after card number change', () => {
      // @ts-ignore
      instance._setCardNumberDetails = jest.fn().mockReturnValueOnce({ type: 'VISA', nonformat: '4111' });
      // @ts-ignore
      instance._setSecurityCode = jest.fn();
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance._setSecurityCode).toBeCalled();
    });
  });
  // given
  describe('onExpirationDateChanged()', () => {
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._expirationDateId = 'st-animated-card-expiration-date';
    });

    // then
    it('should call setContent ', () => {
      // @ts-ignore
      instance.setContent = jest.fn();
      // @ts-ignore
      instance.onExpirationDateChanged('1222');
      // @ts-ignore
      expect(instance.setContent).toBeCalled();
      // @ts-ignore
      expect(instance._cardDetails.expirationDate).toEqual('12/22');
    });
  });
  // given
  describe('onSecurityCodeChanged()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('flipCard()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('getCardDetails()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('isAmex()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_isFlippableCard()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_returnThemeClass()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_setCardNumberDetails()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_addSecurityCodeOnBack()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_addSecurityCodeOnFront()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_setSecurityCode()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_setSecurityCodePlaceholder()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_clearThemeClasses()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_resetTheme()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_setTheme()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_setThemeClasses()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_addLogo()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_createLogo()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_getLogoURI()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_removeLogo()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
  // given
  describe('_setLogo()', () => {
    // when
    beforeEach(() => {});

    // then
    it('', () => {});
  });
});

function CardFixture() {
  const config = {
    locale: 'en_GB',
    fields: {
      inputs: {
        cardNumberId: 'merchants-card-number',
        expirationDateId: 'merchants-expiration-date',
        securityCodeId: 'merchants-security-code'
      }
    },
    animatedCardContainer: 'st-animated-card'
  };
  const correctCardNumber: string = '41111111111111111';
  const instance = new Card(config);
  return { correctCardNumber, instance };
}
