/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEVELOPMENT_API_URL?: string;
  readonly VITE_PRODUCTION_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
