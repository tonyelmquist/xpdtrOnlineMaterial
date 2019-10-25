//src/firebaseConfig.js
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyChsVSE1qHHw57ffMuGCYYaGMaVRQQ0f64",
  authDomain: "xpdtronline.firebaseapp.com",
  databaseURL: "https://xpdtronline.firebaseio.com",
  projectId: "xpdtronline",
  storageBucket: "xpdtronline.appspot.com",
  messagingSenderId: "751964377888",
  appId: "1:751964377888:web:28aafdb8221bc812be7d45"
};

firebase.initializeApp(firebaseConfig)

export default firebase;