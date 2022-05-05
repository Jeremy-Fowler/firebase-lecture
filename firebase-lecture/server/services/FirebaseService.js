import firebaseAdmin from "firebase-admin";
const firebaseAccountKey = require('../../Firebase.env.json')
class FirebaseService {
  constructor () {
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
  }
  async getToken(id) {
    const token = await firebaseAdmin.auth().createCustomToken(id)
    return token
  }

}

export const firebaseService = new FirebaseService()