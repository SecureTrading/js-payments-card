import DomMethods from '../../src/shared/DomMethods';

// given
describe('DomMethods', () => {
  // when
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  // given
  describe('DomMethods.removeChildFromDOM', () => {
    // when
    const { htmlForParentAndChild } = createFormFixture();
    beforeEach(() => {
      document.body.innerHTML = htmlForParentAndChild;
      DomMethods.removeChildFromDOM('st-form', 'some-title');
    });

    // then
    it('should remove child element from DOM', () => {
      expect(document.getElementById('st-form').childElementCount).toEqual(0);
    });
  });
});

function addInput(form: any, name: string, value: string, stName?: string) {
  const input = document.createElement('input');
  input.name = name;
  input.value = value;
  if (stName) {
    input.setAttribute('data-st-name', stName);
  }
  form.appendChild(input);
}

function createFormFixture() {
  const html =
    '<form id="st-form" class="example-form"> <h1 class="example-form__title"> Secure Trading<span>AMOUNT: <strong>10.00 GBP</strong></span> </h1> <div class="example-form__section example-form__section--horizontal"> <div class="example-form__group"> <label for="example-form-name" class="example-form__label example-form__label--required">NAME</label> <input id="example-form-name" class="example-form__input" type="text" placeholder="John Doe" autocomplete="name" /> </div> <div class="example-form__group"> <label for="example-form-email" class="example-form__label example-form__label--required">E-MAIL</label> <input id="example-form-email" class="example-form__input" type="email" placeholder="test@mail.com" autocomplete="email" /> </div> <div class="example-form__group"> <label for="example-form-phone" class="example-form__label example-form__label--required">PHONE</label> <input id="example-form-phone" class="example-form__input" type="tel" placeholder="+00 000 000 000" autocomplete="tel" /> </div> </div> <div class="example-form__spacer"></div> <div class="example-form__section"> <div id="st-notification-frame" class="example-form__group"></div> <div id="st-card-number" class="example-form__group"></div> <div id="st-expiration-date" class="example-form__group"></div> <div id="st-security-code" class="example-form__group"></div> <div id="st-error-container" class="example-form__group"></div> <div class="example-form__spacer"></div> </div> <div class="example-form__section"> <div class="example-form__group"> <button type="submit" class="example-form__button">PAY</button> </div> </div> <div class="example-form__section"> <div id="st-control-frame" class="example-form__group"></div> <div id="st-visa-checkout" class="example-form__group"></div> <div id="st-apple-pay" class="example-form__group"></div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"></div> </form>';
  const htmlForParentAndChild =
    '<form id="st-form" class="example-form"><h1 class="example-form__title" id="some-title"> Secure Trading</h1></form>';

  const form = document.createElement('form');
  addInput(form, 'myfield', '', 'stFieldName');
  addInput(form, 'myfield2', 'some value', 'stFieldName2');
  addInput(form, 'myfield3', 'ignored');
  addInput(form, 'duplicate', 'value1', 'stDuplicate');
  addInput(form, 'duplicate', 'value2', 'stDuplicate');

  const select = document.createElement('select');
  select.name = 'selectField';
  select.setAttribute('data-st-name', 'stSelectName');

  const opt1 = document.createElement('option');
  const opt2 = document.createElement('option');

  const scriptUrl = 'http://example.com/test.js';
  const parseFormObject = {
    stFieldName: '',
    stFieldName2: 'some value',
    stDuplicate: 'value2',
    stSelectName: 'B'
  };
  opt1.value = 'A';
  opt2.value = 'B';
  opt2.selected = true;
  select.appendChild(opt1);
  select.appendChild(opt2);
  form.appendChild(select);
  return { form, html, htmlForParentAndChild, parseFormObject, scriptUrl };
}
