import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app_firebase } from "../../config";
import { logoutUser, setUser } from "../../../../store-management/actions/users/users-actions";

const auth = getAuth(app_firebase);

let store;
export const injectStoreInOauthFirebase = _store => { store = _store; }

const stateOauth = () => {
  const stateUser = onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid: string = user.uid;
      console.log("uid: ", {connected: true, user: user});
      store.dispatch(setUser(user));
      return {connected: true, user: user}
      // ...
    } else {
      console.log("uid: ", {connected: false, user: user});
      store.dispatch(logoutUser());
      return {connected: false, user: user}
    }
  });
  return stateUser;
}

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    window.location.href = "home";
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    // Gérer l'erreur de déconnexion, par exemple, afficher un message à l'utilisateur
  }
};

export default stateOauth;