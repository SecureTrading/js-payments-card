/**
 * Defines animated card, it's 'stateless' component which only receives data validated previously by other components.
 * TODO: In not distant future it'll be refactored to standalone version available to work with library.
 */
class Card {
  private static ANIMATED_CARD_INPUT_SELECTOR = 'st-animated-card';
  private static  ANIMATED_CARD_CREDIT_CARD_ID = 'st-animated-card-number';
  private static  ANIMATED_CARD_EXPIRATION_DATE_ID = 'st-animated-card-expiration-date';
  private static  ANIMATED_CARD_SECURITY_CODE_ID = 'st-animated-card-security-code';
  private static  ANIMATED_CARD_SECURITY_CODE_FRONT_ID = 'st-animated-card-security-code-front';
  private static  ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID = 'st-animated-card-security-code-front-field';
  private static  ANIMATED_CARD_SIDE_FRONT: string = 'st-animated-card-side-front';
  private static  ANIMATED_CARD_SIDE_BACK: string = 'st-animated-card-side-back';
  private static  ANIMATED_CARD_PAYMENT_LOGO_ID: string = 'st-payment-logo';
  private static  ANIMATED_CARD_COMPONENT_FRAME: string = 'st-animated-card-iframe';
  private static  ANIMATED_CARD_COMPONENT_NAME: string = 'animatedCard';
  private static  ANIMATED_CARD_CREDIT_CARD_LABEL = 'st-animated-card-card-number-label';
  private static  ANIMATED_CARD_EXPIRATION_DATE_LABEL = 'st-animated-card-expiration-date-label';
  private static  ANIMATED_CARD_SECURITY_CODE_LABEL = 'st-animated-card-security-code-label';
  private static ifCardExists = (): HTMLInputElement =>
    document.getElementById(Card.ANIMATED_CARD_INPUT_SELECTOR) as HTMLInputElement;

  private static CARD_TYPES = {
    AMEX: 'amex',
    ASTROPAYCARD: 'astropaycard',
    DEFAULT: 'default',
    DINERS: 'diners',
    DISCOVER: 'discover',
    JCB: 'jcb',
    MAESTRO: 'maestro',
    MASTERCARD: 'mastercard',
    PIBA: 'piba',
    VISA: 'visa'
  };

  private static CARD_COMPONENT_CLASS = 'st-animated-card';
  private static CARD_CLASSES = {
    CLASS_BACK: `${Card.CARD_COMPONENT_CLASS}__back`,
    CLASS_FOR_ANIMATION: `${Card.CARD_COMPONENT_CLASS}__flip-card`,
    CLASS_FRONT: `${Card.CARD_COMPONENT_CLASS}__front`,
    CLASS_LOGO: `${Card.CARD_COMPONENT_CLASS}__payment-logo`,
    CLASS_LOGO_DEFAULT: `${Card.CARD_COMPONENT_CLASS}__payment-logo--default`,
    CLASS_LOGO_IMAGE: `${Card.CARD_COMPONENT_CLASS}__payment-logo-img`,
    CLASS_LOGO_WRAPPER: `${Card.CARD_COMPONENT_CLASS}-payment-logo`,
    CLASS_SECURITY_CODE_HIDDEN: `${Card.CARD_COMPONENT_CLASS}__security-code--front-hidden`,
    CLASS_SIDE: `${Card.CARD_COMPONENT_CLASS}__side`
  };
  private static CARD_DETAILS_PLACEHOLDERS = {
    CARD_NUMBER: '\u2219\u2219\u2219\u2219 \u2219\u2219\u2219\u2219 \u2219\u2219\u2219\u2219 \u2219\u2219\u2219\u2219',
    EXPIRATION_DATE: 'MM/YY',
    SECURITY_CODE: '\u2219\u2219\u2219',
    SECURITY_CODE_EXTENDED: '\u2219\u2219\u2219\u2219',
    TYPE: 'default'
  };

  private static NOT_FLIPPED_CARDS = [Card.CARD_TYPES.AMEX];
  private static SECURITY_CODE_LENGTH_EXTENDED = 4;

  /**
   * Set one of three values on animated card
   * @param value
   * @param placeholder
   */
  private static _setCardDetail = (value: string, placeholder: string) => (value ? value : placeholder);

