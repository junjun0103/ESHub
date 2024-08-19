/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_REACT_APP_FIREBASE_API_KEY: string;
  VITE_REACT_APP_FIREBASE_AUTH_DOMAIN: string;
  VITE_REACT_APP_FIREBASE_PROJECT_ID: string;
  VITE_REACT_APP_FIREBASE_STORAGE_BUCKET: string;
  VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_REACT_APP_FIREBASE_APP_ID: string;
  // add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}