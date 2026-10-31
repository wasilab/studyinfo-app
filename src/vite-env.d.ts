/// <reference types="vite/client" />

interface ImportMetaEnv {
  // "true" switches to in-memory routing, for previews that cannot use URL paths.
  readonly VITE_MEMORY_ROUTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