  /**
   * Getting logo from external js file
   * @param type
   */
  private static _getLogo = (type: string) => cardsLogos[type];
  private _animatedCardBack: HTMLElement = document.getElementById(Card.ANIMATED_CARD_SIDE_BACK);
  private _animatedCardExpirationDate: HTMLElement = document.getElementById(
    Card.ANIMATED_CARD_EXPIRATION_DATE_ID
  );
  private _animatedCardFront: HTMLElement = document.getElementById(Card.ANIMATED_CARD_SIDE_FRONT);
  private _animatedCardPan: HTMLElement = document.getElementById(Card.ANIMATED_CARD_CREDIT_CARD_ID);
  private _animatedCardSecurityCode: HTMLElement = document.getElementById(Card.ANIMATED_CARD_SECURITY_CODE_ID);
  private _animatedCardSecurityCodeFront: HTMLElement = document.getElementById(
    Card.ANIMATED_CARD_SECURITY_CODE_FRONT_ID
  );
  private _animatedCardSecurityCodeFrontField: HTMLElement = document.getElementById(
    Card.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID
  );

  private _animatedCardLogoBackground: HTMLElement = document.getElementById(
    Card.CARD_CLASSES.CLASS_LOGO_WRAPPER
  );
  private _cardDetails: ICardDetails = {
    cardNumber: Card.CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER,
    expirationDate: Card.CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE,
    logo: '',
    securityCode: Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE,
    type: Card.CARD_DETAILS_PLACEHOLDERS.TYPE
  };
  private _cardElement: HTMLElement = document.getElementById(Card.ANIMATED_CARD_INPUT_SELECTOR);

  constructor() {
    this._setLabels();
    this._setDefaultInputsValues();
    this._setSubscribeEvents();
    this._onCardNumberChanged({formattedValue: '', value: ''}); // Need to call this to use the default card type
    this._setSecurityCodeChangeListener();
    this._setSecurityCodeFocusEventListener();
  }

  /**
   * Sets placeholder for security code includes front security code for Amex cards.
   * @param securityCodeLength
   * @private
   */
  private _setSecurityCodePlaceholderContent(securityCodeLength: number) {
    if (securityCodeLength === Card.SECURITY_CODE_LENGTH_EXTENDED) {
      this._animatedCardSecurityCodeFrontField.textContent =
        Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED;
    } else {
      this._animatedCardSecurityCodeFrontField.textContent = Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE;
    }
  }

  /**
   * Listens to type of card and sets proper card length.
   * @private
   */
  private _setSecurityCodeChangeListener() {
    this._messageBus.subscribe(MessageBus.EVENTS.CHANGE_SECURITY_CODE_LENGTH, (length: number) => {
      this._setSecurityCodePlaceholderContent(length);
    });
  }

  /**
   * Checks is card should be flipped or not.
   * @private
   */
  private _setSecurityCodeFocusEventListener() {
    this._messageBus.subscribe(MessageBus.EVENTS.FOCUS_SECURITY_CODE, (state: boolean) => {
      state ? this._shouldFlipCard() : this._flipCardBack();
    });
  }

  /**
   * Sets labels for all fields of animated card
   * @private
   */
  private _setLabels() {
    this._setLabel(Card.ANIMATED_CARD_CREDIT_CARD_LABEL, Language.translations.LABEL_CARD_NUMBER);
    this._setLabel(Card.ANIMATED_CARD_EXPIRATION_DATE_LABEL, Language.translations.LABEL_EXPIRATION_DATE);
    this._setLabel(Card.ANIMATED_CARD_SECURITY_CODE_LABEL, Language.translations.LABEL_SECURITY_CODE);
  }

  /**
   * Returns theme class for specified theme
   * @param theme
   * @private
   */
  private _returnThemeClass = (theme: string) => `${Card.CARD_COMPONENT_CLASS}__${theme}`;

  /**
   * Resets styles on both sides of credit card to default theme
   * @private
   */
  private _resetTheme() {
    this._animatedCardSecurityCodeFrontField.textContent = '';
    this._animatedCardFront.setAttribute(
      'class',
      `${Card.CARD_CLASSES.CLASS_SIDE} ${Card.CARD_CLASSES.CLASS_FRONT}`
    );
    this._animatedCardBack.setAttribute(
      'class',
      `${Card.CARD_CLASSES.CLASS_SIDE} ${Card.CARD_CLASSES.CLASS_BACK}`
    );
  }

