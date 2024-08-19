import { db, storage, auth } from "../firebase/config"
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

// Firestore operations
export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
}

export const setDocument = async (
  collectionName: string,
  id: string,
  data: any,
) => {
  await setDoc(doc(db, collectionName, id), data)
}

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any,
) => {
  await updateDoc(doc(db, collectionName, id), data)
}

export const deleteDocument = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id))
}

// Storage operations
export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export const deleteFile = async (path: string) => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

// Auth operations
export const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logOut = async () => {
  return signOut(auth)
}
