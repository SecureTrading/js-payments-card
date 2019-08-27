import Selectors, {CARD_SELECTORS} from "../imports/card/card-selectors";
import Translator from "../models/Translation/Translation";

/**
 * Utils method class
 */
export default class Utils {

  protected translator: Translator;

  constructor() {
    this.translator = new Translator('en_GB');
  }

  public static ifCardWrapperExist() {
    return document.getElementById(CARD_SELECTORS.ANIMATED_CARD_INPUT_SELECTOR) as HTMLInputElement;
  }

  /**
   * Test if item is in array
   * @param array An array of items
   * @param item the item to test for
   * @return boolean Whether the item is i the array
   */
  public static inArray<T>(array: ArrayLike<T>, item: T) {
    return Array.from(array).indexOf(item) >= 0;
  }

  /**
   * This is a custom implementation of Array.some which returns the first truthy response rather than boolean
   * @param iterable The iterable to iterate over
   * @param callback A callback function to find the result
   * @return returnType The first non-falsy return value of the callback function or null
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

  /**
   * Helper function to return a Promise<never> which rejects after a specified time
   * @param timeout The time until the promise rejects
   * @param err The error with which to reject
   * @return The rejecting Promise
   */
  public static timeoutPromise(timeout: number, err = new Error()): Promise<never> {
    return new Promise((_, reject) => setTimeout(() => reject(err), timeout));
  }

  /**
   * Helper function to time out waiting for a promise to resolve
   * @param promissory The callback which generates the wanted promise
   * @param timeout The time until the promise is rejected instead - WARNING this will not cancel a fetch request
   * @param err The error with which to reject
   * @return The timeout or the wanted promise
   */
  public static promiseWithTimeout<T>(promissory: () => Promise<T>, timeout = 10, err = new Error()): Promise<T> {
    return Promise.race([promissory(), Utils.timeoutPromise(timeout, err)]);
  }

  /**
   * Helper function to retry a rejected promise
   * @param promissory The callback which generates the wanted promise
   * @param delay The ammount of time to separate retries by
   * @param retries The maximum number of retries to attempt
   * @param retryTimeout The maximum time to spend retrying connections
   * @param err The error with which to reject
   * @return A much more likely to be resolved promise
   */
  public static retryPromise<T>(promissory: () => Promise<T>, delay = 0, retries = 5, retryTimeout = 100): Promise<T> {
    return new Promise((resolve, reject) => {
      const endtime = Date.now() + retryTimeout;
      let error: Error;

      function attempt() {
        if (retries > 0 && Date.now() < endtime) {
          promissory()
            .then(resolve)
            .catch(e => {
              retries--;
              error = e;
              setTimeout(() => attempt(), delay);
            });
        } else {
          reject(error);
        }
      }

      attempt();
    });
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


  protected static getLastElementOfArray = (array: number[]) => array && array.slice(-1).pop();

  protected getElement = (id: string): HTMLInputElement => document.getElementById(id) as HTMLInputElement;

  protected getContent = (value: string, placeholder: string) => (value ? value : placeholder);

  protected setAttr = (id: string, attr: string, value: string) => this.getElement(id).setAttribute(attr, value);

  // @ts-ignore
  protected setContent = (id: string, text: string) => this.getElement(id).textContent = this.translator.translate(text);

  protected toLower = (content: string | null) => content ? content.toLowerCase() : content;

}
