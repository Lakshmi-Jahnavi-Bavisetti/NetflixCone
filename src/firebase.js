import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0EbS2W3SvNWrph_FE9E7TIJWy1l_dG8U",
  authDomain: "netflixclone-20254.firebaseapp.com",
  projectId: "netflixclone-20254",
  storageBucket: "netflixclone-20254.appspot.com",
  messagingSenderId: "166765100688",
  appId: "1:166765100688:web:860cd621ccbed0efc3a215"
};

const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user",{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        }));
    } catch (error) {
        console.log(error)
    }
}