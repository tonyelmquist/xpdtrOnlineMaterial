
import firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {

  appId: "1:751964377888:web:28aafdb8221bc812be7d45"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;