import {
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signOut as signOutFirebase,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const googleAuth = new GoogleAuthProvider();

export async function signUpWithEmailAndPassword(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPasswordFirebase(
      auth,
      email,
      password
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signInWithEmailAndPassword(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPasswordFirebase(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signOut() {
  let result = null;
  let error = null;
  try {
    result = await signOutFirebase(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
export async function signInGoogle() {
  let result = null,
    error = null;
  try {
    result = await signInWithPopup(auth, googleAuth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export const UpLoadFile = async (img) => {
  let urlDownload,
    upload = null;

  if (img) {
    const name = img.name;
    const storageRef = ref(storage, `image/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        upload = progress; // to show progress upload
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      async () => {
        urlDownload = await getDownloadURL(uploadTask.snapshot.ref);
      }
    );
  } else {
    console.error("File not found");
  }

  while (!urlDownload) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return { urlDownload, upload };
};
export const getData = async (name) => {
  let newData;
  await getDocs(collection(db, name)).then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    newData = data;
  });
  return newData;
};

export const addData = async (name, data) => {
  try {
    const docRef = await addDoc(collection(db, name), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleData = async (name, id) => {
  try {
    const docRef = doc(db, name, id);
    await deleteDoc(docRef);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
export const updateData = async (name, id, newData) => {
  try {
    const docRef = doc(db, name, id);
    await updateDoc(docRef, newData);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
export const getItem = async (name, id) => {
  try {
    const docRef = doc(db, name, id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error) {}
};
