export interface Currency {
  code:   string
  symbol: string
  name:   string
  rate:   number  // relative to USD
  locale: string
}

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$',   name: 'US Dollar',          rate: 1,     locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€',   name: 'Euro',               rate: 0.92,  locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£',   name: 'British Pound',      rate: 0.79,  locale: 'en-GB' },
  AUD: { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar',  rate: 1.53,  locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$',  name: 'Canadian Dollar',    rate: 1.36,  locale: 'en-CA' },
  INR: { code: 'INR', symbol: '₹',   name: 'Indian Rupee',       rate: 83.5,  locale: 'en-IN' },
  SGD: { code: 'SGD', symbol: 'S$',  name: 'Singapore Dollar',   rate: 1.35,  locale: 'en-SG' },
  MYR: { code: 'MYR', symbol: 'RM',  name: 'Malaysian Ringgit',  rate: 4.72,  locale: 'ms-MY' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham',         rate: 3.67,  locale: 'ar-AE' },
  ZAR: { code: 'ZAR', symbol: 'R',   name: 'South African Rand', rate: 18.6,  locale: 'en-ZA' },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 1.63,  locale: 'en-NZ' },
}

export function formatPrice(usdPrice: number, currencyCode: string): string {
  const cur = CURRENCIES[currencyCode] ?? CURRENCIES.USD
  const converted = usdPrice * cur.rate
  try {
    return new Intl.NumberFormat(cur.locale, {
      style:                 'currency',
      currency:              cur.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted)
  } catch {
    return `${cur.symbol}${converted.toFixed(2)}`
  }
}

// Suggest a currency based on the checkout country
export const COUNTRY_CURRENCY: Record<string, string> = {
  'United States':   'USD',
  'United Kingdom':  'GBP',
  'Australia':       'AUD',
  'New Zealand':     'NZD',
  'Canada':          'CAD',
  'Germany':         'EUR',
  'France':          'EUR',
  'Netherlands':     'EUR',
  'Sweden':          'EUR',
  'Norway':          'EUR',
  'Denmark':         'EUR',
  'Ireland':         'EUR',
  'Singapore':       'SGD',
  'Malaysia':        'MYR',
  'India':           'INR',
  'South Africa':    'ZAR',
  'Philippines':     'USD',
  'Indonesia':       'USD',
  'Thailand':        'USD',
  'Vietnam':         'USD',
  'Other':           'USD',
}
