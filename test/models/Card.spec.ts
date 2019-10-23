import Card from '../../src/models/Card/Card';
import { CARD_CLASSES, CARD_SELECTORS } from '../../src/imports/card/card-selectors';
import { CARD_DETAILS_PLACEHOLDERS } from '../../src/imports/card/card-type';

// given
describe('Card', () => {
  // given
  describe('onCardNumberChanged()', () => {
    const { correctCardNumber, instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._resetTheme = jest.fn();
      // @ts-ignore
      instance._setTheme = jest.fn();
      // @ts-ignore
      instance._setSecurityCode = jest.fn();
    });

    // then
    it('_setSecurityCode() has been called ', () => {
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance._setSecurityCode).toHaveBeenCalled();
    });

    // then
    it('_setTheme() has been called ', () => {
      // @ts-ignore
      instance._setCardNumberDetails = jest.fn().mockReturnValueOnce({ type: 'VISA', nonformat: '411111' });
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance._setTheme).toHaveBeenCalled();
    });

    // then
    it('should call _resetTheme() if type is falsy', () => {
      // @ts-ignore
      instance._setCardNumberDetails = jest.fn().mockReturnValueOnce({ type: undefined, nonformat: '411111' });
      instance.onCardNumberChanged(correctCardNumber);
      // @ts-ignore
      expect(instance._resetTheme).toHaveBeenCalled();
    });
  });
  // given
  describe('onExpirationDateChanged()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      instance.onExpirationDateChanged('111');
    });

    // then
    it('should set value of expiration date in class properties', () => {
      // @ts-ignore
      expect(instance._cardDetails.expirationDate).toEqual('11/1');
    });

    // then
    it('should set expiration date on card', () => {
      // @ts-ignore
      expect(document.getElementById(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID).textContent).toEqual('11/1');
    });
  });
  // given
  describe('onSecurityCodeChanged()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._setSecurityCode = jest.fn();
      instance.onSecurityCodeChanged('1111111');
    });

    // then
    it('should set value of security code in class properties and shorten it if its necessary', () => {
      // @ts-ignore
      expect(instance._cardDetails.securityCode).toEqual('111');
    });

    // then
    it('should set security code on card', () => {
      // @ts-ignore
      expect(instance._setSecurityCode).toHaveBeenCalled();
    });
  });
  // given
  describe('flipCard()', () => {
    // when
    const { instance } = CardFixture();

    // then
    it('should flip card if its flippable', () => {
      // @ts-ignore
      instance._isFlippableCard = jest.fn().mockReturnValueOnce(true);
      instance.flipCard();
      // @ts-ignore
      expect(instance._isFlippableCard).toHaveBeenCalled();
    });

    // then
    it('should remove flip class', () => {
      // @ts-ignore
      instance._isFlippableCard = jest.fn().mockReturnValueOnce(true);
      instance.flipCard();
      expect(
        document
          .getElementById(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR)
          .classList.contains(CARD_CLASSES.CLASS_FOR_ANIMATION)
      ).toBe(false);
    });

    // then
    it('should remove flip class if its not flippable', () => {
      // @ts-ignore
      instance._isFlippableCard = jest.fn().mockReturnValueOnce(false);
      instance.flipCard();
      expect(
        document
          .getElementById(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR)
          .classList.contains(CARD_CLASSES.CLASS_FOR_ANIMATION)
      ).toBe(false);
    });
  });
  // given
  describe('getCardDetails()', () => {
    const { instance } = CardFixture();
    // when
    const returnedObject = {
      cvcLength: [3],
      format: '(\\d{1,4})(\\d{1,4})?(\\d{1,4})?(\\d+)?',
      length: [13, 16, 19],
      luhn: true,
      type: 'VISA'
    };
    // then
    it('should return card details', () => {
      expect(instance.getCardDetails('41111')).toEqual(returnedObject);
    });
  });
  // given
  describe('isAmex()', () => {
    const { instance } = CardFixture();
    // then
    it('should return if card number type is equal amex', () => {
      // @ts-ignore
      expect(instance._isAmex('amex')).toEqual(true);
      // @ts-ignore
      expect(instance._isAmex('visa')).toEqual(false);
    });
  });
  // given
  describe('_isFlippableCard()', () => {
    // when
    const { instance } = CardFixture();
    // then
    it('should return false if card is equal amex', () => {
      // @ts-ignore
      expect(instance._isFlippableCard('amex')).toEqual(false);
    });

    // then
    it('should return true if card is not equal amex', () => {
      // @ts-ignore
      expect(instance._isFlippableCard('visa')).toEqual(true);
    });
  });
  // given
  describe('_returnThemeClass()', () => {
    const { instance } = CardFixture();
    // then
    it('should return theme class', () => {
      // @ts-ignore
      expect(instance._returnThemeClass('someString')).toEqual(`st-animated-card__someString`);
    });
  });
  // given
  describe('_addSecurityCodeOnBack()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._addSecurityCodeOnBack();
    });

    // then
    it('should show security code on back by adding specific class', () => {
      expect(
        document
          .getElementById(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_ID)
          .classList.contains(CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN)
      ).toEqual(true);
    });

    // then
    it('should set security code value on back side of card', () => {
      expect(document.getElementById(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_BACK_ID).textContent).toEqual(
        // @ts-ignore
        instance._cardDetails.securityCode
      );
    });
  });
  // given
  describe('_addSecurityCodeOnFront()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._addSecurityCodeOnFront();
    });

    // then
    it('should show security code on front by removing specific class', () => {
      expect(
        document
          .getElementById(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_ID)
          .classList.contains(CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN)
      ).toEqual(false);
    });

    // then
    it('should set security code value on front', () => {
      expect(document.getElementById(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID).textContent).toEqual(
        // @ts-ignore
        instance._cardDetails.securityCode
      );
    });
  });
  // given
  describe('_setSecurityCode()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._setSecurityCodePlaceholder = jest.fn();
      // @ts-ignore
      instance._addSecurityCodeOnFront = jest.fn();
      // @ts-ignore
      instance._addSecurityCodeOnBack = jest.fn();
    });

    // then
    it('should call _setSecurityCodePlaceholder with extended placeholder and call _addSecurityCodeOnFront to set it on the front side of animated card', () => {
      // @ts-ignore
      instance._isAmex = jest.fn().mockReturnValueOnce(true);
      // @ts-ignore
      instance._setSecurityCode();
      // @ts-ignore
      expect(instance._setSecurityCodePlaceholder).toHaveBeenCalledWith(
        CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED
      );
      // @ts-ignore
      expect(instance._addSecurityCodeOnFront).toHaveBeenCalled();
    });

    // then
    it('should call _setSecurityCodePlaceholder with standard length placeholder and call _addSecurityCodeOnBack to set it on the back side of animated card', () => {
      // @ts-ignore
      instance._isAmex = jest.fn().mockReturnValueOnce(false);
      // @ts-ignore
      instance._setSecurityCode();
      // @ts-ignore
      expect(instance._setSecurityCodePlaceholder).toHaveBeenCalledWith(CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE);
      // @ts-ignore
      expect(instance._addSecurityCodeOnBack).toHaveBeenCalled();
    });
  });
  // given
  describe('_setSecurityCodePlaceholder()', () => {
    const { instance } = CardFixture();

    // then
    it('should set given placeholder to security code when security code is empty', () => {
      // @ts-ignore
      instance._cardDetails.securityCode = '';
      // @ts-ignore
      instance._setSecurityCodePlaceholder('plchldr');
      // @ts-ignore
      expect(instance._cardDetails.securityCode).toEqual('plchldr');
    });
    // then
    it('should set given placeholder to security code when security code is equal standard placeholder.', () => {
      // @ts-ignore
      instance._cardDetails.securityCode = CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE;
      // @ts-ignore
      instance._setSecurityCodePlaceholder('plchldr');
      // @ts-ignore
      expect(instance._cardDetails.securityCode).toEqual('plchldr');
    });
    // then
    it('should set given placeholder to security code when security code is equal extended placeholder', () => {
      // @ts-ignore
      instance._cardDetails.securityCode = CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED;
      // @ts-ignore
      instance._setSecurityCodePlaceholder('plchldr');
      // @ts-ignore
      expect(instance._cardDetails.securityCode).toEqual('plchldr');
    });

    // then
    it('should set given value when givev value is not equal empty string, nor ne of the placeholders', () => {
      // @ts-ignore
      instance._cardDetails.securityCode = '4111111';
      // @ts-ignore
      instance._setSecurityCodePlaceholder('plchldr');
      // @ts-ignore
      expect(instance._cardDetails.securityCode).toEqual('4111111');
    });
  });
  // given
  describe('_toggleLogoClasses()', () => {
    const { instance } = CardFixture();
    const classToAdd: string = 'some-test-class';
    // when
    beforeEach(() => {
      document.getElementById(CARD_CLASSES.CLASS_LOGO_WRAPPER).classList.add('test-class-to-remove');
      // @ts-ignore
      instance._toggleLogoClasses('test-class-to-remove', classToAdd);
    });

    // then
    it('should add specified class and delete the other', () => {
      expect(
        document.getElementById(CARD_CLASSES.CLASS_LOGO_WRAPPER).classList.contains('test-class-to-remove')
      ).toEqual(false);
      expect(document.getElementById(CARD_CLASSES.CLASS_LOGO_WRAPPER).classList.contains(classToAdd)).toEqual(true);
    });
  });
  // given
  describe('_resetTheme()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._removeLogo = jest.fn();
      // @ts-ignore
      instance._resetTheme();
    });

    // then
    it('should call _removeLogo', () => {
      // @ts-ignore
      expect(instance._removeLogo).toHaveBeenCalled();
    });
  });
  // given
  describe('_setTheme()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._setThemeClasses = jest.fn();
      // @ts-ignore
      instance._getLogoURI = jest.fn();
      // @ts-ignore
      instance._addLogo = jest.fn();
    });

    // then
    it('should call _setThemeClasses, _getLogoURI and _addLogo methods', () => {
      // @ts-ignore
      instance._setTheme();
      // @ts-ignore
      expect(instance._setThemeClasses).toHaveBeenCalled();
      // @ts-ignore
      expect(instance._getLogoURI).toHaveBeenCalled();
      // @ts-ignore
      expect(instance._addLogo).toHaveBeenCalled();
    });
  });
  // given
  describe('_setThemeClasses()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._toggleLogoClasses = jest.fn();
      // @ts-ignore
      instance._clearThemeClasses = jest.fn();
      // @ts-ignore
      instance._setThemeClasses();
    });

    // then
    it('should clear logo classes and theme classes', () => {
      // @ts-ignore
      expect(instance._toggleLogoClasses).toHaveBeenCalledWith(
        CARD_CLASSES.CLASS_LOGO_DEFAULT,
        CARD_CLASSES.CLASS_LOGO
      );
      // @ts-ignore
      expect(instance._clearThemeClasses).toHaveBeenCalled();
    });
  });
  // given
  describe('_addLogo()', () => {
    const { instance, testCardAttributes } = CardFixture();
    beforeEach(() => {
      // @ts-ignore
      instance._setLogo = jest.fn();
    });
    // then
    it('should set logo if image exists and source is specified', () => {
      // @ts-ignore
      instance._cardDetails = testCardAttributes;
      // @ts-ignore
      instance._addLogo();
      expect(document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID).getAttribute('src')).toEqual(
        // @ts-ignore
        instance._cardDetails.logo
      );
    });

    // then
    it('should return logo property when image exists but logo is not specified', () => {
      document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID).setAttribute('id', 'someRandomID');
      // @ts-ignore
      instance._cardDetails = {
        logo: null,
        type: 'VISA'
      };
      // @ts-ignore
      expect(instance._addLogo()).toEqual(null);
      document.getElementById('someRandomID').setAttribute('id', CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID);
    });

    // then
    it('should return logo property when image exists but logo is not specified', () => {
      document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID).setAttribute('id', 'someRandomID');
      // @ts-ignore
      instance._cardDetails = {
        logo: '../../../images/visa.png',
        type: 'VISA'
      };
      // @ts-ignore
      instance._addLogo();
      // @ts-ignore
      expect(instance._setLogo).toHaveBeenCalled();
      document.getElementById('someRandomID').setAttribute('id', CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID);
    });
  });
  // given
  describe('_createLogo()', () => {
    const { instance } = CardFixture();
    const { logo, type } = CardFixture().testCardAttributes;
    // when
    beforeEach(() => {});

    // then
    it('should return HTML logo', () => {
      // @ts-ignore
      expect(instance._createLogo(logo, type).getAttribute('alt')).toEqual('VISA');
      // @ts-ignore
      expect(instance._createLogo(logo, type).getAttribute('class')).toEqual('st-animated-card__payment-logo-img');
      // @ts-ignore
      expect(instance._createLogo(logo, type).getAttribute('id')).toEqual('st-payment-logo');
      // @ts-ignore
      expect(instance._createLogo(logo, type).getAttribute('src')).toEqual('../../../images/visa.png');
    });
  });
  // given
  describe('_getLogoURI()', () => {
    const { instance } = CardFixture();
    let { logo, type } = CardFixture().testCardAttributes;
    type = type.toLowerCase();
    // then
    it('should return correct card logo', () => {
      // @ts-ignore
      expect(instance._getLogoURI(type)).toEqual(logo);
    });
  });
  // given
  describe('_removeLogo()', () => {
    const { instance } = CardFixture();
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._removeLogo();
    });

    // then
    it('should remove logo from card wrapper', () => {
      const logoWrapper = document.getElementById(CARD_CLASSES.CLASS_LOGO_WRAPPER);
      expect(logoWrapper.children[0]).toEqual(undefined);
    });
  });
  // given
  describe('_setLogo()', () => {
    const { instance } = CardFixture();
    const { logo, type } = CardFixture().testCardAttributes;
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._setLogo(logo, type);
    });

    // then
    it('should append logo to DOM', () => {
      const logoWrapper = document.getElementById(CARD_CLASSES.CLASS_LOGO_WRAPPER);
      const logo = document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID);
      expect(logoWrapper.children[0]).toEqual(logo);
    });
  });
});

