// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAqSUD5MCpYxO1A18u3jz8Sx_CYLv08gDc',
	authDomain: 'edis-20d0d.firebaseapp.com',
	projectId: 'edis-20d0d',
	storageBucket: 'edis-20d0d.appspot.com',
	messagingSenderId: '24982327343',
	appId: '1:24982327343:web:98a99969d7b5893fc7b6da',
	measurementId: 'G-RCR8DYL78T',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firebaseStorage = getStorage(app, `gs://edis-20d0d.appspot.com`)

export default firebaseStorage

// apiKey: process.env.FIREBASE_APIKEY,
// authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// projectId: process.env.FIREBASE_PROJECT_ID,
// storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.FIREBASE_APP_ID,
// measurementId: process.env.FIREBASE_MEASUREMENT_ID,
