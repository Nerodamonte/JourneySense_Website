/**
 * Giá trị gửi API khớp backend (List<string> / string), tham chiếu DomainEnums.cs + seed SQL.
 * — VehicleType: chữ thường (CreateAsync fallback "walking").
 * — TimeOfDay / WeatherType / SeasonType / VibeType: tên enum PascalCase như seed.
 * — CrowdLevel: chữ thường (service lưu ToLowerInvariant).
 */

export const VEHICLE_TYPE_OPTIONS = [
  { value: 'walking', label: 'Walking' },
  { value: 'bicycle', label: 'Bicycle' },
  { value: 'motorbike', label: 'Motorbike' },
  { value: 'car', label: 'Car' },
] as const

export const TIME_OF_DAY_OPTIONS = [
  { value: 'Morning', label: 'Morning' },
  { value: 'Afternoon', label: 'Afternoon' },
  { value: 'Evening', label: 'Evening' },
  { value: 'Night', label: 'Night' },
] as const

export const WEATHER_TYPE_OPTIONS = [
  { value: 'Sunny', label: 'Sunny' },
  { value: 'Cloudy', label: 'Cloudy' },
  { value: 'Rainy', label: 'Rainy' },
] as const

export const SEASON_TYPE_OPTIONS = [
  { value: 'YearRound', label: 'Year round' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Autumn', label: 'Autumn' },
  { value: 'Winter', label: 'Winter' },
  { value: 'Spring', label: 'Spring' },
] as const

/** VibeType — field tags */
export const VIBE_TYPE_OPTIONS = [
  { value: 'Chill', label: 'Chill' },
  { value: 'Relax', label: 'Relax' },
  { value: 'Explorer', label: 'Explorer' },
  { value: 'Foodie', label: 'Foodie' },
  { value: 'LocalVibes', label: 'Local vibes' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Photographer', label: 'Photographer' },
] as const

export const CROWD_LEVEL_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'quiet', label: 'Quiet' },
  { value: 'normal', label: 'Normal' },
  { value: 'busy', label: 'Busy' },
] as const

export function parseAmenityInput(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function joinAmenityForInput(tags: string[] | null | undefined): string {
  if (!tags?.length) return ''
  return tags.join('\n')
}
