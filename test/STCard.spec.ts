import STCard from '../src/STCard';
jest.mock('../src/models/Card/Card');
// given
describe('STCard', () => {
  // when
  beforeEach(() => {});

  // given
  describe('onCardNumberInput', () => {
    const { instance } = STCardFixture();
    // then
    it('', () => {});
  });

  // given
  describe('onExpirationDateInput', () => {
    // then
    it('', () => {});
  });

  // given
  describe('onSecurityCodeInput', () => {
    // then
    it('', () => {});
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
    // then
    it('', () => {});
  });
});

function STCardFixture() {
  document.body.innerHTML =
    '<form id="st-form" class="merchants-form" autocomplete="off" novalidate> <header> <img src="https://www.securetrading.com/wp-content/uploads/2018/08/st-logo.svg" alt="Online Payment Partners" id="logo" height="54" width="300" /> <h2>Secure Trading Animated Card Example</h2> </header> <div class="merchants-form__fields"> <div class="merchants-form__field"> <label for="st-card-number-input">Card number: </label> <input type="text" class="merchants-form__input" id="st-card-number-input" name="st-card-number-input" /> <div class="merchants-form__error" id="st-card-number-message"></div> </div> <div class="merchants-form__field"> <label for="st-expiration-date-input">Expiration date: </label> <input type="text" class="merchants-form__input" id="st-expiration-date-input" name="st-expiration-date-input" /> <div class="merchants-form__error" id="st-expiration-date-message"></div> </div> <div class="merchants-form__field"> <label for="st-security-code-input">Security code: </label> <input type="text" class="merchants-form__input" id="st-security-code-input" name="st-security-code-input" /> <div class="merchants-form__error" id="st-security-code-message"></div> </div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"></div> </form>';
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
