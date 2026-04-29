// Size guide data based on WHO Child Growth Standards (50th percentile)
// with regional/ethnic adjustments from published paediatric literature.

export const ETHNICITIES = [
  { value: 'european',      label: 'European / Caucasian' },
  { value: 'african',       label: 'African / Black' },
  { value: 'east_asian',    label: 'East Asian (Chinese, Japanese, Korean)' },
  { value: 'southeast_asian', label: 'Southeast Asian (Filipino, Vietnamese, Thai, Indonesian)' },
  { value: 'south_asian',   label: 'South Asian (Indian, Pakistani, Sri Lankan)' },
  { value: 'hispanic',      label: 'Hispanic / Latino' },
  { value: 'middle_eastern', label: 'Middle Eastern / Arab' },
  { value: 'mixed',         label: 'Mixed / Other' },
]

export const AGE_OPTIONS = [
  { value: 0,  label: 'Newborn (0 months)' },
  { value: 1,  label: '1 month' },
  { value: 2,  label: '2 months' },
  { value: 3,  label: '3 months' },
  { value: 4,  label: '4 months' },
  { value: 5,  label: '5 months' },
  { value: 6,  label: '6 months' },
  { value: 9,  label: '9 months' },
  { value: 12, label: '12 months (1 year)' },
  { value: 18, label: '18 months' },
  { value: 24, label: '24 months (2 years)' },
  { value: 30, label: '30 months' },
  { value: 36, label: '36 months (3 years)' },
]

// WHO 50th percentile height (cm) — averaged across boys & girls
const WHO_HEIGHT: Record<number, number> = {
  0: 49.0,
  1: 53.7,
  2: 57.1,
  3: 59.8,
  4: 62.0,
  5: 64.0,
  6: 65.7,
  9: 70.1,
  12: 74.0,
  18: 80.7,
  24: 86.4,
  30: 91.2,
  36: 95.1,
}

// WHO 50th percentile weight (kg)
const WHO_WEIGHT: Record<number, number> = {
  0: 3.4,
  1: 4.5,
  2: 5.6,
  3: 6.4,
  4: 7.0,
  5: 7.5,
  6: 7.9,
  9: 8.9,
  12: 9.6,
  18: 11.0,
  24: 12.2,
  30: 13.5,
  36: 14.5,
}

// Height adjustments (cm) relative to WHO median, based on published studies
const ETHNIC_HEIGHT_ADJ: Record<string, number> = {
  european:       0.5,
  african:        2.0,
  east_asian:    -1.0,
  southeast_asian: -2.0,
  south_asian:   -1.5,
  hispanic:       0.0,
  middle_eastern: 0.5,
  mixed:          0.0,
}

// Chest circumference (cm) per clothing size
const CHEST_BY_SIZE: Record<string, string> = {
  'NB':     '33–35 cm',
  '0-3m':   '35–40 cm',
  '3-6m':   '40–44 cm',
  '6-9m':   '44–47 cm',
  '9-12m':  '47–48 cm',
  '12-18m': '48–50 cm',
  '18-24m': '50–52 cm',
  '2T':     '52–54 cm',
  '3T':     '54–56 cm',
}

export const ALL_SIZES = [
  'NB', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m', '18-24m', '2T', '3T',
]

function heightToSize(cm: number): string {
  if (cm < 56)  return 'NB'
  if (cm < 62)  return '0-3m'
  if (cm < 68)  return '3-6m'
  if (cm < 74)  return '6-9m'
  if (cm < 80)  return '9-12m'
  if (cm < 86)  return '12-18m'
  if (cm < 92)  return '18-24m'
  if (cm < 98)  return '2T'
  return '3T'
}

// Linear interpolation for ages not in WHO table
function interpolateHeight(ageMonths: number): number {
  const ages = Object.keys(WHO_HEIGHT).map(Number).sort((a, b) => a - b)
  const lower = ages.filter(a => a <= ageMonths).pop() ?? ages[0]
  const upper = ages.find(a => a > ageMonths) ?? ages[ages.length - 1]
  if (lower === upper) return WHO_HEIGHT[lower]
  const t = (ageMonths - lower) / (upper - lower)
  return WHO_HEIGHT[lower] + t * (WHO_HEIGHT[upper] - WHO_HEIGHT[lower])
}

function interpolateWeight(ageMonths: number): number {
  const ages = Object.keys(WHO_WEIGHT).map(Number).sort((a, b) => a - b)
  const lower = ages.filter(a => a <= ageMonths).pop() ?? ages[0]
  const upper = ages.find(a => a > ageMonths) ?? ages[ages.length - 1]
  if (lower === upper) return WHO_WEIGHT[lower]
  const t = (ageMonths - lower) / (upper - lower)
  return WHO_WEIGHT[lower] + t * (WHO_WEIGHT[upper] - WHO_WEIGHT[lower])
}

export interface SizeRecommendation {
  size: string
  heightCm: number
  weightKg: number
  chestRange: string
}

export function getSuggestedSize(
  ethnicity: string,
  ageMonths: number
): SizeRecommendation {
  const baseHeight = interpolateHeight(ageMonths)
  const adj = ETHNIC_HEIGHT_ADJ[ethnicity] ?? 0
  const height = Math.round((baseHeight + adj) * 10) / 10
  const size = heightToSize(height)
  return {
    size,
    heightCm: Math.round(height),
    weightKg: Math.round(interpolateWeight(ageMonths) * 10) / 10,
    chestRange: CHEST_BY_SIZE[size] ?? '—',
  }
}

// Given a height in cm entered by the user, return the recommended size
export function getSizeFromHeight(heightCm: number): string {
  return heightToSize(heightCm)
}

export const MATERIALS = [
  'Organic Cotton',
  'GOTS Certified Cotton',
  'Bamboo',
  'Merino Wool',
  'Linen Cotton Blend',
  'Organic Cotton Blend',
]
