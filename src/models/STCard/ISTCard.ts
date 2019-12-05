interface IErrorContainers {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

interface IInputContainers {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
}

interface IFields {
  inputs: IInputContainers;
  errors: IErrorContainers;
}

interface IConfig {
  animatedCardContainer: string;
  fields: IFields;
  locale: string;
}

export { IConfig, IErrorContainers, IFields, IInputContainers };
