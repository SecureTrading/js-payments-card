import { cardsLogos } from '../../imports/card/card-logos';
import { CARD_CLASSES, CARD_COMPONENT_CLASS, CARD_SELECTORS } from '../../imports/card/card-selectors';
import { CARD_DETAILS_PLACEHOLDERS, CARD_TYPES } from '../../imports/card/card-type';
import BinLookup from '../../shared/BinLookup';
import DomMethods from '../../shared/DomMethods';
import Formatter from '../../shared/Formatter';
import Utils from '../../shared/Utils';
import { IConfig, IFields } from '../STCard/ISTCard';
import Translator from '../Translation';
import { ICardDetails } from './ICard';

/**
 * Represents html structure and basic behaviour of animated card.
 * It doesn't have validation, nor formatting which are stored in separate classes (Validation, Separate).
 * Extends Utils class which has bunch of common methods.
 */
class Card extends Utils {
  private static DEFAULT_LANGUAGE: string = 'en_GB';
  private static DISABLED_ATTRIBUTE: string = 'disabled';
  private static ERROR_CLASS: string = 'error';
  private static NOT_FLIPPED_CARDS: string[] = [CARD_TYPES.AMEX, CARD_TYPES.PIBA];

  private static _clearInputValue(id: string) {
    (document.getElementById(id) as HTMLInputElement).value = '';
  }

  /**
   * Clears validation message and error classes (input field, error message).
   * @private
   */
  private static _clearFieldValidationData(inputId: string, messageId: string) {
    document.getElementById(inputId).classList.remove(Card.ERROR_CLASS);
    document.getElementById(messageId).textContent = '';
  }

  /**
   * Set disable attribute to given input.
   * @param inputId
   * @private
   */
  private static _disableInput(inputId: string) {
    DomMethods.setProperty(Card.DISABLED_ATTRIBUTE, Card.DISABLED_ATTRIBUTE, inputId);
  }

  /**
   * Remove disable attribute to given input.
   * @param inputId
   * @private
   */
  private static _enableInput(inputId: string) {
    document.getElementById(inputId).removeAttribute(Card.DISABLED_ATTRIBUTE);
  }

  private _animatedCardContainer: HTMLInputElement;
  private _binLookup: BinLookup;
  private _cardDetails: ICardDetails = {
    cardNumber: CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER,
    expirationDate: CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE,
    flippable: true,
    logo: '',
    securityCode: CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE,
    type: CARD_DETAILS_PLACEHOLDERS.TYPE
  };
  private _cardNumberId: string;
  private _expirationDateId: string;
  private _securityCodeId: string;
  private _securityCodeMessageId: string;
  private _translator: Translator;
  private _formatter: Formatter;
  private _locale: string;

  constructor(config: IConfig) {
    super();
    const { fields } = config;
    this._init(fields, config);
  }

