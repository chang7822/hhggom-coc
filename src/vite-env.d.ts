/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_KEY: string;
    readonly VITE_APP_CLAN_TAG: string;
    // 여기에 다른 환경 변수들을 추가할 수 있습니다.
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
