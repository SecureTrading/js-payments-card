import Translator from '../models/Translation';

/**
 * Bunch of functions for manipulating data.
 */
class Utils {
  /**
   * Checks if given element exists in DOM.
   * @param id
   */
  public static ifElementExists(id: string) {
    return document.getElementById(id) as HTMLInputElement;
  }

  /**
   * ES5 replacement for includes()
   * @param array
   * @param item
   */
  public static inArray<T>(array: ArrayLike<T>, item: T) {
    return Array.from(array).indexOf(item) >= 0;
  }

  /**
   * Returns last element of array.
   * @param array
   */
  public static getLastElementOfArray = (array: number[]): number => array && array.slice(-1).pop();

  /**
   * Sets attributes for DOM element given in parameter.
   * @param attributes
   * @param element
   */
  public static setElementAttributes(attributes: any, element: HTMLInputElement) {
    for (const attribute in attributes) {
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

  /**
   * Clear whitespaces in expression.
   * @param string
   * @param regex
   */
  public static stripChars(string: string, regex?: any) {
    let expression: any;
    if (typeof regex === 'undefined') {
      expression = /[\D+]/g;
    } else {
      expression = regex;
    }
    return string.replace(expression, '');
  }

  /**
   * Function for seeking through supported brands.
   * @param iterable
   * @param callback
   */
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

export default Utils;
