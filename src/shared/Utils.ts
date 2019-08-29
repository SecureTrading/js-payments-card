import { CARD_SELECTORS } from '../imports/card/card-selectors';
import Translator from '../models/Translation/Translation';

export default class Utils {
  public static ifCardWrapperExist() {
    return document.getElementById(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR) as HTMLInputElement;
  }

  public static inArray<T>(array: ArrayLike<T>, item: T) {
    return Array.from(array).indexOf(item) >= 0;
  }

  public static getLastElementOfArray = (array: number[]) => array && array.slice(-1).pop();

  public static setElementAttributes(attributes: any, element: HTMLInputElement) {
    for (const attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        const value = attributes[attribute];
        if (Utils.inArray(['value'], attribute)) {
          // @ts-ignore
          element[attribute] = value;
        } else if (value === false) {
          element.removeAttribute(attribute);
        } else {
          element.setAttribute(attribute, value);
        }
      }
    }
  }

  /**
   * Clear whitespaces in expression.
   * @param string
   * @param regex
   */
  public static stripChars(string: string, regex: any) {
    if (typeof regex === 'undefined') {
      regex = /[\D+]/g;
    }
    return string.replace(regex, '');
  }

  public static forEachBreak<inputType, returnType>(
    iterable: ArrayLike<inputType>,
    callback: (item: inputType) => returnType
  ): returnType {
    let result: returnType = null;
    // tslint:disable-next-line:forin
    for (const i in iterable) {
      result = callback(iterable[i]);
      if (result) {
        break;
      }
    }
    return result || null;
  }

  protected translator: Translator;

  constructor() {
    this.translator = new Translator('en_GB');
  }

  protected getElement = (id: string): HTMLInputElement => document.getElementById(id) as HTMLInputElement;
  protected getContent = (value: string, placeholder: string) => (value ? value : placeholder);
  protected setContent = (id: string, text: string) =>
    (this.getElement(id).textContent = this.translator.translate(text));
  protected setAttr = (id: string, attr: string, value: string) => this.getElement(id).setAttribute(attr, value);
  protected toLower = (content: string | null) => (content ? content.toLowerCase() : content);
  protected clearContent = (id: string) => this.setContent(id, '');
}