  /**
   * Sets theme properties: css settings and card type
   * @private
   */
  private _setThemeClasses() {
    const {type} = this._cardDetails;

    DOMMethods.addClass(this._animatedCardLogoBackground, `${Card.CARD_CLASSES.CLASS_LOGO}`);
    if (type) {
      DOMMethods.removeClass(this._animatedCardLogoBackground, `${Card.CARD_CLASSES.CLASS_LOGO_DEFAULT}`);
    } else {
      DOMMethods.addClass(this._animatedCardLogoBackground, `${Card.CARD_CLASSES.CLASS_LOGO_DEFAULT}`);
    }
    DOMMethods.addClass(this._animatedCardFront, this._returnThemeClass(type));
    DOMMethods.addClass(this._animatedCardBack, this._returnThemeClass(type));
  }

  /**
   * Sets card logo based on _cardDetails
   * @private
   */
  private _setLogo() {
    const {logo, type} = this._cardDetails;
    if (!document.getElementById(Card.ANIMATED_CARD_PAYMENT_LOGO_ID) && logo) {
      const element = DOMMethods.createHtmlElement.apply(this, [
        {
          alt: type,
          class: Card.CARD_CLASSES.CLASS_LOGO_IMAGE,
          id: Card.ANIMATED_CARD_PAYMENT_LOGO_ID,
          src: logo
        },
        'img'
      ]);
      DOMMethods.appendChildIntoDOM(Card.CARD_CLASSES.CLASS_LOGO_WRAPPER, element);
      DOMMethods.setProperty.apply(this, ['src', logo, Card.ANIMATED_CARD_PAYMENT_LOGO_ID]);
    } else if (logo) {
      DOMMethods.setProperty.apply(this, ['src', logo, Card.ANIMATED_CARD_PAYMENT_LOGO_ID]);
    }
    return logo;
  }

  /**
   * Sets card theme according to card brand coming from _binLookup()
   * @private
   */

  private _setTheme() {
    this._animatedCardSecurityCodeFrontField.textContent = Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE;
    if (this._cardDetails.type === Card.CARD_TYPES.AMEX) {
      this._animatedCardSecurityCodeFrontField.textContent =
        Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED;
    }
    this._cardDetails.logo = Card._getLogo(this._cardDetails.type);
  }

  /**
   * For particular type of card it sets security code on front side of card
   * @private
   */
  private _setSecurityCodeOnProperSide() {
    const isAmex: boolean = this._cardDetails.type === Card.CARD_TYPES.AMEX;

    if (isAmex) {
      DOMMethods.removeClass(this._animatedCardSecurityCodeFront, Card.CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN);
      this._animatedCardSecurityCodeFrontField.textContent = this._cardDetails.securityCode;
    } else {
      DOMMethods.addClass(this._animatedCardSecurityCodeFront, Card.CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN);
      this._animatedCardSecurityCode.textContent = this._cardDetails.securityCode;
    }
  }

  /**
   * Checks if given card should not be flipped
   * @private
   */
  private _shouldFlipCard() {
    if (!Card.NOT_FLIPPED_CARDS.includes(this._cardDetails.type)) {
      if (!this._cardElement.classList.contains(Card.CARD_CLASSES.CLASS_FOR_ANIMATION)) {
        this._flipCard();
      }
    }
  }

  /**
   * Flips card to see details on revers
   * @private
   */
  private _flipCard = () => this._cardElement.classList.add(Card.CARD_CLASSES.CLASS_FOR_ANIMATION);

  /**
   * Flips back card by clearing classes
   * @private
   */
  private _flipCardBack() {
    if (!Card.NOT_FLIPPED_CARDS.includes(this._cardDetails.type)) {
      if (this._cardElement.classList.contains(Card.CARD_CLASSES.CLASS_FOR_ANIMATION)) {
        this._cardElement.setAttribute('class', Card.ANIMATED_CARD_INPUT_SELECTOR);
      }
    }
  }

  /**
   * Removes cards logo when it's theme changed  to default
   * @private
   */
  private _removeLogo() {
    DOMMethods.removeChildFromDOM.apply(this, [
      Card.CARD_CLASSES.CLASS_LOGO_WRAPPER,
      Card.ANIMATED_CARD_PAYMENT_LOGO_ID
    ]);
  }