function CardFixture() {
  document.body.innerHTML = `<form id="st-form" class="merchants-form" autocomplete="off" novalidate=""> <header> <img src="https://www.securetrading.com/wp-content/uploads/2018/08/st-logo.svg" alt="Online Payment Partners" id="logo" height="54" width="300"> <h2>Secure Trading Animated Card Example</h2> </header> <div class="merchants-form__fields"> <div class="merchants-form__field"> <label for="st-card-number-input">Card number: </label> <input type="text" class="merchants-form__input error" id="st-card-number-input" name="st-card-number-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Expiration date" ariaplaceholder="MM / YY" inputmode="numeric" placeholder="XXXX XXXX XXXX XXXX"> <div class="merchants-form__error" id="st-card-number-input-error">Value mismatch pattern</div> </div> <div class="merchants-form__field"> <label for="st-expiration-date-input">Expiration date: </label> <input type="text" class="merchants-form__input" id="st-expiration-date-input" name="st-expiration-date-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Expiration date" ariaplaceholder="MM / YY" inputmode="numeric" pattern="^(0[1-9]|1[0-2])/([0-9]{2})$" placeholder="MM / YY"> <div class="merchants-form__error" id="st-expiration-date-input-error"></div> </div> <div class="merchants-form__field"> <label for="st-security-code-input">Security code: </label> <input type="text" class="merchants-form__input" id="st-security-code-input" name="st-security-code-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Security code" ariaplaceholder="XXX" inputmode="numeric" pattern="^[0-9]{3}$" placeholder="XXX"> <div class="merchants-form__error" id="st-security-code-input-error"></div> </div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"><div class="st-animated-card" id="st-animated-card"> <div class="st-animated-card__content"> <div class="st-animated-card__side st-animated-card__front st-animated-card__visa" id="st-animated-card-side-front"> <div class="st-animated-card__logos"> <div class="st-animated-card__chip-logo"> <img class="st-animated-card__chip-logo-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAArCAYAAAAtxEsrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAU8SURBVGhD3ZnHSjRBFIX/1xLUhaKgqLhRXIhiWohi2JjBHBYi5uxCFCMqigkVzBHFnLMLX6P+PgUlt2puz3SPrmbxUdO3qnvON52qe/4JIQIathhIsMVAgi2atLa2ip2dHXF5eSnu7u5Y7u/vHfHw8OCVx8dHr2AbyDE3NycSExOteHxmBVtULCwsyA1yQk5Q6yq5v4L+EAcHB1ZUPj9gi+Di4oLduCnhhJOTE9Hf3y+amppki2XUb29vfwW2AVm0MTExVmxPD48CsJOjqPC+mJ+fF6GhoaKwsFA0NzfLNjIyUoyOjsp+LrhbIInW9AAeBXVYusGUUgwNDYmgoCBxfHwsvr6+xPv7u2z39/dlfWpqShtvBncDJHd3dy0F3UdbAJyAUxBStcvLyyIqKkqcnp7Kc4WKYBkXCkguLS1pfYAT8AXWg2R8fLylYSPY1tbmEdpfkpOTxcTEhIecAvXx8XE5juuncEIcEMQ2qZMmuLe3x4Z1y8zMjLyEv729yWUuNHh9fRUJCQlyPNdvwklR8F1nZ2eWio3g1dWV/BUADeyWvLw8+UuadS705OSkyMnJYfu8YSeIljppgkpOCfoje3NzI8LDw4W3KzENinFhYWHi+vpaq/sCIqqlgshLnWwFTcyQdszOzoq0tDRX66Snpzs+TO34taDCDGdSWVkp+vr62D47uru7RXV1tfzMhXcK1kdG6qQJ4kvcUFVV5UFGRobo6enRBHwxNjYmz8O6ujpJbW2tX2Dd+vp6S8VGsLe3V7gFMqoFRUVFckrGidjR0tIiA66vr2usra25AutsbGxYKjaCmGn8BtwWVldXRWZmJitiR0pKigz49PTkFdw7vYExz8/PloqNIAaZ55xbcLLjKoqrIpY5Icr5+bkcr84hJ5jnnkL1UycPQSXpryzWw1UUUzWzj4ZUYDKelZXF9jnBFMT3UCdW0MQM6ov8/HwxPT3tUTfDgeHhYVFaWsr2OeXXghQzNAduFYODg2wfBYEGBgbkeBr4N2C71Mm1oMIMSykpKREjIyNsnwkeqSoqKtiw/oBtUie/BSlmaNzT8M7ErHNgzlpcXPyzzIV2C3X6E0EFAqJNSkoSm5ubP6G9gXtXamqqVuNCOwXrU6c/FQR4wI2IiJD3IxraDqyjJudcP+BEvEGd/lwQD7kFBQVajQtNyc7OZq+6JpyMCcZRJ00Q8ziFmhe6BbOYrq4uTdCXKK64eIY055beqKmpYUEfddIE1XwSYIZPPzslNzdXBuYEFaYgLjQQxA/jlM7Ozp+Wghp10gQ/Pz+FHR8fH47o6OgQjY2NrBgHBBsaGgTennPzW6dgHqw+UydN0JzccnAhKdvb2/I9C9dnB8ZvbW3Jz+bedQvOQ+qkCWKizEnZYQYFLy8vIi4uTv6XwfWb4F1mbGysXE/VuOBOwXsl6qQJHh4esiLeQCDVKvDgi0OV1uzAeYPxXB8n4Au8GaROmiBCmQJuQCi0+O8hOjpavoAyQ1PQj/8UMJ7rN+GETNrb2y0VG0FghvYHvO8sLy+XtxsuqAK3lbKyMu3wdAInpjB9tAWA5zgutFuwd0JCQuQtQNVoSLyYwrnnay/7gsotLi5aCrqPtqDA0zgN6w/YK5iuQRLnGWoqFPZscHCwfAuNMTSwP0AO/3WYHsCjoPgrSVyZ8cSOvUVbHMZuD007zCsnhS0qVlZW2OBugMj397d8R4M3XmixDDn0c4HdwB2WFLZoginY0dGR3BumgFMgilkGWq5fwUlQcM7ib2tc8c2cHGwxkGCLgQRbDBzEv/+fMNX6EnMcrwAAAABJRU5ErkJggg==" alt=""> </div> <div class="st-animated-card__payment-logo" id="st-animated-card-payment-logo"><img alt="visa" class="st-animated-card__payment-logo-img" id="st-payment-logo" src="../../../images/visa.png"></div> </div> <div class="st-animated-card__pan"> <label class="st-animated-card__label" id="st-animated-card-card-number-label">Card number</label> <div class="st-animated-card__value" id="st-animated-card-number">4554 3543 5435</div> </div> <div class="st-animated-card__expiration-date-and-security-code"> <div class="st-animated-card__expiration-date"> <label class="st-animated-card__label" id="st-animated-card-expiration-date-label">Expiration date</label> <div class="st-animated-card__value" id="st-animated-card-expiration-date">MM/YY</div> </div> <div class="st-animated-card__security-code st-animated-card__security-code--front st-animated-card__security-code--front-hidden" id="st-animated-card-security-code-front"> <label class="st-animated-card__label" id="st-animated-card-security-code-label">Security code</label> <div class="st-animated-card__value" id="st-animated-card-security-code-front-field"></div> </div> </div> </div> <div class="st-animated-card__side st-animated-card__back st-animated-card__visa" id="st-animated-card-side-back"> <div class="st-animated-card__signature"></div> <div class="st-animated-card__security-code" id="st-animated-card-security-code">∙∙∙</div> </div> </div> </div> </div> </form>`;
  const config = {
    animatedCardContainer: 'st-animated-card',
    fields: {
      errors: {
        cardNumber: 'st-card-number-message',
        expirationDate: 'st-expiration-date-message',
        securityCode: 'st-security-code-message'
      },
      inputs: {
        cardNumber: 'st-card-number-input',
        expirationDate: 'st-expiration-date-input',
        securityCode: 'st-security-code-input'
      }
    },
    locale: 'en_GB'
  };
  const correctCardNumber: string = '41111111111111111';
  const testCardAttributes = {
    logo: '../../../images/visa.png',
    type: 'VISA'
  };
  const instance = new Card(config);
  return { correctCardNumber, instance, testCardAttributes };
}
