
  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDU0WxsmNh2g0pBVh3vSwPWPoqJBeY9hXU",
  //   authDomain: "quickdocs-882ea.firebaseapp.com",
  //   projectId: "quickdocs-882ea",
  //   storageBucket: "quickdocs-882ea.firebasestorage.app",
  //   messagingSenderId: "387302810633",
  //   appId: "1:387302810633:web:03436003ec2adc9be244d8"
  
  // }

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDU0WxsmNh2g0pBVh3vSwPWPoqJBeY9hXU",
    authDomain: "quickdocs-882ea.firebaseapp.com",
    projectId: "quickdocs-882ea",
    storageBucket: "quickdocs-882ea.firebasestorage.app",
    messagingSenderId: "387302810633",
    appId: "1:387302810633:web:03436003ec2adc9be244d8"
  
  }


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export { ref, uploadBytes, getDownloadURL, collection, addDoc, getDocs, query, orderBy };