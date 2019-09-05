import Utils from '../../src/shared/Utils';
import { CARD_SELECTORS } from '../../src/imports/card/card-selectors';

// given
describe('Utils', () => {
  const { instance } = UtilsFixture();
  // given
  describe('ifCardWrapperExist', () => {
    // then
    it('should return card wrapper element', () => {
      expect(Utils.ifCardWrapperExist().getAttribute('id')).toEqual(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR);
    });
  });

  // given
  describe('inArray', () => {
    const arrayLike: number[] = [1, 2, 3, 4];
    // then
    it('should given element exists in array like object', () => {
      expect(Utils.inArray(arrayLike, 3)).toBe(true);
    });

    // then
    it('should given element doesnt exist in array like object', () => {
      expect(Utils.inArray(arrayLike, 5)).toBe(false);
    });
  });

  // given
  describe('getLastElementOfArray', () => {
    const array: number[] = [1, 2, 3, 4];
    const arrayEmpty: number[] = [];

    // then
    it('should return last element if array exists', () => {
      expect(Utils.getLastElementOfArray(array)).toEqual(4);
    });

    // then
    it('should return undefined if array is not defined', () => {
      expect(Utils.getLastElementOfArray(undefined)).toBe(undefined);
    });

    // then
    it('should return undefined if array is empty', () => {
      expect(Utils.getLastElementOfArray(arrayEmpty)).toBe(undefined);
    });
  });

  // given
  describe('setElementAttributes', () => {
    const element: HTMLInputElement = document.createElement('input');
    // then
    it('should set proper attributes given in params', () => {
      // @ts-ignore
      Utils.setElementAttributes(
        {
          firstAttribute: 'FUUUUUUUUUUUUUU',
          secondAttribute: 'Like a sir',
          thirdAttribute: 'Pepe the Frog'
        },
        element
      );
      // @ts-ignore
      expect(element.getAttribute('firstAttribute')).toEqual('FUUUUUUUUUUUUUU');
      // @ts-ignore
      expect(element.getAttribute('secondAttribute')).toEqual('Like a sir');
      // @ts-ignore
      expect(element.getAttribute('thirdAttribute')).toEqual('Pepe the Frog');
    });

    it('should clear value attribute when its specified as false', () => {
      element.setAttribute('value', 'Pepe the Frog');
      // @ts-ignore
      Utils.setElementAttributes(
        {
          value: 'dsadsadsada'
        },
        element
      );
      // @ts-ignore
      // expect(element.getAttribute('value')).toEqual('');
    });
  });

  // given
  describe('stripChars', () => {
    // then
    it('should get rid of the chars from string', () => {
      expect(Utils.stripChars('123abc')).toEqual('123');
    });
  });

  // given
  describe('forEachBreak', () => {
    // then
    it('', () => {});
  });

  // given
  describe('getElement', () => {
    // then
    it('', () => {});
  });

  // given
  describe('getContent', () => {
    // then
    it('should return value if it is specified', () => {
      // @ts-ignore
      expect(instance.getContent('test value', 'placeholder')).toEqual('test value');
    });

    // then
    it('should return placeholder if value is not specified', () => {
      // @ts-ignore
      expect(instance.getContent('', 'placeholder')).toEqual('placeholder');
    });
  });

  // given
  describe('setContent', () => {
    // then
    it('', () => {});
  });

  // given
  describe('setAttr', () => {
    const { testElementId } = UtilsFixture();
    // then
    it('should set given attribute to given value', () => {
      // @ts-ignore
      instance.setAttr(testElementId, 'someAttr', 'someValue');
      expect(document.getElementById(testElementId).getAttribute('someAttr')).toEqual('someValue');
    });
  });

  // given
  describe('toLower', () => {
    // then
    it('should return to lower case if text is specified', () => {
      // @ts-ignore
      expect(instance.toLower('SoME CONTent')).toEqual('some content');
    });

    // then
    it('should return null if text is not specified', () => {
      // @ts-ignore
      expect(instance.toLower(null)).toEqual(null);
      // @ts-ignore
      expect(instance.toLower(undefined)).toEqual(undefined);
      // @ts-ignore
      expect(instance.toLower('')).toEqual('');
    });
  });

  // given
  describe('clearContent', () => {
    const { instance, testElementId, testText } = UtilsFixture();
    // then
    it('should clear content in given element', () => {
      // @ts-ignore
      instance.translator.translate = jest.fn().mockReturnValueOnce('some translation');
      // @ts-ignore
      instance.setContent(testElementId, testText);
      // @ts-ignore
      instance.clearContent(testElementId);
      expect(document.getElementById(testElementId).textContent).toEqual('');
    });
  });
});

function UtilsFixture() {
  const html =
    '<form id="st-form" class="example-form"> <h1 class="example-form__title" id="test-title"> Secure Trading<span>AMOUNT: <strong>10.00 GBP</strong></span> </h1> <div class="example-form__section example-form__section--horizontal"> <div class="example-form__group"> <label for="example-form-name" class="example-form__label example-form__label--required">NAME</label> <input id="example-form-name" class="example-form__input" type="text" placeholder="John Doe" autocomplete="name" /> </div> <div class="example-form__group"> <label for="example-form-email" class="example-form__label example-form__label--required">E-MAIL</label> <input id="example-form-email" class="example-form__input" type="email" placeholder="test@mail.com" autocomplete="email" /> </div> <div class="example-form__group"> <label for="example-form-phone" class="example-form__label example-form__label--required">PHONE</label> <input id="example-form-phone" class="example-form__input" type="tel" placeholder="+00 000 000 000" autocomplete="tel" /> </div> </div> <div class="example-form__spacer"></div> <div class="example-form__section"  id="example-frame"> <div id="st-notification-frame" class="example-form__group"></div> <div id="st-card-number" class="example-form__group"></div> <div id="st-expiration-date" class="example-form__group"></div> <div id="st-security-code" class="example-form__group"></div> <div id="st-error-container" class="example-form__group"></div> <div class="example-form__spacer"></div> </div> <div class="example-form__section"> <div class="example-form__group"> <button type="submit" class="example-form__button">PAY</button> </div> </div> <div class="example-form__section"> <div id="st-control-frame" class="example-form__group"></div> <div id="st-visa-checkout" class="example-form__group"></div> <div id="st-apple-pay" class="example-form__group"></div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"></div> </form>';
  document.body.innerHTML = html;
  const testElementId: string = 'test-title';
  const testText: string =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at consectetur cupiditate dicta doloremque dolores eum facilis minima, minus optio pariatur possimus quaerat quas quod rem sunt velit voluptatibus voluptatum?';
  const instance = new Utils();
  return { instance, testText, testElementId };
}
