import axios from "axios";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence,
    User,
} from "firebase/auth";
import { firebaseApp } from "../lib/firebase";

export const generateForm = async (
    tfURL: string,
    isHomeTeam: boolean,
    user : User | null
) => {
    const userToken = await user?.getIdToken();
    const userEmail = user?.email;
    let data = JSON.stringify({
        url: tfURL,
        isHomeTeam: isHomeTeam,
        userEmail : userEmail,
    });
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://prf-api.onrender.com/createForm",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`, 
        },
        data: data,
    };
    const response = await axios.request(config);
    return response.data;
};

export const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    setPersistence(auth, browserSessionPersistence);
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const handleSignOut = async () => {
    const auth = getAuth(firebaseApp);
    await auth.signOut();
};