  /**
   * Sets placeholders for each editable value on card (card number, expiration date, security code)
   * @private
   */
  private _setDefaultInputsValues() {
    this._animatedCardPan.textContent = this._cardDetails.cardNumber;
    this._animatedCardExpirationDate.textContent = this._cardDetails.expirationDate;
    this._setSecurityCodeOnProperSide();
  }

  /**
   * Sets card type based on _binLookup request
   * @param cardNumber
   * @private
   */
  private _setCardType(cardNumber: string) {
    const type = this._binLookup.binLookup(cardNumber).type;
    return type ? type.toLowerCase() : type;
  }

  /**
   * Listens to changes coming from Card Number field and sets proper class properties.
   * Receives object: { type, name, value}
   * Where:
   * type: Type of credit card (eg. AMEX, VISA etc.)
   * value: Value passed from component
   * @private
   */
  private _onCardNumberChanged(data: ISubscribeObject) {
    const {formattedValue, value} = data;
    this._cardDetails.type = this._setCardType(value);

    if (this._cardDetails.securityCode === '') {
      if (this._cardDetails.type === Card.CARD_TYPES.AMEX) {
        this._cardDetails.securityCode = Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED;
      } else {
        this._cardDetails.securityCode = Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE;
      }
    }

    this._cardDetails.cardNumber = Card._setCardDetail(
      formattedValue,
      Card.CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER
    );
    this._animatedCardPan.textContent = this._cardDetails.cardNumber;
    this._flipCardBack();
    this._resetTheme();
    this._setTheme();
    this._removeLogo();
    this._setLogo();
    this._setThemeClasses();
    this._setSecurityCodeOnProperSide();
  }

  /**
   * Listens to changes coming from Expiration Date field and sets proper class properties.
   * Receives object: { type, name, value}
   * Where:
   * type: Type of credit card (eg. AMEX, VISA etc.)
   * value: Value passed from component
   * @private
   */
  private _onExpirationDateChanged(data: ISubscribeObject) {
    const {value} = data;
    this._cardDetails.expirationDate = Card._setCardDetail(
      value,
      Card.CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE
    );
    this._flipCardBack();
    this._animatedCardExpirationDate.textContent = this._cardDetails.expirationDate;
  }

  /**
   * Listens to changes coming from Security Code field and sets proper class properties.
   * Receives object: { type, name, value}
   * Where:
   * type: Type of credit card (eg. AMEX, VISA etc.)
   * value: Value passed from component
   * @private
   */
  private _onSecurityCodeChanged(data: ISubscribeObject) {
    const {value} = data;
    const isAmex: boolean = this._cardDetails.type === Card.CARD_TYPES.AMEX;
    this._cardDetails.securityCode = Card._setCardDetail(
      value,
      isAmex
        ? Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED
        : Card.CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE
    );
    this._shouldFlipCard();
    this._setSecurityCodeOnProperSide();
  }

  /**
   * Sets subscribe events on every editable field of card
   * @private
   */
  private _setSubscribeEvents() {
    this._messageBus.subscribe(MessageBus.EVENTS.CHANGE_CARD_NUMBER, (data: ISubscribeObject) => {
      this._onCardNumberChanged(data);
    });
    this._messageBus.subscribe(MessageBus.EVENTS.CHANGE_EXPIRATION_DATE, (data: ISubscribeObject) =>
      this._onExpirationDateChanged(data)
    );
    this._messageBus.subscribe(MessageBus.EVENTS.CHANGE_SECURITY_CODE, (data: ISubscribeObject) =>
      this._onSecurityCodeChanged(data)
    );
  }

  /**
   * Sets text of specified label
   * @param labelSelector
   * @param text
   * @private
   */
  private _setLabel(labelSelector: string, text: string) {
    document.getElementById(labelSelector).textContent = this._translator.translate(text);
  }

  private getBinLookupConfig() {
    const binLookupConfig: IBinLookupConfigType = {};
    if (this._params.paymentTypes !== undefined) {
      binLookupConfig.supported = this._params.paymentTypes.split(',');
    }
    if (this._params.defaultPaymentType !== undefined) {
      binLookupConfig.defaultCardType = this._params.defaultPaymentType;
    }
    return binLookupConfig;
  }
}

export default Card;
