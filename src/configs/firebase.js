// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
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
const storage = getStorage(app)