  /**
   * Method which is triggered on input event on card number field.
   * Input field on which it's triggered is specified by id given by merchant in configuration object.
   * @param cardNumber
   * @param outsideValue
   */
  public onCardNumberChanged(cardNumber: string, outsideValue?: boolean) {
    const { type, nonformat } = this._setCardNumberDetails(cardNumber);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_ID, this._cardDetails.cardNumber);
    type ? this._setTheme() : this._resetTheme();
    this._setSecurityCode(outsideValue);
    return { nonformat };
  }

  /**
   * Method which is triggered on input event on expiration date field.
   * Input field on which it's triggered is specified by id given by merchant in configuration object.
   * @param expirationDate
   * @param outsideValue
   */
  public onExpirationDateChanged(expirationDate: string, outsideValue?: boolean) {
    this._cardDetails.expirationDate = this._formatter.date(
      this.getContent(expirationDate, CARD_DETAILS_PLACEHOLDERS.EXPIRATION_DATE),
      this._expirationDateId,
      outsideValue
    );
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID, this._cardDetails.expirationDate);
  }

  /**
   * Method which is triggered on input event on security code field.
   * Input field on which it's triggered is specified by id given by merchant in configuration object.
   * @param securityCode
   * @param outsideValue
   */
  public onSecurityCodeChanged(securityCode: string, outsideValue?: boolean) {
    this._cardDetails.securityCode = this._formatter.code(securityCode, this._securityCodeId, outsideValue);
    this._setSecurityCode(outsideValue);
  }

  public onFieldFocusOrBlur(focused: boolean) {
    if (this._isFlippableCard(this._cardDetails.type) && this._animatedCardContainer) {
      if (focused) {
        this._animatedCardContainer.classList.add(CARD_CLASSES.CLASS_FOR_ANIMATION);
      } else {
        this._animatedCardContainer.classList.remove(CARD_CLASSES.CLASS_FOR_ANIMATION);
      }
    }
  }

  /**
   * Flips card on front or back, depends on current status.
   * Based on adding / removing classes on animated card element.
   */
  public flipCard() {
    if (this._isFlippableCard(this._cardDetails.type)) {
      this._animatedCardContainer.classList.contains(CARD_CLASSES.CLASS_FOR_ANIMATION)
        ? this._animatedCardContainer.classList.remove(CARD_CLASSES.CLASS_FOR_ANIMATION)
        : this._animatedCardContainer.classList.add(CARD_CLASSES.CLASS_FOR_ANIMATION);
    } else {
      this._animatedCardContainer.classList.remove(CARD_CLASSES.CLASS_FOR_ANIMATION);
    }
  }

  public getCardDetails = (value: string) => this._binLookup.binLookup(value);
  private _isAmex = (content: string): boolean => content === CARD_TYPES.AMEX;
  private _isPiba = (content: string): boolean => content === CARD_TYPES.PIBA;
  private _isFlippableCard = (type: string): boolean => !Card.NOT_FLIPPED_CARDS.includes(type);
  private _returnThemeClass = (theme: string): string => `${CARD_COMPONENT_CLASS}__${theme}`;

  private _init(fields: IFields, config: IConfig) {
    this._locale = config.locale ? config.locale : Card.DEFAULT_LANGUAGE;
    this._binLookup = new BinLookup();
    this._translator = new Translator(this._locale);
    this._formatter = new Formatter(this._locale);
    this._setInputsAndErrors(fields);
    this._setCardContent();
    this._animatedCardContainer = this.getElement(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR);
  }

  private _setInputsAndErrors(fields: IFields) {
    if (fields) {
      if (fields.inputs && fields.errors) {
        this._cardNumberId = fields.inputs.cardNumber;
        this._expirationDateId = fields.inputs.expirationDate;
        this._securityCodeId = fields.inputs.securityCode;
        this._securityCodeMessageId = fields.errors.securityCode;
      }
    }
  }

  private _setCardContent() {
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_LABEL, Translator.translations.LABEL_CARD_NUMBER);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_LABEL, Translator.translations.LABEL_EXPIRATION_DATE);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_LABEL, Translator.translations.LABEL_SECURITY_CODE);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_CREDIT_CARD_ID, this._cardDetails.cardNumber);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_EXPIRATION_DATE_ID, this._cardDetails.expirationDate);
    this.setContent(CARD_SELECTORS.ANIMATED_CARD_SECURITY_CODE_BACK_ID, this._cardDetails.securityCode);
  }

  /**
   * As it is written, it sets all details which depends on card number (type, flippable, lowercase of cardNumber).
   * Returns lowercase card number type (amex, mastercard, visa etc. or null if none specified)
   * @param cardNumber
   * @private
   */
  private _setCardNumberDetails(cardNumber: string): { type: string; nonformat: string } | null {
    const { value, nonformat } = this._formatter.number(
      this.getContent(cardNumber, CARD_DETAILS_PLACEHOLDERS.CARD_NUMBER),
      this._cardNumberId
    );
    const type: string = this.toLower(this.getCardDetails(nonformat).type);
    this._cardDetails.cardNumber = value;
    this._cardDetails.type = type;
    this._cardDetails.flippable = this._isFlippableCard(type);
    return { type, nonformat };
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
   * Sets proper security code placeholder and security code value, depends on if card number is AMEX or not
   * (generally if it's "flippable" or not). List of "non-flippable" cards is defined in this class
   * `${NOT_FLIPPED_CARDS}.
   * @private
   */
  private _setSecurityCode(outsideValue: boolean) {
    if (!outsideValue) {
      Card._enableInput(this._securityCodeId);
    }
    if (this._isAmex(this._cardDetails.type)) {
      this._setSecurityCodePlaceholder(CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE_EXTENDED);
      this._addSecurityCodeOnFront();
    } else if (this._isPiba(this._cardDetails.type) && !outsideValue) {
      Card._clearInputValue(this._securityCodeId);
      this._clearSecurityCodeValue();
      Card._clearFieldValidationData(this._securityCodeId, this._securityCodeMessageId);
      Card._disableInput(this._securityCodeId);
      this._setSecurityCodePlaceholder(CARD_DETAILS_PLACEHOLDERS.SECURITY_CODE);
      this._addSecurityCodeOnBack();
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

  /**
   * Toggles between dedicated logo class (eg. Visa or MasterCard) to default one or inversely.
   * @param toRemove
   * @param toAdd
   * @private
   */
  private _toggleLogoClasses(toRemove: string, toAdd: string) {
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
    this._toggleLogoClasses(CARD_CLASSES.CLASS_LOGO, CARD_CLASSES.CLASS_LOGO_DEFAULT);
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
    this._toggleLogoClasses(CARD_CLASSES.CLASS_LOGO_DEFAULT, CARD_CLASSES.CLASS_LOGO);
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
      DomMethods.setProperty.apply(this, ['alt', type, CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID]);
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
    if (document.getElementById(CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID)) {
      DomMethods.removeChildFromDOM.apply(this, [
        CARD_CLASSES.CLASS_LOGO_WRAPPER,
        CARD_SELECTORS.ANIMATED_CARD_PAYMENT_LOGO_ID
      ]);
    }
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

  private _clearSecurityCodeValue() {
    this._cardDetails.securityCode = '';
  }
}

export default Card;
