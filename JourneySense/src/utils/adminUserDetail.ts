import type { AdminUserDetailDto } from '../types/portal'

/** API có thể trả camelCase hoặc PascalCase tùy cấu hình JSON backend. */
export function normalizeAdminUserDetailPayload(raw: unknown): AdminUserDetailDto {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid admin user response')
  }
  const o = raw as Record<string, unknown>
  const base = raw as AdminUserDetailDto

  const pick = (camel: string, pascal: string): string | null | undefined => {
    const a = o[camel]
    const b = o[pascal]
    if (typeof a === 'string') return a
    if (typeof b === 'string') return b
    return base[camel as keyof AdminUserDetailDto] as string | null | undefined
  }

  return {
    ...base,
    fullName: pick('fullName', 'FullName') ?? null,
    avatarUrl: pick('avatarUrl', 'AvatarUrl') ?? null,
    bio: pick('bio', 'Bio') ?? null,
  }
}
