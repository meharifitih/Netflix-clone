import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDHvTvgJIGy8iF_SkDQ0w6n8o4VgoNabws",
  authDomain: "netflix-clon-84cd2.firebaseapp.com",
  projectId: "netflix-clon-84cd2",
  storageBucket: "netflix-clon-84cd2.firebasestorage.app",
  messagingSenderId: "502118450965",
  appId: "1:502118450965:web:20b597069a1e51aec94b1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvide: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
}
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };
