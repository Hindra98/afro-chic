import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
// import { app_firebase } from "../../config";
import { db_firebase } from "../config";


export const getProduct = async (product: Product) => {
  try {
    const docRef = await addDoc(collection(db_firebase, "products"), product);
    console.log("Ajout effectué. Id: ", docRef.id);
  } catch (e) {
    console.error("Erreur d'ajout de produit: ", e);
  }
};

export const getProducts = async () => {
const products: {id: string, data: DocumentData}[] = [];
  const querySnapshot = await getDocs(collection(db_firebase, "products"));
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, data: doc.data() });
    console.log(`${doc.id} => ${doc.data()}`);
  });
  return products;
};
export const addProduct = async (product: Product) => {
  try {
    const docRef = await addDoc(collection(db_firebase, "products"), product);
    console.log("Ajout effectué. Id: ", docRef.id);
  } catch (e) {
    console.error("Erreur d'ajout de produit: ", e);
  }
};

