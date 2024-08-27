import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { app_firebase } from "../../config";

const auth = getAuth(app_firebase);
export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential  = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Envoyer l'email de vérification
    await sendEmailVerification(user);
    console.log("Email de vérification envoyé.");
      console.log("Register user: ", user);
      console.log("Register userCredential: ", userCredential);
  } catch(error) {
    console.log("Error Register: ", error);
  }
};
