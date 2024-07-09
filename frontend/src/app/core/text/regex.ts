
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

export const isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export enum ValidationType {
  REQUIRED,
  EMAIL,
  PHONE_NUMBER,
  EQUAL,
  TRUE,
}

interface ValidationTypeEqualProps {
  equal: string;
}

type ValidatorTypes = ValidationTypeEqualProps;

export type Validator = ValidatorInterface<ValidatorTypes>;

export interface ValidatorInterface<ValidatorTypes> {
  validatorType?: ValidationType;
  message?: string;
  props?: ValidatorTypes;
}

export interface ValidationResponse {
  valid: boolean;
  errors: Validator;
}

export const extractParamsUrl = (url: string) => {
  url = url.replace("?", "");
  const urls = url.split("&");
  let result = {};

  urls.forEach(function (el) {
    var param = el.split("=");
    result[param[0]] = param[1];
  });

  return result;
};

export const validateFormData = (
  value: any,
  validators: Validator,
  regionCode?: string
): ValidationResponse => {
  const response: ValidationResponse = {
    valid: true,
    errors: null,
  };

  switch (validators.validatorType) {
    case ValidationType.REQUIRED:
      if (value === undefined || value === null || value.trim() === "") {
        response.errors = validators;
      }
      break;
    case ValidationType.EMAIL:
      if (
        !String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        response.errors = validators;
      }
      break;
    case ValidationType.PHONE_NUMBER:

      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const number = phoneUtil.parse(value, regionCode);
        const formatted = phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
        if (phoneUtil.isValidNumber(number)) console.log("Phone number: ", formatted);
        else { response.errors = validators; }
        console.log("regionCode: ", regionCode);

      } catch (err) {
        console.error("Erreur lors de l'initialisation de l'objet PhoneNumberUtil", err);
        response.errors = validators;
      }

      break;
    case ValidationType.EQUAL:
      const equal: string | undefined = (
        validators.props as ValidationTypeEqualProps
      ).equal;

      if (equal && value !== equal) {
        response.errors = validators;
      }

      break;
    case ValidationType.TRUE:
      if (value as boolean) {
        response.errors = validators;
      }

      break;
  }

  if (response.errors !== null) response.valid = false;

  return response;
};
