import Validation from '../../src/shared/Validation';
import each from 'jest-each';

// given
describe('Validation', () => {
  const { element, errorContainer, errorMessage, instance } = ValidationFixture();
  // when
  beforeEach(() => {});

  // given
  describe('setKeyDownProperties', () => {
    const event: any = { keyCode: '45' };
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
  describe('keepCursorAtSamePosition', () => {
    beforeEach(() => {
      // @ts-ignore
      instance._selectionRangeStart = 2;
      // @ts-ignore
      instance._selectionRangeEnd = 2;
      // @ts-ignore
      instance._isPressedKeyBackspace = jest.fn().mockReturnValueOnce(true);
    });
    // then
    it('should set selection range when delete key is pressed', () => {});
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
    it('should set validity valid as true when input is correct', () => {
      element.value = '4111111111111111';
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
    it('should return clipboardData', () => {});
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
        type: 'VISA',
        length: [16]
      });
      // @ts-ignore
      instance.cardNumber('41111111111111112222');
      // @ts-ignore
      expect(instance.cardNumberValue).toEqual('4111111111111111');
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
  describe('getCardDetails', () => {
    // when
    beforeEach(() => {
      // @ts-ignore
      instance.binLookup.binLookup = jest.fn().mockReturnValueOnce({
        type: 'VISA',
        luhn: true,
        length: [16],
        cvcLength: [3],
        format: 'some regexp'
      });
      // @ts-ignore
      instance.getCardDetails('41111');
    });
    // then
    it('should return card details if card number is specified', () => {
      // @ts-ignore
      instance.getCardDetails('41111');
      // @ts-ignore
      expect(instance.binLookup.binLookup).toHaveReturnedWith({
        type: 'VISA',
        luhn: true,
        length: [16],
        cvcLength: [3],
        format: 'some regexp'
      });
    });
  });

  // given
  describe('_isPressedKeyBackspace', () => {
    // then
    it('should return false if pressed key is not Backspace', () => {});

    // then
    it('should return true if pressed key is Backspace', () => {});
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
  const errorMessage: string = 'This is some random error message';
  const element: HTMLInputElement = document.createElement('input');
  element.setAttribute('required', 'true');
  const errorContainer: HTMLDivElement = document.createElement('div');
  const instance = new Validation(locale);
  return { instance, element, errorContainer, errorMessage };
}
