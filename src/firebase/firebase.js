import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
var firebaseConfig = {
	apiKey: "AIzaSyCZfUUCps09EZeZBVjT6I8ZhCR_wjqhdN4",
	authDomain: "movies-1534a.firebaseapp.com",
	projectId: "movies-1534a",
	storageBucket: "movies-1534a.appspot.com",
	messagingSenderId: "735963589298",
	appId: "1:735963589298:web:e783b7e4dac455ebdcf7ab",
	measurementId: "G-VK6ZL6K8TB",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var provider = new firebase.auth.GoogleAuthProvider();
var fbProvider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
export { provider, firebase, fbProvider };
export default db;
