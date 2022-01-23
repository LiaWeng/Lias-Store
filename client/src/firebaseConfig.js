import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBrYNibF1CgK5OTrww7YR7ST7ztZiypEQU',
  authDomain: 'lia-online-store.firebaseapp.com',
  projectId: 'lia-online-store',
  storageBucket: 'lia-online-store.appspot.com',
  messagingSenderId: '719282028962',
  appId: '1:719282028962:web:8556d438392c98238472fb',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }
