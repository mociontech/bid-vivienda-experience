import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

// Tablet y TV comparten un mismo nodo de sesión en la RTDB para poder
// correr varias instalaciones del BID en paralelo sin cruzarse.
export const SESSION_ID = import.meta.env.VITE_SESSION_ID ?? 'default'
export const sessionPath = (...segments: string[]) =>
  ['sessions', SESSION_ID, ...segments].join('/')
