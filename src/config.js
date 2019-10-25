export const firebase = {
  apiKey: "AIzaSyChsVSE1qHHw57ffMuGCYYaGMaVRQQ0f64",
  authDomain: "xpdtronline.firebaseapp.com",
  databaseURL: "https://xpdtronline.firebaseio.com",
  projectId: "xpdtronline",
  storageBucket: "xpdtronline.appspot.com",
  messagingSenderId: "751964377888",
}

export const reduxFirebase = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
}

export default { firebase, reduxFirebase }
