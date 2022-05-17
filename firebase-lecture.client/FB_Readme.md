# FIREBASE BABY

## FIREBASE SETUP

### Step 1:
Follow Step 1 of [this documentation](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app) to set up a Project and an App on Firebase.

## BACK END

### Step 1:
Run `npm i firebase-admin` on your server folder

Go and grab your firebase env file from [Firebase](https://firebase.google.com/)
under Project Overview/Project Settings/Service Accounts/Generate New Private Key

![firebase-env](../firebase-lecture.client/src/assets/img/Screenshot%202022-05-12%20143642.png)

Drag this file over to the top level folder in your server, rename to firebase.env.json, and add this file to your gitignore

![server-folder](../firebase-lecture.client/src/assets/img/Screenshot%202022-05-12%20145041.png)

## Step 2:
Set up FirebaseService.
Bring in your Firebase Account Key in your service, as well as your FirebaseAdmin

```js
import firebaseAdmin from "firebase-admin"
const firebaseAccountKey = require('../../Firebase.env.json');
```

Set up your constructor on your FirebaseService to Initialize App

```js
constructor () {
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
  }
```

Set up your get token method that will take in accountId as a custom token

```js
async getToken(id) {
    const token = await firebaseAdmin.auth().createCustomToken(id)
    return token
  }
```

## Step 3:

Set up a method in the Account Controller that will call to your Get Token method in your Firebase Service. Pass down the userInfo.id to be used as our Custom Token

```js
export class AccountController extends BaseController {


	constructor () {
  	super('account')
    this.router
			.use(Auth0Provider.getAuthorizedUserInfo)
			.get('', this.getUserAccount)
			// NOTE this is our route to get our authorization token
			.get('/firebase', this.getFirebaseToken)
			.put('', this.editAccount)
  }

	async getFirebaseToken(req, res, next) {
    try {
      const token = await firebaseService.getToken(req.userInfo.id)
			// NOTE send the token back as an object, or else you won't be able to target it if needed
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }

}
```


## FRONT END

### Step 1:
Run 'npm i firebase' in your client folder

### Step 2:
Go and grab your firebaseConfig from Firebase under Project/App/App Settings

Place this in your env.js and set it up as an export called firebaseConfig

### Step 3:
Set up your FirebaseProvider in your Utils folder.
Set up an export named fb from firebase.initializeApp()	and use firebaseConfig as the argument (initializeApp(firebaseConfig))
Set up an export named fbAuth which will be fb.auth()
Set up an export named storage which will be fb.storage()

### Step 4:
Set up your FirebaseService in services folder.