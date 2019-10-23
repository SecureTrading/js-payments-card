const COMMON_FIELDS_PROPERTIES = {
  ariaInvalid: 'false',
  ariaRequired: 'true',
  autocorrect: 'off',
  required: 'required',
  spellcheck: 'false'
};
const CARD_NUMBER_PROPERTIES = {
  ...COMMON_FIELDS_PROPERTIES,
  ariaLabel: 'Expiration date',
  ariaPlaceholder: 'MM / YY',
  inputmode: 'numeric',
  placeholder: 'XXXX XXXX XXXX XXXX'
};

const EXPIRATION_DATE_PROPERTIES = {
  ...COMMON_FIELDS_PROPERTIES,
  ariaLabel: 'Expiration date',
  ariaPlaceholder: 'MM / YY',
  inputmode: 'numeric',
  pattern: '^(0[1-9]|1[0-2])/([0-9]{2})$',
  placeholder: 'MM / YY'
};

const SECURITY_CODE_PROPERTIES = {
  ...COMMON_FIELDS_PROPERTIES,
  ariaLabel: 'Security code',
  ariaPlaceholder: 'XXX',
  inputmode: 'numeric',
  pattern: '^[0-9]{3}$',
  placeholder: 'XXX'
};

export { CARD_NUMBER_PROPERTIES, EXPIRATION_DATE_PROPERTIES, SECURITY_CODE_PROPERTIES };
