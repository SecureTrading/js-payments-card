import Validation from '../../src/shared/Validation';

// given
describe('Validation', () => {
  const { instance } = ValidationFixture();
  // when
  beforeEach(() => {});

  // given
  describe('setKeyDownProperties', () => {
    const element: HTMLInputElement = document.createElement('input');
    const event: any = { keyCode: '45' };
    beforeEach(() => {
      instance.setKeyDownProperties(element, event);
    });
    // then
    it('should set all of the specified properties', () => {
      // this._currentKeyCode = event.keyCode;
      // this._selectionRangeStart = element.selectionStart;
      // this._selectionRangeEnd = element.selectionEnd;
      // @ts-ignore
      expect(instance._currentKeyCode).toEqual('45');
    });
  });

  // given
  describe('keepCursorAtSamePosition', () => {
    // then
    it('', () => {});
  });

  // given
  describe('luhnCheck', () => {
    // then
    it('', () => {});
  });

  // given
  describe('validate', () => {
    // then
    it('', () => {});
  });

  // given
  describe('preventNonDigits', () => {
    // then
    it('', () => {});
  });

  // given
  describe('cardNumber', () => {
    // then
    it('', () => {});
  });

  // given
  describe('expirationDate', () => {
    // then
    it('', () => {});
  });

  // given
  describe('securityCode', () => {
    // then
    it('', () => {});
  });

  // given
  describe('getCardDetails', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_isPressedKeyDelete', () => {
    // then
    it('', () => {});
  });

  // given
  describe('limitLength', () => {
    // then
    it('', () => {});
  });

  // given
  describe('removeNonDigits', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_isNumber', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_luhnAlgorithm', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_setError', () => {
    // then
    it('', () => {});
  });

  // given
  describe('_removeError', () => {
    // then
    it('', () => {});
  });
});

function ValidationFixture() {
  const locale: string = 'en_GB';
  const instance = new Validation(locale);
  return { instance };
}
