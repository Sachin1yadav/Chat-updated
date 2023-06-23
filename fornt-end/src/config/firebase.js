// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {

  apiKey: "AIzaSyDbynJX-7_WEXTV27eH12PMoHuNoquzAtk",

  authDomain: "uynite-58644.firebaseapp.com",

  projectId: "uynite-58644",

  storageBucket: "uynite-58644.appspot.com",

  messagingSenderId: "653379364316",

  appId: "1:653379364316:web:a28c0091f9eec7dea91b19",

  measurementId: "G-KYT183BCCB"

};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAcJzppx6PHvFiGQlP3HXcC21cgDATqAoE",
//   authDomain: "uynite-inc.firebaseapp.com",
//   databaseURL: "https://uynite-inc-default-rtdb.firebaseio.com",
//   projectId: "uynite-inc",
//   storageBucket: "uynite-inc.appspot.com",
//   messagingSenderId: "48084742080",
//   appId: "1:48084742080:web:499527de558e0e3e08e225",
//   measurementId: "G-2WD1HF0SLM"
// };



// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp)
export const auth = getAuth(firebaseApp)
export default firebaseApp;



export const getFirebaseToken = () => {
  console.log('gettttttttttttttttttttt');
  return getToken(messaging, { vapidKey: "BExSoX0V7oEaL1bqdjowpSW7zxranq47XiVoZ9MbuuoLktxeCcGwZQoqoNCsGayHcgg67jMFNbX0Tg8WwZGQNaU" })
}


// Get registration token for Firebase Cloud Messaging
export const getFCMToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      console.log("FCM token:", currentToken);
      // TODO: Send the token to your server
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
};

