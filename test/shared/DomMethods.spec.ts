import DomMethods from '../../src/shared/DomMethods';

// given
describe(`DomMethods`, () => {
  const { html } = domMethodsFixture();
  // when
  beforeEach(() => {
    document.body.innerHTML = html;
  });

  // given
  describe(`DomMethods.addClass`, () => {
    const { element, exampleClass } = domMethodsFixture();
    // then
    it(`should add class to DOM element`, () => {
      DomMethods.addClass(element, exampleClass);
      expect(element.classList.contains(exampleClass)).toBe(true);
    });
  });

  // given
  describe(`DomMethods.appendChildIntoDOM`, () => {
    const { element, formId } = domMethodsFixture();
    // when
    beforeEach(() => {
      element.setAttribute('id', 'some-id');
    });

    // then
    it(`should append element into DOM`, () => {
      DomMethods.appendChildIntoDOM(formId, element);
      const parent = document.getElementById(formId);
      const child = document.getElementById('some-id');
      expect(parent.contains(child)).toEqual(true);
    });

    // then
    it(`should append element into body when specified parent element is not specified`, () => {
      DomMethods.appendChildIntoDOM('st-form-test', element);
      const body = document.getElementsByTagName('body')[0];
      const child = document.getElementById('some-id');
      expect(body.contains(child)).toEqual(true);
    });
  });

  // given
  describe(`DomMethods.createHtmlElement`, () => {
    const { elementAttributes } = domMethodsFixture();
    // then
    it(`should create HTML element with given attributes`, () => {
      expect(DomMethods.createHtmlElement(elementAttributes, 'div').getAttribute('attrOne')).toBe('attribute one');
      expect(DomMethods.createHtmlElement(elementAttributes, 'div').getAttribute('attrTwo')).toBe('attribute two');
    });
  });

  // given
  describe(`DomMethods.removeClass`, () => {
    const element: HTMLDivElement = document.createElement('div');
    element.classList.add('someClass');

    // when
    beforeEach(() => {
      DomMethods.removeClass(element, 'someClass');
    });

    // then
    it(`should remove class from element`, () => {
      expect(element.classList.contains('someClass')).toEqual(false);
    });
  });

  // given
  describe(`DomMethods.removeChildFromDOM`, () => {
    // then
    it(`should remove element from DOM`, () => {
      DomMethods.removeChildFromDOM('example-frame', 'st-notification-frame');
      expect(document.getElementById('st-notification-frame')).toEqual(null);
    });

    // then
    it(`should throw an error when parent or child is not specified`, () => {
      expect(() => {
        DomMethods.removeChildFromDOM('example-frame-test', 'st-notification-frame');
      }).toThrowError();
    });
  });

  // given
  describe(`DomMethods.setProperty`, () => {
    const { exampleAttr, exampleValue, formId } = domMethodsFixture();

    // then
    it(`should add attribute to given element`, () => {
      DomMethods.setProperty(exampleAttr, exampleValue, formId);
      expect(document.getElementById(formId).getAttribute(exampleAttr)).toEqual(exampleValue);
    });
  });
});

function domMethodsFixture() {
  const exampleAttr: string = 'someProperty';
  const exampleValue: string = 'someValue';
  const elementAttributes: any = {
    attrOne: 'attribute one',
    attrTwo: 'attribute two'
  };
  const element = document.createElement('div');
  const exampleClass: string = 'someclass';
  const formId: string = 'st-form';
  const html =
    '<form id="st-form" class="example-form"> <h1 class="example-form__title"> Secure Trading<span>AMOUNT: <strong>10.00 GBP</strong></span> </h1> <div class="example-form__section example-form__section--horizontal"> <div class="example-form__group"> <label for="example-form-name" class="example-form__label example-form__label--required">NAME</label> <input id="example-form-name" class="example-form__input" type="text" placeholder="John Doe" autocomplete="name" /> </div> <div class="example-form__group"> <label for="example-form-email" class="example-form__label example-form__label--required">E-MAIL</label> <input id="example-form-email" class="example-form__input" type="email" placeholder="test@mail.com" autocomplete="email" /> </div> <div class="example-form__group"> <label for="example-form-phone" class="example-form__label example-form__label--required">PHONE</label> <input id="example-form-phone" class="example-form__input" type="tel" placeholder="+00 000 000 000" autocomplete="tel" /> </div> </div> <div class="example-form__spacer"></div> <div class="example-form__section"  id="example-frame"> <div id="st-notification-frame" class="example-form__group"></div> <div id="st-card-number" class="example-form__group"></div> <div id="st-expiration-date" class="example-form__group"></div> <div id="st-security-code" class="example-form__group"></div> <div id="st-error-container" class="example-form__group"></div> <div class="example-form__spacer"></div> </div> <div class="example-form__section"> <div class="example-form__group"> <button type="submit" class="example-form__button">PAY</button> </div> </div> <div class="example-form__section"> <div id="st-control-frame" class="example-form__group"></div> <div id="st-visa-checkout" class="example-form__group"></div> <div id="st-apple-pay" class="example-form__group"></div> </div> <div id="st-animated-card" class="st-animated-card-wrapper"></div> </form>';

  return { exampleAttr, exampleValue, element, elementAttributes, exampleClass, html, formId };
}
