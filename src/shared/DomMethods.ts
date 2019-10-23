/**
 * Helper methods, mostly in manipulating DOM.
 */
class DomMethods {
  /**
   * Adds class to inputs classList.
   * @param element
   * @param classToAdd
   */
  public static addClass = (element: HTMLElement, classToAdd: string) => element.classList.add(classToAdd);

  /**
   * Appends HTML element into DOM.
   * @param target
   * @param child
   */
  public static appendChildIntoDOM(target: string, child: HTMLElement) {
    const element = document.getElementById(target)
      ? document.getElementById(target)
      : document.getElementsByTagName('body')[0];
    element.appendChild(child);
    return element;
  }

  /**
   * Creates and returns html element.
   * @param attributes
   * @param markup
   */
  public static createHtmlElement = (attributes: any, markup: string) => {
    const element = document.createElement(markup);
    // @ts-ignore
    Object.keys(attributes).map(item => element.setAttribute(item, attributes[item]));
    return element;
  };

  /**
   * Removes class to inputs classList.
   * @param element
   * @param classToRemove
   */
  public static removeClass = (element: HTMLElement, classToRemove: string) => element.classList.remove(classToRemove);

  /**
   * Removes child from DOM.
   * @param parentId
   * @param childId
   */
  public static removeChildFromDOM(parentId: string, childId: string) {
    const parent = document.getElementById(parentId);
    const child = document.getElementById(childId);
    if (parent && child) {
      parent.removeChild(child);
    } else {
      throw new Error('Parent or child element is not specified ');
    }
    return parent;
  }

  /**
   * Sets defined property in DOM
   * @param attr
   * @param value
   * @param elementId
   */
  public static setProperty(attr: string, value: string, elementId: string) {
    const element = document.getElementById(elementId);
    element.setAttribute(attr, value);
    return element;
  }
}

export default DomMethods;
