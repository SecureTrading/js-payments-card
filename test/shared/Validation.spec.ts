import Validation from '../../src/shared/Validation';
import each from 'jest-each';

// given
describe('Validation', () => {
  const { cardNumberTooLong, element, errorContainer, errorMessage, instance } = ValidationFixture();
  // given
  describe('setKeyDownProperties', () => {
    const event: any = { keyCode: '45' };
    // when
    beforeEach(() => {
      instance.setKeyDownProperties(element, event);
    });
    // then
    it('should set all of the specified properties', () => {
      // @ts-ignore
      expect(instance._currentKeyCode).toEqual('45');
      // @ts-ignore
      expect(instance._selectionRangeStart).toEqual(0);
      // @ts-ignore
      expect(instance._selectionRangeEnd).toEqual(0);
    });
  });
  // given
  describe('_isPressedKeyDelete', () => {
    // then
    it('should return false if pressed key is not Delete', () => {
      // @ts-ignore
      instance._currentKeyCode = 11;
      // @ts-ignore
      expect(instance._isPressedKeyDelete()).toEqual(false);
    });
    // then
    it('should return true if pressed key is Delete', () => {
      // @ts-ignore
      instance._currentKeyCode = Validation.DELETE_KEY_CODE;
      // @ts-ignore
      expect(instance._isPressedKeyDelete()).toEqual(true);
    });
  });
  // given
  describe('keepCursorAtSamePosition', () => {
    // then
    it('should set selection range when delete key is pressed', () => {
      element.setSelectionRange = jest.fn();
      // @ts-ignore
      instance._isPressedKeyDelete = jest.fn().mockReturnValueOnce(true);
      instance.keepCursorAtSamePosition(element, '41111');
      // @ts-ignore
      expect(element.setSelectionRange).toHaveBeenCalled();
    });

    // then
    it('should call setSelectionRange method', () => {
      element.setSelectionRange = jest.fn();
      instance.keepCursorAtSamePosition(element, '41111');
      expect(element.setSelectionRange).toHaveBeenCalled();
    });
  });
  // given
  describe('luhnCheck', () => {
    // then
    it('should set custom validity if luhn check returns falsy', () => {
      element.value = '4111 1111 1111 1111';
      instance.luhnCheck(element);
      expect(element.validity.customError).toEqual(false);
    });

    // then
    it('should delete custom validity if luhn check returns truthy', () => {
      element.value = '44342';
      instance.luhnCheck(element);
      expect(element.validity.customError).toEqual(true);
    });
  });
  // given
  describe('validate', () => {
    // then
    it('should set validity valid as false when input is empty', () => {
      element.value = '';
      instance.validate(element, errorContainer);
      // @ts-ignore
      expect(element.validity.valid).toBe(false);
      // @ts-ignore
      expect(errorContainer.textContent).toEqual('Field is required');
    });
    // then
    it('should set validity pattern mismatch as false', () => {
      element.value = 'fdsfsdfsds';
      instance.validate(element, errorContainer);
      // @ts-ignore
      expect(element.validity.valid).toBe(false);
      // @ts-ignore
      expect(errorContainer.textContent).toEqual('Value mismatch pattern');
    });
  });
  // given
  describe('onPaste', () => {
    const event = {
      preventDefault: jest.fn(),
      clipboardData: { getData: jest.fn() }
    };
    // then
    it('should call preventDefault clipboardData', () => {
      // @ts-ignore
      instance.onPaste(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
  // given
  describe('cardNumber', () => {
    // then
    it('should limit length if its too long', () => {
      // @ts-ignore
      instance.getCardDetails = jest.fn().mockReturnValueOnce({
        type: 'VISA',
        length: [18]
      });
      // @ts-ignore
      instance.cardNumber('41111111111111112222');
      // @ts-ignore
      expect(instance.cardNumberValue).toEqual('411111111111111122');
    });

    // then
    it('should limit length if its too long  and length is not specified', () => {
      // @ts-ignore
      instance.getCardDetails = jest.fn().mockReturnValueOnce({
        type: null,
        length: [20]
      });
      // @ts-ignore
      instance.cardNumber(cardNumberTooLong);
      // @ts-ignore
      expect(instance.cardNumberValue).toEqual('4111111111111111');
      // @ts-ignore
      expect(instance.cardNumberValue.length).toEqual(16);
    });
  });
  // given
  describe('expirationDate', () => {
    // then
    it('should return date with removed non digits', () => {
      // @ts-ignore
      instance.expirationDate('12/34');
      // @ts-ignore
      expect(instance.expirationDateValue).toEqual('1234');
    });
  });
  // given
  describe('securityCode', () => {
    // when
    beforeEach(() => {
      // @ts-ignore
      instance.getCardDetails = jest.fn().mockReturnValueOnce({
        type: 'VISA',
        cvcLength: [3]
      });
      // @ts-ignore
      instance.securityCode('123456');
    });
    // then
    it('should limit length if its too long', () => {
      // @ts-ignore
      expect(instance.securityCodeValue).toEqual('123');
    });
  });
  // given
  describe('_isPressedKeyBackspace', () => {
    // then
    it('should return false if pressed key is not Backspace', () => {
      // @ts-ignore
      instance._currentKeyCode = 33;
      // @ts-ignore
      expect(instance._isPressedKeyBackspace()).toBe(false);
    });

    // then
    it('should return true if pressed key is Backspace', () => {
      // @ts-ignore
      instance._currentKeyCode = 8;
      // @ts-ignore
      expect(instance._isPressedKeyBackspace()).toBe(true);
    });
  });
  // given
  describe('limitLength', () => {
    // then
    it('should limit length to specified number of chars', () => {
      // @ts-ignore
      expect(instance.limitLength('123456789101112131415', 10)).toEqual('1234567891');
    });
  });
  // given
  describe('removeNonDigits', () => {
    // then
    it('should replace non-digits in string', () => {
      // @ts-ignore
      expect(instance.removeNonDigits('1234 fsdf5423')).toEqual('12345423');
    });
  });
  // given
  describe('_isNumber', () => {
    const arrayOfExamples: [
      [string, boolean],
      [string, boolean],
      [string, boolean],
      [string, boolean],
      [string, boolean]
    ] = [['54', true], ['abcd', false], ['   ', false], ['^&&*%', false], ['dsad^&~~||1561', false]];
    // then
    // @ts-ignore
    each(arrayOfExamples).test(
      'should return boolean with check if given string matches number or not',
      (given: string, expected: boolean) => {
        // @ts-ignore
        expect(instance._isNumber(given)).toEqual(expected);
      }
    );
  });
  // given
  describe('_luhnAlgorithm', () => {
    // when
    beforeEach(() => {});

    // then
    it('should', () => {});
  });
  // given
  describe('_setError', () => {
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._translator.translate = jest.fn().mockReturnValueOnce(errorMessage);
      // @ts-ignore
      instance._setError(element, errorContainer, errorMessage);
    });

    // then
    it('should remove error class from input element and clear text from label', () => {
      // @ts-ignore
      expect(element.classList.contains(Validation.ERROR_CLASS)).toBe(true);
      expect(errorContainer.textContent).toEqual(errorMessage);
    });
  });
  // given
  describe('_removeError', () => {
    // when
    beforeEach(() => {
      // @ts-ignore
      instance._removeError(element, errorContainer);
    });

    // then
    it('should remove error class from input element and clear text from label', () => {
      // @ts-ignore
      expect(element.classList.contains(Validation.ERROR_CLASS)).toBe(false);
      expect(errorContainer.textContent).toEqual('');
    });
  });
});

function ValidationFixture() {
  const locale: string = 'en_GB';
  const cardNumberTooLong: string = '4111111111111111222212121212';
  document.body.innerHTML =
    '<form id="st-form" class="merchants-form" autocomplete="off" novalidate=""> <header> <img src="https://www.securetrading.com/wp-content/uploads/2018/08/st-logo.svg" alt="Online Payment Partners" id="logo" height="54" width="300"> <h2>Secure Trading Animated Card Example</h2> </header> <div class="merchants-form__fields"> <div class="merchants-form__field"> <label for="st-card-number-input">Card number: </label> <input type="text" class="merchants-form__input error" id="st-card-number-input" name="st-card-number-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Expiration date" ariaplaceholder="XXXX XXXX XXXX XXXX" placeholder="XXXX XXXX XXXX XXXX" pattern="^[0-9]*$" minlength="14"> <div class="merchants-form__error" id="st-card-number-input-error">Value mismatch pattern</div> </div> <div class="merchants-form__field"> <label for="st-expiration-date-input">Expiration date: </label> <input type="text" class="merchants-form__input" id="st-expiration-date-input" name="st-expiration-date-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Expiration date" ariaplaceholder="MM / YY" inputmode="numeric" pattern="^(0[1-9]|1[0-2])/([0-9]{2})$" placeholder="MM / YY"> <div class="merchants-form__error" id="st-expiration-date-input-error"></div> </div> <div class="merchants-form__field"> <label for="st-security-code-input">Security code: </label> <input type="text" class="merchants-form__input" id="st-security-code-input" name="st-security-code-input" ariainvalid="false" ariarequired="true" autocorrect="off" required="required" spellcheck="false" arialabel="Security code" ariaplaceholder="XXX" inputmode="numeric" pattern="^[0-9]{3}$" placeholder="XXX"> <div class="merchants-form__error" id="st-security-code-input-error"></div> </div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"><div class="st-animated-card" id="st-animated-card"> <div class="st-animated-card__content"> <div class="st-animated-card__side st-animated-card__front st-animated-card__visa" id="st-animated-card-side-front"> <div class="st-animated-card__logos"> <div class="st-animated-card__chip-logo"> <img class="st-animated-card__chip-logo-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAArCAYAAAAtxEsrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAU8SURBVGhD3ZnHSjRBFIX/1xLUhaKgqLhRXIhiWohi2JjBHBYi5uxCFCMqigkVzBHFnLMLX6P+PgUlt2puz3SPrmbxUdO3qnvON52qe/4JIQIathhIsMVAgi2atLa2ip2dHXF5eSnu7u5Y7u/vHfHw8OCVx8dHr2AbyDE3NycSExOteHxmBVtULCwsyA1yQk5Q6yq5v4L+EAcHB1ZUPj9gi+Di4oLduCnhhJOTE9Hf3y+amppki2XUb29vfwW2AVm0MTExVmxPD48CsJOjqPC+mJ+fF6GhoaKwsFA0NzfLNjIyUoyOjsp+LrhbIInW9AAeBXVYusGUUgwNDYmgoCBxfHwsvr6+xPv7u2z39/dlfWpqShtvBncDJHd3dy0F3UdbAJyAUxBStcvLyyIqKkqcnp7Kc4WKYBkXCkguLS1pfYAT8AXWg2R8fLylYSPY1tbmEdpfkpOTxcTEhIecAvXx8XE5juuncEIcEMQ2qZMmuLe3x4Z1y8zMjLyEv729yWUuNHh9fRUJCQlyPNdvwklR8F1nZ2eWio3g1dWV/BUADeyWvLw8+UuadS705OSkyMnJYfu8YSeIljppgkpOCfoje3NzI8LDw4W3KzENinFhYWHi+vpaq/sCIqqlgshLnWwFTcyQdszOzoq0tDRX66Snpzs+TO34taDCDGdSWVkp+vr62D47uru7RXV1tfzMhXcK1kdG6qQJ4kvcUFVV5UFGRobo6enRBHwxNjYmz8O6ujpJbW2tX2Dd+vp6S8VGsLe3V7gFMqoFRUVFckrGidjR0tIiA66vr2usra25AutsbGxYKjaCmGn8BtwWVldXRWZmJitiR0pKigz49PTkFdw7vYExz8/PloqNIAaZ55xbcLLjKoqrIpY5Icr5+bkcr84hJ5jnnkL1UycPQSXpryzWw1UUUzWzj4ZUYDKelZXF9jnBFMT3UCdW0MQM6ov8/HwxPT3tUTfDgeHhYVFaWsr2OeXXghQzNAduFYODg2wfBYEGBgbkeBr4N2C71Mm1oMIMSykpKREjIyNsnwkeqSoqKtiw/oBtUie/BSlmaNzT8M7ErHNgzlpcXPyzzIV2C3X6E0EFAqJNSkoSm5ubP6G9gXtXamqqVuNCOwXrU6c/FQR4wI2IiJD3IxraDqyjJudcP+BEvEGd/lwQD7kFBQVajQtNyc7OZq+6JpyMCcZRJ00Q8ziFmhe6BbOYrq4uTdCXKK64eIY055beqKmpYUEfddIE1XwSYIZPPzslNzdXBuYEFaYgLjQQxA/jlM7Ozp+Wghp10gQ/Pz+FHR8fH47o6OgQjY2NrBgHBBsaGgTennPzW6dgHqw+UydN0JzccnAhKdvb2/I9C9dnB8ZvbW3Jz+bedQvOQ+qkCWKizEnZYQYFLy8vIi4uTv6XwfWb4F1mbGysXE/VuOBOwXsl6qQJHh4esiLeQCDVKvDgi0OV1uzAeYPxXB8n4Au8GaROmiBCmQJuQCi0+O8hOjpavoAyQ1PQj/8UMJ7rN+GETNrb2y0VG0FghvYHvO8sLy+XtxsuqAK3lbKyMu3wdAInpjB9tAWA5zgutFuwd0JCQuQtQNVoSLyYwrnnay/7gsotLi5aCrqPtqDA0zgN6w/YK5iuQRLnGWoqFPZscHCwfAuNMTSwP0AO/3WYHsCjoPgrSVyZ8cSOvUVbHMZuD007zCsnhS0qVlZW2OBugMj397d8R4M3XmixDDn0c4HdwB2WFLZoginY0dGR3BumgFMgilkGWq5fwUlQcM7ib2tc8c2cHGwxkGCLgQRbDBzEv/+fMNX6EnMcrwAAAABJRU5ErkJggg==" alt=""> </div> <div class="st-animated-card__payment-logo" id="st-animated-card-payment-logo"><img alt="visa" class="st-animated-card__payment-logo-img" id="st-payment-logo" src="../../../images/visa.png"></div> </div> <div class="st-animated-card__pan"> <label class="st-animated-card__label" id="st-animated-card-card-number-label">Card number</label> <div class="st-animated-card__value" id="st-animated-card-number">4554 3543 5435</div> </div> <div class="st-animated-card__expiration-date-and-security-code"> <div class="st-animated-card__expiration-date"> <label class="st-animated-card__label" id="st-animated-card-expiration-date-label">Expiration date</label> <div class="st-animated-card__value" id="st-animated-card-expiration-date">MM/YY</div> </div> <div class="st-animated-card__security-code st-animated-card__security-code--front st-animated-card__security-code--front-hidden" id="st-animated-card-security-code-front"> <label class="st-animated-card__label" id="st-animated-card-security-code-label">Security code</label> <div class="st-animated-card__value" id="st-animated-card-security-code-front-field"></div> </div> </div> </div> <div class="st-animated-card__side st-animated-card__back st-animated-card__visa" id="st-animated-card-side-back"> <div class="st-animated-card__signature"></div> <div class="st-animated-card__security-code" id="st-animated-card-security-code">∙∙∙</div> </div> </div> </div> </div> </form>';
  const errorMessage: string = 'This is some random error message';
  const element: HTMLInputElement = document.getElementById('st-card-number-input') as HTMLInputElement;
  const errorContainer: HTMLDivElement = document.createElement('div');
  const instance = new Validation(locale);
  return { cardNumberTooLong, instance, element, errorContainer, errorMessage };
}
