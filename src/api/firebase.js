
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where} from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Auth
const auth = getAuth(app)
//Initialize Firestore
const db = getFirestore(app)

const registerUser = async (firstName, lastName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    const user = userCredential.user
    await addDoc(collection(db, 'users'), {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    })
    return true
 } catch(error){
    return {error: error.message}
 }
}

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth,email,password)
    // eslint-disable-next-line no-unused-vars
    const user = userCredential.user
    console.log('user is signed in')
    return true
  } catch(error){
      return {error: error.message}
  }
}


const logOutUser = () => {
  try {
    signOut(auth)
    console.log('user is signed out')
    return true
  } catch (error){
    console.log('user did NOT signout')
    return false
  }
}


const vansRef = collection(db, "vans");

export async function getAllVans(){
  const querySnapshot = await getDocs(vansRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr
}


export async function getVan(id){
  const docRef = doc(db,'vans', id)
  const vanSnapshot = await getDoc(docRef)
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export async function getHostVans(){
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const q = query(vansRef, where("hostId", "==", uid))
  const querySnapshot = await getDocs(q)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr
}


export {
  auth,
  db,
  registerUser,
  loginUser,
  logOutUser
}