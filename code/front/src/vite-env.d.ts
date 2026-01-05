/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // Ajouter d'autres variables d'environnement ici
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
