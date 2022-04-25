import { replace } from 'lodash';
import numeral from 'numeral';
import 'numeral/locales';

const currencyToLocale = {
  AED: { locale: 'ar-AE' },
  BGN: { locale: 'bg' },
  CHF: { locale: 'de-CH' },
  CZK: { locale: 'cs' },
  DKK: { locale: 'da-DK' },
  EUR: { locale: 'de' },
  GBP: { locale: 'en-GB' },
  HRK: { locale: 'hr-HR' },
  HUF: { locale: 'hu' },
  ISK: { locale: 'is-IS' },
  NGN: { locale: 'en-NG' },
  NOK: { locale: 'nb-NO' },
  PLN: { locale: 'pl' },
  RON: { locale: 'ro-RO' },
  SEK: { locale: 'sv-SE' },
  USD: { locale: null }
};

// ----------------------------------------------------------------------

const setLocalFromCurrency = (currencyCode) => {
  currencyCode = currencyCode || 'GBP';
  const currency = currencyToLocale[currencyCode];
  if (!currency.locale) numeral.reset();
  else numeral.locale(currency.locale);
};

export function fCurrency(number, currencyCode) {
  setLocalFromCurrency(currencyCode);
  return numeral(number).format('$0,0.00');
}

export function fCurrencyFromLong(number, currencyCode) {
  setLocalFromCurrency(currencyCode);
  return numeral(number / 100).format('$0,0.00');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.00%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
