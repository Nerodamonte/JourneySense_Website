import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { toast } from 'sonner'
import {
  ExperienceFormSectionHeader,
  experienceFieldLabel as labelCls,
  experienceInputClass as inputCls,
  experienceSelectClass as selectCls,
} from '../../components/staff/ExperienceFormSectionHeader'
import MicroExperienceExtraFields from '../../components/staff/MicroExperienceExtraFields'
import PortalUserMenu from '../../components/portal/PortalUserMenu'
import api from '../../api/axios'
import { parseAmenityInput } from '../../constants/microExperienceEnums'
import type { StaffOutletContext } from '../../layouts/staffOutletContext'
import type { CategoryResponseDto, ExperiencePhotoInput } from '../../types/portal'
import { getApiErrorMessage } from '../../utils/apiMessage'
import { resolveCoordinatePayload } from '../../utils/coordinates'

function buildTagsPayload(enumTags: string[], tagsExtraLine: string): string[] | undefined {
  const extra = parseAmenityInput(tagsExtraLine)
  const merged = [...new Set([...enumTags, ...extra])]
  return merged.length ? merged : undefined
}

type PhotoDraftRow = ExperiencePhotoInput & { key: string }

export default function StaffCreateJourneyPage() {
  const { setSidebarCollapsed } = useOutletContext<StaffOutletContext>()
  const navigate = useNavigate()
  const base = import.meta.env.VITE_API_BASE_URL ?? ''

  const [categories, setCategories] = useState<CategoryResponseDto[]>([])
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('Vietnam')
  /** Cặp WGS84 hoặc bỏ trống cả hai → geocode (MICRO_EXPERIENCE_FE.md §3). */
  const [latitudeStr, setLatitudeStr] = useState('')
  const [longitudeStr, setLongitudeStr] = useState('')
  const [richDescription, setRichDescription] = useState('')

  const [accessibleBy, setAccessibleBy] = useState<string[]>(['walking', 'motorbike'])
  const [preferredTimes, setPreferredTimes] = useState<string[]>([])
  const [weatherSuitability, setWeatherSuitability] = useState<string[]>([])
  const [seasonality, setSeasonality] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagsExtraInput, setTagsExtraInput] = useState('')
  const [amenityInput, setAmenityInput] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [crowdLevel, setCrowdLevel] = useState('normal')
  /** Ảnh kèm POST — `ExperiencePhotoInput` (URL). */
  const [photoDrafts, setPhotoDrafts] = useState<PhotoDraftRow[]>([])

  const [busy, setBusy] = useState(false)

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await axios.get<CategoryResponseDto[]>(`${base}/api/categories`)
        setCategories(Array.isArray(data) ? data : [])
        if (data?.[0]?.id) setCategoryId(data[0].id)
      } catch (e) {
        toast.error(getApiErrorMessage(e, 'Không tải được danh mục.'))
      }
    })()
  }, [base])

  const submit = async () => {
    if (!categoryId || !name.trim()) {
      toast.warning('Vui lòng nhập tên và chọn danh mục.')
      return
    }
    if (accessibleBy.length === 0) {
      toast.warning('Chọn ít nhất một phương tiện tiếp cận.')
      return
    }
    const coord = resolveCoordinatePayload(latitudeStr, longitudeStr)
    if (coord.kind === 'invalid') {
      toast.warning(coord.message)
      return
    }
    const amenityTags = parseAmenityInput(amenityInput)
    const tagsPayload = buildTagsPayload(tags, tagsExtraInput)
    const photosPayload: ExperiencePhotoInput[] = photoDrafts
      .filter((p) => p.photoUrl.trim())
      .map((p) => ({
        photoUrl: p.photoUrl.trim(),
        thumbnailUrl: p.thumbnailUrl?.trim() || undefined,
        caption: p.caption?.trim() || undefined,
        isCover: p.isCover,
      }))

    setBusy(true)
    const t = toast.loading('Đang tạo trải nghiệm…')
    try {
      const { data, status, headers } = await api.post('/api/micro-experiences', {
        name: name.trim(),
        categoryId,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        country: country.trim() || undefined,
        ...(coord.kind === 'fixed'
          ? { latitude: coord.latitude, longitude: coord.longitude }
          : {}),
        accessibleBy,
        preferredTimes: preferredTimes.length ? preferredTimes : undefined,
        weatherSuitability: weatherSuitability.length ? weatherSuitability : undefined,
        seasonality: seasonality.length ? seasonality : undefined,
        amenityTags: amenityTags.length ? amenityTags : undefined,
        tags: tagsPayload,
        richDescription: richDescription.trim() || undefined,
        openingHours: openingHours.trim() || undefined,
        priceRange: priceRange.trim() || undefined,
        crowdLevel: crowdLevel.trim() || 'normal',
        ...(photosPayload.length ? { photos: photosPayload } : {}),
      })
      toast.dismiss(t)
      toast.success('Tạo trải nghiệm thành công')
      const id = (data as { id?: string }).id
      if (status === 201 && id) {
        navigate(`/staff/journeys/${id}/edit`, { replace: true })
        return
      }
      const loc = headers.location
      if (loc) {
        const m = /([0-9a-f-]{36})$/i.exec(loc)
        if (m) navigate(`/staff/journeys/${m[1]}/edit`, { replace: true })
      }
    } catch (e) {
      toast.dismiss(t)
      toast.error(getApiErrorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  const sectionCard =
    'rounded-2xl bg-white border border-stone-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
  const formGridGap = 'grid grid-cols-1 md:grid-cols-2 gap-5'

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#fdfbf7] via-[#faf6ef] to-[#f5f0e8] font-['Lato',system-ui,sans-serif]">
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-white/90 [backdrop-filter:saturate(180%)_blur(8px)] border-b border-stone-200/80">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
            aria-label="Bật hoặc tắt menu bên"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-stone-900 font-['Cormorant_Garamond',serif]">Tạo trải nghiệm</h1>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => navigate('/staff')} className="text-sm font-medium text-stone-600 hover:text-amber-800">
            Đóng
          </button>
          <PortalUserMenu profilePath="/staff/profile" />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
          <section className={sectionCard}>
            <ExperienceFormSectionHeader
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h7m-7 6h16" />
                </svg>
              }
              title="Mô tả & ngữ cảnh"
            />
            <label className={labelCls}>Mô tả chi tiết</label>
            <textarea
              value={richDescription}
              onChange={(e) => setRichDescription(e.target.value)}
              rows={5}
              className={`${inputCls} resize-y min-h-[7rem]`}
              placeholder="Khoảng 100–200 chữ: không khí, điểm nổi bật, đối tượng phù hợp…"
            />
          </section>

          <section className={sectionCard}>
            <ExperienceFormSectionHeader
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Địa điểm & phân loại"
            />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
              <div className="flex min-w-0 flex-col gap-5">
                <div>
                  <label className={labelCls}>Tên trải nghiệm *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls}
                    placeholder="Ví dụ: Quán cà phê view đồi"
                  />
                </div>
                <div>
                  <label className={labelCls}>Danh mục *</label>
                  <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={selectCls}>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Địa chỉ</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="Số nhà, đường, phường…" />
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col gap-5 lg:min-h-[280px]">
                <div className={formGridGap}>
                  <div>
                    <label className={labelCls}>Thành phố</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} placeholder="Thành phố" />
                  </div>
                  <div>
                    <label className={labelCls}>Quốc gia</label>
                    <input value={country} onChange={(e) => setCountry(e.target.value)} className={inputCls} placeholder="Quốc gia" />
                  </div>
                </div>
                <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-dashed border-amber-200/90 bg-amber-50/50 p-4 sm:p-5">
                  <p className="text-xs font-semibold text-amber-900">Tọa độ WGS84 (tuỳ chọn)</p>
                  <div className={`mt-3 ${formGridGap}`}>
                    <div>
                      <label className={labelCls}>Vĩ độ (latitude)</label>
                      <input
                        value={latitudeStr}
                        onChange={(e) => setLatitudeStr(e.target.value)}
                        className={inputCls}
                        placeholder="Ví dụ: 10.7769"
                        inputMode="decimal"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Kinh độ (longitude)</label>
                      <input
                        value={longitudeStr}
                        onChange={(e) => setLongitudeStr(e.target.value)}
                        className={inputCls}
                        placeholder="Ví dụ: 106.7009"
                        inputMode="decimal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={sectionCard}>
            <ExperienceFormSectionHeader
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              }
              title="Thuộc tính chi tiết"
            />
            <MicroExperienceExtraFields
              hideOuterHeading
              accessibleBy={accessibleBy}
              onAccessibleByChange={setAccessibleBy}
              preferredTimes={preferredTimes}
              onPreferredTimesChange={setPreferredTimes}
              weatherSuitability={weatherSuitability}
              onWeatherSuitabilityChange={setWeatherSuitability}
              seasonality={seasonality}
              onSeasonalityChange={setSeasonality}
              tags={tags}
              onTagsChange={setTags}
              tagsExtraInput={tagsExtraInput}
              onTagsExtraInputChange={setTagsExtraInput}
              amenityInput={amenityInput}
              onAmenityInputChange={setAmenityInput}
              openingHours={openingHours}
              onOpeningHoursChange={setOpeningHours}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              crowdLevel={crowdLevel}
              onCrowdLevelChange={setCrowdLevel}
            />
          </section>

          <section className={`${sectionCard} space-y-5`}>
            <ExperienceFormSectionHeader
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Ảnh theo URL (tuỳ chọn)"
            />
            {photoDrafts.map((row) => (
              <div
                key={row.key}
                className="space-y-4 rounded-2xl border border-stone-200/80 bg-stone-50/40 p-4 sm:p-5"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                  <div className="min-w-0">
                    <label className={labelCls}>URL ảnh *</label>
                    <input
                      value={row.photoUrl}
                      onChange={(e) =>
                        setPhotoDrafts((rows) =>
                          rows.map((r) => (r.key === row.key ? { ...r, photoUrl: e.target.value } : r)),
                        )
                      }
                      className={inputCls}
                      placeholder="https://… hoặc /uploads/…"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className={labelCls}>URL ảnh thu nhỏ</label>
                    <input
                      value={row.thumbnailUrl ?? ''}
                      onChange={(e) =>
                        setPhotoDrafts((rows) =>
                          rows.map((r) => (r.key === row.key ? { ...r, thumbnailUrl: e.target.value } : r)),
                        )
                      }
                      className={inputCls}
                      placeholder="Tuỳ chọn"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className={labelCls}>Chú thích</label>
                    <input
                      value={row.caption ?? ''}
                      onChange={(e) =>
                        setPhotoDrafts((rows) =>
                          rows.map((r) => (r.key === row.key ? { ...r, caption: e.target.value } : r)),
                        )
                      }
                      className={inputCls}
                      placeholder="Tuỳ chọn"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/70 pt-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={row.isCover}
                      onChange={(e) =>
                        setPhotoDrafts((rows) =>
                          rows.map((r) => (r.key === row.key ? { ...r, isCover: e.target.checked } : r)),
                        )
                      }
                    />
                    Đặt làm ảnh bìa
                  </label>
                  <button
                    type="button"
                    onClick={() => setPhotoDrafts((rows) => rows.filter((r) => r.key !== row.key))}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Xoá dòng ảnh
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setPhotoDrafts((rows) => [
                  ...rows,
                  {
                    key: crypto.randomUUID(),
                    photoUrl: '',
                    thumbnailUrl: '',
                    caption: '',
                    isCover: rows.length === 0,
                  },
                ])
              }
              className="text-sm font-semibold text-[#c5a070] hover:underline"
            >
              + Thêm ảnh (URL)
            </button>
          </section>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white/95 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate('/staff')}
              className="order-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 sm:order-1"
            >
              Quay lại danh sách
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void submit()}
              className="order-1 rounded-xl bg-gradient-to-r from-[#c5a070] to-[#b08f5f] px-8 py-3 text-sm font-semibold text-white shadow-md hover:from-[#b08f5f] hover:to-[#9a7d52] disabled:opacity-55 sm:order-2"
            >
              {busy ? 'Đang tạo…' : 'Tạo trải nghiệm'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
