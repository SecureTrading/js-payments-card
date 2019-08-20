import i18next from 'i18next';
// TypeScript has been set to import json it just warns about it in here
// @ts-ignore
import cy_GB from '../../imports/translations/cy_GB.json';
// @ts-ignore
import da_DK from '../../imports/translations/da_DK.json';
// @ts-ignore
import de_DE from '../../imports/translations/de_DE.json';
// @ts-ignore
import en_GB from '../../imports/translations/en_GB.json';
// @ts-ignore
import en_US from '../../imports/translations/en_US.json';
// @ts-ignore
import es_ES from '../../imports/translations/es_ES.json';
// @ts-ignore
import fr_FR from '../../imports/translations/fr_FR.json';
// @ts-ignore
import nl_NL from '../../imports/translations/nl_NL.json';
// @ts-ignore
import no_NO from '../../imports/translations/no_NO.json';
// @ts-ignore
import sv_SE from '../../imports/translations/sv_SE.json';

// TODO docstring - class to act as adapter in case we ever change out the translator mechanism
class Translator {
  private static _translations = {
    APPLE_PAY_AMOUNT_AND_CURRENCY: 'Amount and currency are not set',
    COMMUNICATION_ERROR_INVALID_REQUEST: 'Invalid request',
    COMMUNICATION_ERROR_INVALID_RESPONSE: 'Invalid response',
    COMMUNICATION_ERROR_TIMEOUT: 'Timeout',
    FORM_IS_NOT_VALID: 'Form is not valid',
    LABEL_CARD_NUMBER: 'Card number',
    LABEL_EXPIRATION_DATE: 'Expiration date',
    LABEL_SECURITY_CODE: 'Security code',
    MERCHANT_VALIDATION_FAILURE: 'Merchant validation failure',
    NOT_IMPLEMENTED_ERROR: 'Method not implemented',
    PAY: 'Pay',
    PAYMENT_CANCELLED: 'Payment has been cancelled',
    PAYMENT_ERROR: 'An error occurred',
    PAYMENT_SUCCESS: 'Payment has been successfully processed',
    PROCESSING: 'Processing',
    VALIDATION_ERROR: 'Invalid field',
    VALIDATION_ERROR_FIELD_IS_REQUIRED: 'Field is required',
    VALIDATION_ERROR_PATTERN_MISMATCH: 'Value mismatch pattern',
    VALIDATION_ERROR_VALUE_TOO_SHORT: 'Value is too short'
  };
  public static get translations(): {
    APPLE_PAY_AMOUNT_AND_CURRENCY: string;
    COMMUNICATION_ERROR_INVALID_REQUEST: string;
    COMMUNICATION_ERROR_INVALID_RESPONSE: string;
    COMMUNICATION_ERROR_TIMEOUT: string;
    FORM_IS_NOT_VALID: string;
    LABEL_CARD_NUMBER: string;
    LABEL_EXPIRATION_DATE: string;
    LABEL_SECURITY_CODE: string;
    MERCHANT_VALIDATION_FAILURE: string;
    NOT_IMPLEMENTED_ERROR: string;
    PAY: string;
    PAYMENT_CANCELLED: string;
    PAYMENT_ERROR: string;
    PAYMENT_SUCCESS: string;
    PROCESSING: string;
    VALIDATION_ERROR: string;
    VALIDATION_ERROR_FIELD_IS_REQUIRED: string;
    VALIDATION_ERROR_PATTERN_MISMATCH: string;
    VALIDATION_ERROR_VALUE_TOO_SHORT: string;
  } {
    return this._translations;
  }

  constructor(locale: string) {
    i18next.init({
      debug: false,
      lng: locale,
      resources: {
        cy_GB: {translation: cy_GB},
        da_DK: {translation: da_DK},
        de_DE: {translation: de_DE},
        en_GB: {translation: en_GB},
        en_US: {translation: en_US},
        es_ES: {translation: es_ES},
        fr_FR: {translation: fr_FR},
        nl_NL: {translation: nl_NL},
        no_NO: {translation: no_NO},
        sv_SE: {translation: sv_SE}
      }
    });
  }

  public translate = (text: string) => i18next.t(text);
}

export default Translator;
