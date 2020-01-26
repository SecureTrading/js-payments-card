const CARD_TYPES = {
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

const CARD_DETAILS_PLACEHOLDERS = {
  CARD_NUMBER: '\u2219\u2219\u2219\u2219 \u2219\u2219\u2219\u2219 \u2219\u2219\u2219\u2219 \u2219\u2219\u2219\u2219',
  EXPIRATION_DATE: 'MM/YY',
  SECURITY_CODE: '\u2219\u2219\u2219',
  SECURITY_CODE_EXTENDED: '\u2219\u2219\u2219\u2219',
  TYPE: 'default'
};

export { CARD_TYPES, CARD_DETAILS_PLACEHOLDERS };
