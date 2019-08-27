import 'location-origin';
import 'url-polyfill';
import {cardsLogos} from '../../imports/card/card-logos';
import {CARD_CLASSES, CARD_COMPONENT_CLASS, CARD_SELECTORS} from "../../imports/card/card-selectors";
import {CARD_TYPES, CARD_DETAILS_PLACEHOLDERS} from "../../imports/card/card-type";
import DomMethods from '../DomMethods/DomMethods';
import Translator from '../Translation/Translation';
import {ICardDetails, ISubscribeObject} from './ICard';
import BinLookup from "../../shared/BinLookup";
import Utils from "../../shared/Utils";


class Card extends Utils {
  private static NOT_FLIPPED_CARDS = [CARD_TYPES.AMEX];
  private static SECURITY_CODE_LENGTH_EXTENDED = 4;
  private _binLookup: BinLookup;
  private _cardDetails: ICardDetails = {
    cardNumber: CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER,
    expirationDate: CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE,
    flippable: true,
    logo: '',
    securityCode: CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE,
    type: CARD_DETAILS_PLACEHOLDERS.TYPE
  };
  private _translator: Translator;

  constructor() {
    super();
    this._binLookup = new BinLookup();
    this._translator = new Translator('en_GB');
    this._setLabels();
    this._setPlaceholders();
  }

  private _setLabels() {
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_LABEL, Translator.translations.LABEL_CARD_NUMBER);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_LABEL, Translator.translations.LABEL_EXPIRATION_DATE);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_LABEL, Translator.translations.LABEL_SECURITY_CODE);
  }

  private _setPlaceholders() {
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_ID, this._cardDetails.cardNumber);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID, this._cardDetails.expirationDate);
    this._isAmex(this._cardDetails.cardNumber) ?
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED) :
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE)
  }

  private _resetTheme() {
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SIDE_BACK, '');
    this.setAttr(CARD_SELECTORS.ANIMATED_CARD_SIDE_FRONT, 'class', `${CARD_CLASSES.CLASS_SIDE} ${CARD_CLASSES.CLASS_FRONT}`);
    this.setAttr(CARD_SELECTORS.ANIMATED_CARD_SIDE_BACK, 'class', `${CARD_CLASSES.CLASS_SIDE} ${CARD_CLASSES.CLASS_BACK}`);
  }

  private _returnThemeClass = (theme: string) => `${CARD_COMPONENT_CLASS}__${theme}`;
  private _getCardDetails = (value: string) => this._binLookup.binLookup(value);

  private _setTheme() {
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE);
    if (this._cardDetails.type === CARD_TYPES.AMEX) {
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED);
    }
    this._cardDetails.logo = this._getLogo(this._cardDetails.type);
    this._setLogo();
    DomMethods.addClass(this.getElement(CARD_CLASSES.CLASS_LOGO_WRAPPER), `${CARD_CLASSES.CLASS_LOGO}`);
    DomMethods.addClass(this.getElement(CARD_SELECTORS.ANIMATED_CARD_SIDE_FRONT), this._returnThemeClass(this._cardDetails.type));
    DomMethods.addClass(this.getElement(CARD_SELECTORS.ANIMATED_CARD_SIDE_BACK), this._returnThemeClass(this._cardDetails.type));
  }

  private _clearThemeClasses() {
    this._removeLogo();
    DomMethods.removeClass(this.getElement(CARD_CLASSES.CLASS_LOGO_WRAPPER), `${CARD_CLASSES.CLASS_LOGO_DEFAULT}`);
  }

  private _setLogo() {
    const {logo, type} = this._cardDetails;
    if (!document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID) && logo) {
      const element = DomMethods.createHtmlElement.apply(this, [
        {
          alt: type,
          class: CARD_CLASSES.CLASS_LOGO_IMAGE,
          id: CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID,
          src: logo
        },
        'img'
      ]);
      DomMethods.appendChildIntoDOM(CARD_CLASSES.CLASS_LOGO_WRAPPER, element);
      DomMethods.setProperty.apply(this, ['src', logo, CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID]);
    } else if (logo) {
      DomMethods.setProperty.apply(this, ['src', logo, CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID]);
    }
    return logo;
  }

  private _getLogo = (type: string) => cardsLogos[type];

  private _removeLogo() {
    DomMethods.removeChildFromDOM.apply(this, [CARD_CLASSES.CLASS_LOGO_WRAPPER, CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID]);
  }

  private setBackCvv() {
    DomMethods.addClass(this.getElement(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_ID), CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_ID, this._cardDetails.securityCode);
  }

  private setFrontCvv() {
    DomMethods.removeClass(this.getElement(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_ID), CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, this._cardDetails.securityCode);
  }

  private _setSecurityCodePlaceholder() {
    return this._isAmex(this._cardDetails.cardNumber) ?
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED) :
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE)
  }

  private _isFlippableCard = (type: string) => !Card.NOT_FLIPPED_CARDS.includes(type);

  private _flipCard() {
    const element = this.getElement(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR);

    element.classList.contains(CARD_CLASSES.CLASS_FOR_ANIMATION) ?
      element.classList.add(CARD_CLASSES.CLASS_FOR_ANIMATION) :
      element.classList.remove(CARD_CLASSES.CLASS_FOR_ANIMATION)

  }

  private _flipCardBack = () => this.setAttr(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR, 'class', CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR);
  private _isAmex = (content: string): boolean => content === CARD_TYPES.AMEX;
  private _isCardTypeChanged = (type: string | null): boolean => this._cardDetails.type !== type;

  private _onCardTypeChange() {
    this._resetTheme();
    this._setTheme();
    this._removeLogo();
    this._setLogo();
  }

  public onCardNumberChanged(value: string) {
    const type = this.toLower(this._getCardDetails(value).type);
    this._cardDetails.type = type;
    this._cardDetails.cardNumber = this.getContent(value, CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER);
    this._cardDetails.flippable = this._isFlippableCard(type);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_ID, this._cardDetails.cardNumber);
    this._isCardTypeChanged(type) && this._onCardTypeChange();
    this._flipCardBack();

  }

  private _onExpirationDateChanged(data: ISubscribeObject) {
    const {value} = data;
    this._cardDetails.expirationDate = this.getContent(value, CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE);
    this.getContent(value, CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE);
    this._flipCardBack();
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID, this._cardDetails.expirationDate);
  }

  private _onSecurityCodeChanged(data: ISubscribeObject) {
    const {value} = data;
    const placeholder: string = this._isAmex ? CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED : CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE;
    this._cardDetails.securityCode = this.getContent(value, placeholder);
    if (this._isAmex(this._cardDetails.type)) {
      this._flipCardBack();
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED);
    } else {
      this._flipCard();
      this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE)
    }
  }
}

export default Card;
