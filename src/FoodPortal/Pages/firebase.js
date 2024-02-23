import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAYSbDV0bXbWpvpNfmXbSmqYO_iiSq1_Ns",
  authDomain: "car-rental-portal-f5b02.firebaseapp.com",
  projectId: "car-rental-portal-f5b02",
  storageBucket: "car-rental-portal-f5b02.appspot.com",
  messagingSenderId: "846267176073",
  appId: "1:846267176073:web:9a6c4833fbbacadd49a258",
  measurementId: "G-KYL40GQ54L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);