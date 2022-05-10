type StringToCountFormatter = (
  count: number,
  singleForm: string,
  coupleForm: string,
  multiForm: string,
) => string;
export const formatStringToCount: StringToCountFormatter = (
  count,
  singleForm,
  coupleForm,
  multiForm,
) => {
  if (count >= 10 && count <= 20) {
    return multiForm;
  }

  const rest = count % 10;
  if (rest === 1) return singleForm;
  if (rest >= 2 && rest <= 4) return coupleForm;
  return multiForm;
}

type GetOnlyNumeric = (s: string) => string; 
export const getOnlyNumeric: GetOnlyNumeric = s => {
  if (s.length === 0) return '';

  return s.replace(/[^0-9]/g, '');
}

type GetOnlyNumericAndDot = (s: string) => string;
export const getOnlyNumericAndDot: GetOnlyNumericAndDot = s => {
  if (s.length === 0) return '';

  return s.replace(/[^0-9.]/g, '');
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;
type EmailValidator = (email: string) => boolean;
export const isValidEmail: EmailValidator = email => EMAIL_REGEX.test(email)

type PriceFormatter = (price: number) => string;
export const formatPrice: PriceFormatter = price => {
  const rounded = Math.round(price);
  let priceStr = '' + rounded;
  for (let i = priceStr.length - 3; i >= 0; i -= 3) {
    priceStr = priceStr.substring(0, i) + ' ' + priceStr.substring(i);
  }
  return priceStr;
};
