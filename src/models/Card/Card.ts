import { cardsLogos } from '../../imports/card/card-logos';
import { CARD_CLASSES, CARD_COMPONENT_CLASS, CARD_SELECTORS } from '../../imports/card/card-selectors';
import { CARD_DETAILS_PLACEHOLDERS, CARD_TYPES } from '../../imports/card/card-type';
import BinLookup from '../../shared/BinLookup';
import DomMethods from '../../shared/DomMethods';
import Formatter from '../../shared/Formatter';
import Utils from '../../shared/Utils';
import Translator from '../Translation';
import { ICardDetails } from './ICard';

/**
 * Represents html structure and basic behaviour of animated card.
 * It doesn't have validation, nor formatting which are stored in separate classes (Validation, Separate).
 * Extends Utils class which has bunch of common methods.
 */
class Card extends Utils {
  private static NOT_FLIPPED_CARDS: string[] = [CARD_TYPES.AMEX];
  private _binLookup: BinLookup;
  private _cardDetails: ICardDetails = {
    cardNumber: CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER,
    expirationDate: CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE,
    flippable: true,
    logo: '',
    securityCode: CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE,
    type: CARD_DETAILS_PLACEHOLDERS.TYPE
  };
  private readonly _cardNumberId: string;
  private readonly _expirationDateId: string;
  private readonly _securityCodeId: string;
  private _translator: Translator;
  private _formatter: Formatter;
  private readonly _locale: string;

