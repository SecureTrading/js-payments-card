const CARD_COMPONENT_CLASS = 'st-animated-card';
const CARD_SELECTOR_PREFIX = 'st-animated-card';

const CARD_CLASSES = {
  CLASS_BACK: `${CARD_COMPONENT_CLASS}__back`,
  CLASS_FOR_ANIMATION: `${CARD_COMPONENT_CLASS}__flip-card`,
  CLASS_FRONT: `${CARD_COMPONENT_CLASS}__front`,
  CLASS_LOGO: `${CARD_COMPONENT_CLASS}__payment-logo`,
  CLASS_LOGO_DEFAULT: `${CARD_COMPONENT_CLASS}__payment-logo--default`,
  CLASS_LOGO_IMAGE: `${CARD_COMPONENT_CLASS}__payment-logo-img`,
  CLASS_LOGO_WRAPPER: `${CARD_COMPONENT_CLASS}-payment-logo`,
  CLASS_SECURITY_CODE_HIDDEN: `${CARD_COMPONENT_CLASS}__security-code--front-hidden`,
  CLASS_SIDE: `${CARD_COMPONENT_CLASS}__side`
};

const CARD_SELECTORS = {
  ANIMATED_CARD_COMPONENT_FRAME: `${CARD_SELECTOR_PREFIX}-iframe`,
  ANIMATED_CARD_COMPONENT_NAME: `animatedCard`,
  ANIMATED_CARD_CREDIT_CARD_ID: `${CARD_SELECTOR_PREFIX}-number`,
  ANIMATED_CARD_CREDIT_CARD_LABEL: `${CARD_SELECTOR_PREFIX}-card-number-label`,
  ANIMATED_CARD_EXPIRATION_DATE_ID: `${CARD_SELECTOR_PREFIX}-expiration-date`,
  ANIMATED_CARD_EXPIRATION_DATE_LABEL: `${CARD_SELECTOR_PREFIX}-expiration-date-label`,
  ANIMATED_CARD_INPUT_SELECTOR: `${CARD_SELECTOR_PREFIX}`,
  ANIMATED_CARD_PAYMENT_LOGO_ID: `st-payment-logo`,
  ANIMATED_CARD_SECURITY_CODE_FRONT_FIELD_ID: `${CARD_SELECTOR_PREFIX}-security-code-front-field`,
  ANIMATED_CARD_SECURITY_CODE_FRONT_ID: `${CARD_SELECTOR_PREFIX}-security-code-front`,
  ANIMATED_CARD_SECURITY_CODE_BACK_ID: `${CARD_SELECTOR_PREFIX}-security-code`,
  ANIMATED_CARD_SECURITY_CODE_LABEL: `${CARD_SELECTOR_PREFIX}-security-code-label`,
  ANIMATED_CARD_SIDE_BACK: `${CARD_SELECTOR_PREFIX}-side-back`,
  ANIMATED_CARD_SIDE_FRONT: `${CARD_SELECTOR_PREFIX}-side-front`,
};

export {CARD_CLASSES, CARD_COMPONENT_CLASS, CARD_SELECTORS, CARD_SELECTOR_PREFIX};
