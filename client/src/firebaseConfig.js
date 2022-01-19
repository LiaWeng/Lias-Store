import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCYOFHGGxBBScze-n9GazD8AQHOvWMx4Ds',
//   authDomain: 'clone-32f48.firebaseapp.com',
//   projectId: 'clone-32f48',
//   storageBucket: 'clone-32f48.appspot.com',
//   messagingSenderId: '177652726735',
//   appId: '1:177652726735:web:ca1093a634fa75cb5770ba',
//   measurementId: 'G-ZT3VQDT8PN',
// }

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