  constructor(config: any) {
    super();
    const {
      fields: { inputs }
    } = config;
    this._cardNumberId = inputs.cardNumber;
    this._expirationDateId = inputs.expirationDate;
    this._securityCodeId = inputs.securityCode;
    this._locale = config.locale;
    this._binLookup = new BinLookup();
    this._translator = new Translator(this._locale);
    this._formatter = new Formatter(this._locale);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_LABEL, Translator.translations.LABEL_CARD_NUMBER);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_LABEL, Translator.translations.LABEL_EXPIRATION_DATE);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_LABEL, Translator.translations.LABEL_SECURITY_CODE);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_ID, this._cardDetails.cardNumber);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID, this._cardDetails.expirationDate);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_BACK_ID, this._cardDetails.securityCode);
  }

  /**
   * Method which is triggered on input event on card number field.
   * Input field on which it's triggered is specified by id given by merchant in configuration object.
   * @param cardNumber
   */
  public onCardNumberChanged(cardNumber: string) {
    const type = this._setCardNumberDetails(cardNumber);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_ID, this._cardDetails.cardNumber);
    type ? this._setTheme() : this._resetTheme();
    this._setSecurityCode();
  }

  /**
   * Method which is triggered on input event on expiration date field.
   * Input field on which it's triggered is specified by id given by merchant in configuration object.
   * @param expirationDate
   */
  public onExpirationDateChanged(expirationDate: string) {
    this._cardDetails.expirationDate = this._formatter.date(
      this.getContent(expirationDate, CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE),
      this._expirationDateId
    );
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID, this._cardDetails.expirationDate);
  }

  /**
   * Method which is triggered on input event on security code field.
   * Input field on which it's triggered is specified by id given by merchant in configuration object.
   * @param securityCode
   */
  public onSecurityCodeChanged(securityCode: string) {
    this._cardDetails.securityCode = this._formatter.code(securityCode, this._securityCodeId);
    this._setSecurityCode();
  }

  /**
   * Flips card on front or back, depends on current status.
   * Based on adding / removing classes on animated card element.
   */
  public flipCard() {
    const element = this.getElement(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR);
    if (this._isFlippableCard(this._cardDetails.type)) {
      element.classList.contains(CARD_CLASSES.CLASS_FOR_ANIMATION)
        ? element.classList.remove(CARD_CLASSES.CLASS_FOR_ANIMATION)
        : element.classList.add(CARD_CLASSES.CLASS_FOR_ANIMATION);
    } else {
      element.classList.remove(CARD_CLASSES.CLASS_FOR_ANIMATION);
    }
  }

  public getCardDetails = (value: string) => this._binLookup.binLookup(value);
  private _isAmex = (content: string): boolean => content === CARD_TYPES.AMEX;
  private _isFlippableCard = (type: string): boolean => !Card.NOT_FLIPPED_CARDS.includes(type);
  private _returnThemeClass = (theme: string): string => `${CARD_COMPONENT_CLASS}__${theme}`;

  /**
   * As it is written, it sets all details which depends on card number (type, flippable, lowercase of cardNumber).
   * Returns lowercase card number type (amex, mastercard, visa etc. or null if none specified)
   * @param cardNumber
   * @private
   */
  private _setCardNumberDetails(cardNumber: string): string | null {
    const type: string = this.toLower(this.getCardDetails(cardNumber).type);
    this._cardDetails.cardNumber = this._formatter.number(
      this.getContent(cardNumber, CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER),
      this._cardNumberId
    );
    this._cardDetails.type = type;
    this._cardDetails.flippable = this._isFlippableCard(type);
    return type;
  }

  /**
   * Hides security code field on front and adds security code value on back in specified field.
   * @private
   */
  private _addSecurityCodeOnBack() {
    DomMethods.addClass(
      this.getElement(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_ID),
      CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN
    );
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_BACK_ID, this._cardDetails.securityCode);
  }

  /**
   * Hides security code field on back and adds security code value on front in specified field.
   * @private
   */
  private _addSecurityCodeOnFront() {
    DomMethods.removeClass(
      this.getElement(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_ID),
      CARD_CLASSES.CLASS_SECURITY_CODE_HIDDEN
    );
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID, this._cardDetails.securityCode);
  }

  /**
   * Sets proper security code placeholder and security code value, depends on if card number is Amex or not
   * (generally if it's "flippable" or not). List of "non-flippable" cards is defined in this class
   * `${NOT_FLIPPED_CARDS}.
   * @private
   */
  private _setSecurityCode() {
    if (this._isAmex(this._cardDetails.type)) {
      this._setSecurityCodePlaceholder(CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED);
      this._addSecurityCodeOnFront();
    } else {
      this._setSecurityCodePlaceholder(CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE);
      this._addSecurityCodeOnBack();
    }
  }

  /**
   * Sets security code placeholder if security code is empty or / and card number
   * is indicated and card brand has changed.
   * @private
   */
  private _setSecurityCodePlaceholder(placeholder: string) {
    if (
      this._cardDetails.securityCode === '' ||
      this._cardDetails.securityCode === CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE ||
      this._cardDetails.securityCode === CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED
    ) {
      this._cardDetails.securityCode = placeholder;
    }
  }

  private _clearLogoClasses(toRemove: string, toAdd: string) {
    DomMethods.removeClass(this.getElement(CARD_CLASSES.CLASS_LOGO_WRAPPER), `${toRemove}`);
    DomMethods.addClass(this.getElement(CARD_CLASSES.CLASS_LOGO_WRAPPER), `${toAdd}`);
  }

  /**
   * Reverts cards theme to default one - when type is not specified.
   * Deletes and adds appropriate classes to go back to 'grey' card.
   * @private
   */
  private _clearThemeClasses() {
    this.setAttr(
      CARD_SELECTORS.ANIMATED_CARD_SIDE_FRONT,
      'class',
      `${CARD_CLASSES.CLASS_SIDE} ${CARD_CLASSES.CLASS_FRONT}`
    );
    this.setAttr(
      CARD_SELECTORS.ANIMATED_CARD_SIDE_BACK,
      'class',
      `${CARD_CLASSES.CLASS_SIDE} ${CARD_CLASSES.CLASS_BACK}`
    );
  }

  /**
   * Triggers methods which allows to go back to 'grey', default card view.
   * Clears theme classes, clears content of security code on back and removes logo.
   * @private
   */
  private _resetTheme() {
    this._clearLogoClasses(CARD_CLASSES.CLASS_LOGO, CARD_CLASSES.CLASS_LOGO_DEFAULT);
    this._clearThemeClasses();
    this.clearContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_BACK_ID);
    this._removeLogo();
  }

  /**
   * Sets appropriate theme depends on card type which is specified by card number.
   * Gets logo URI and adds this logo to prepared animated card.
   * @private
   */
  private _setTheme() {
    this._setThemeClasses();
    this._getLogoURI(this._cardDetails.type);
    this._addLogo();
  }

  /**
   * Sets appropriate theme classes and removes default view of card.
   * @private
   */
  private _setThemeClasses() {
    this._clearLogoClasses(CARD_CLASSES.CLASS_LOGO_DEFAULT, CARD_CLASSES.CLASS_LOGO);
    this._clearThemeClasses();
    DomMethods.addClass(
      this.getElement(CARD_SELECTORS.ANIMATED_CARD_SIDE_FRONT),
      this._returnThemeClass(this._cardDetails.type)
    );
    DomMethods.addClass(
      this.getElement(CARD_SELECTORS.ANIMATED_CARD_SIDE_BACK),
      this._returnThemeClass(this._cardDetails.type)
    );
  }

  /**
   * Adds prepared or creates logo and indicates into proper markup in HTML.
   * @private
   */
  private _addLogo(): string {
    const { logo, type } = this._cardDetails;
    const ifImageExists: boolean = !!document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID);
    if (ifImageExists && !!logo) {
      DomMethods.setProperty.apply(this, ['src', logo, CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID]);
    } else if (!ifImageExists && !!logo) {
      this._setLogo(logo, type);
    } else {
      return logo;
    }
  }

  /**
   * Creates logo element.
   * @param logo
   * @param type
   * @private
   */
  private _createLogo(logo: string, type: string) {
    return DomMethods.createHtmlElement.apply(this, [
      {
        alt: type,
        class: CARD_CLASSES.CLASS_LOGO_IMAGE,
        id: CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID,
        src: logo
      },
      'img'
    ]);
  }

  /**
   * Gets logo URI stored in card-logos.ts
   * @param type
   * @private
   */
  private _getLogoURI(type: string): string {
    this._cardDetails.logo = cardsLogos[type];
    return cardsLogos[type];
  }

  /**
   * Removes logo markup from animated card.
   * @private
   */
  private _removeLogo() {
    DomMethods.removeChildFromDOM.apply(this, [
      CARD_CLASSES.CLASS_LOGO_WRAPPER,
      CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID
    ]);
  }

  /**
   * Appends created logo markup into animated card and attach proper logo URI.
   * @param logo
   * @param type
   * @private
   */
  private _setLogo(logo: string, type: string) {
    DomMethods.appendChildIntoDOM(CARD_CLASSES.CLASS_LOGO_WRAPPER, this._createLogo(logo, type));
    DomMethods.setProperty.apply(this, ['src', logo, CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID]);
  }
}

export default Card;
