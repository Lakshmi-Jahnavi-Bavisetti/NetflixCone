import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

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
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=async()=>{
  signOut(auth);
}
export{auth,db,login,signup,logout}