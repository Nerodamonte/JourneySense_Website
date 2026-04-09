/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  /** Public key for Goong Maps JS (used to render map tiles in browser). */
  readonly VITE_GOONG_MAP_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
