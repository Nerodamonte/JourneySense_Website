/**
 * Khớp backend `CreateMicroExperienceRequest` / `UpdateMicroExperienceRequest` + MICRO_EXPERIENCE_FE.md:
 * gửi đủ latitude & longitude, hoặc bỏ cả hai để geocode từ địa chỉ.
 */

export type CoordinateResolveResult =
  | { kind: 'geocode' }
  | { kind: 'fixed'; latitude: number; longitude: number }
  | { kind: 'invalid'; message: string }

export function resolveCoordinatePayload(latStr: string, lngStr: string): CoordinateResolveResult {
  const latT = latStr.trim()
  const lngT = lngStr.trim()
  if (!latT && !lngT) return { kind: 'geocode' }
  if (!latT || !lngT) {
    return {
      kind: 'invalid',
      message: 'Nhập đủ vĩ độ và kinh độ (WGS84), hoặc bỏ cả hai để hệ thống geocode từ địa chỉ.',
    }
  }
  const latitude = Number(latT)
  const longitude = Number(lngT)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return { kind: 'invalid', message: 'Tọa độ phải là số hợp lệ.' }
  }
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return { kind: 'invalid', message: 'Vĩ độ từ −90 đến 90; kinh độ từ −180 đến 180.' }
  }
  return { kind: 'fixed', latitude, longitude }
}
