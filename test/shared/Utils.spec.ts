import Utils from '../../src/shared/Utils';
import { CARD_SELECTORS } from '../../src/imports/card/card-selectors';

// given
describe('Utils', () => {
  const { instance } = UtilsFixture();
  // when
  beforeEach(() => {
    document.body.innerHTML =
      '<form id="st-form" class="example-form"> <h1 class="example-form__title"> Secure Trading<span>AMOUNT: <strong>10.00 GBP</strong></span> </h1> <div class="example-form__section example-form__section--horizontal"> <div class="example-form__group"> <label for="example-form-name" class="example-form__label example-form__label--required">NAME</label> <input id="example-form-name" class="example-form__input" type="text" placeholder="John Doe" autocomplete="name" /> </div> <div class="example-form__group"> <label for="example-form-email" class="example-form__label example-form__label--required">E-MAIL</label> <input id="example-form-email" class="example-form__input" type="email" placeholder="test@mail.com" autocomplete="email" /> </div> <div class="example-form__group"> <label for="example-form-phone" class="example-form__label example-form__label--required">PHONE</label> <input id="example-form-phone" class="example-form__input" type="tel" placeholder="+00 000 000 000" autocomplete="tel" /> </div> </div> <div class="example-form__spacer"></div> <div class="example-form__section"> <div id="st-notification-frame" class="example-form__group"></div> <div id="st-card-number" class="example-form__group"></div> <div id="st-expiration-date" class="example-form__group"></div> <div id="st-security-code" class="example-form__group"></div> <div id="st-error-container" class="example-form__group"></div> <div class="example-form__spacer"></div> </div> <div class="example-form__section"> <div class="example-form__group"> <button type="submit" class="example-form__button">PAY</button> </div> </div> <div class="example-form__section"> <div id="st-control-frame" class="example-form__group"></div> <div id="st-visa-checkout" class="example-form__group"></div> <div id="st-apple-pay" class="example-form__group"></div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"></div> </form>';
  });

  // given
  describe('ifCardWrapperExist', () => {
    // then
    it('should return card wrapper element', () => {
      expect(Utils.ifCardWrapperExist().getAttribute('id')).toEqual(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR);
    });
  });

  // given
  describe('inArray', () => {
    // then
    it('', () => {});
  });

  // given
  describe('getLastElementOfArray', () => {
    // then
    it('', () => {});
  });

  // given
  describe('setElementAttributes', () => {
    // then
    it('', () => {});
  });

  // given
  describe('stripChars', () => {
    // then
    it('', () => {});
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
    it('', () => {});
  });

  // given
  describe('setContent', () => {
    // then
    it('', () => {});
  });

  // given
  describe('setAttr', () => {
    // then
    it('', () => {});
  });

  // given
  describe('toLower', () => {
    // then
    it('', () => {});
  });

  // given
  describe('clearContent', () => {
    // then
    it('', () => {});
  });
});

function UtilsFixture() {
  const instance = new Utils();
  return { instance };
}
