/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_ENV: 'development' | 'production' | 'test';
    readonly VITE_API_BASE_URL: string;
    readonly VITE_UPLOAD_URL: string;
    readonly VITE_PORT: number;
    readonly VITE_OPEN: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
