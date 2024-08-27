import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app_firebase } from "../../config";
import { toast } from "react-toastify";

const auth = getAuth(app_firebase);

const provider = new GoogleAuthProvider();

export const loginWithEmailAndPassword = (email: string, password: string) => {
  const credential = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast("Vous etes connecte");
      return {connected: true, user:user};
    })
    .catch((error) => {
      toast("Erreur de connexion");
      return {connected: false, code: error.code, message: error.message}
    });
    return credential;
};

export const loginWithGoogleAuth = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      console.log("Credentials: ", credential);
      // const user = result.user;
      console.log("result: ", result);
      console.log(
        "getAdditionalUserInfo(result): ",
        getAdditionalUserInfo(result)
      );
    })
    .catch((error) => {
      // console.log("Error: ", error);
      const credential = GoogleAuthProvider.credentialFromError(error);
      // console.log("Credentials: ", credential);
    });
};

