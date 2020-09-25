# VibeDuck - Playlist generator

## Setup

This is a guide on how to setup the project.

### 1. Clone the repo

`git clone` the repo,

### 2. Spotify development account

Now you need a Spotify developer account. You can get one [here](https://developer.spotify.com/dashboard/).

1. Create an app
2. Note down the ClientID and secret.
3. Open Settings and add `http://localhost:3000/` to Redirect URIs.
4. Don't forget to save.
5. Keep this tab open for step 3.

### 3. Firebase

The backend is run with Firebase Functions. To be able to use it you need a [Firebase](https://firebase.google.com/) project with Functions enabled. Note that this requires you to sign up for a paid subscription with a card.

Once you have Firebase functions set up, you need to add the remaining redirect URIs to your Spotify app for development and production.

1. `http://localhost:5000/MY_APP/us-central1/app/callback`
2. `http://localhost:5000/MY_APP/us-central1/app/`
3. `https://MY_APP.firebaseapp.com`
4. `https//us-central1-MY_APP.cloudfunctions.net/app/callback`

These are just examples of what the URIs can look like. It depends on what you named the app in Firebase. `MY_APP` is just a placeholder. If you don't know the local server uri, try running `npm run serve` in the functions folder.

### 4. Configs

Now you need to configure two files.

1. Rename `template.firebase-config.json` in the `functions` folder to `firebase-config.json` and add the Spotify credentials. The `functions.uri` should be your Firebase Functions URI. This is only for development.
2. For setting environment variables for production (these won't work locally) you should use `firebase functions:config:set spotify.client_id="yourClientID"` while inside the functions folder. Look at the firebase-config.json file to see which variables are needed.
3. Rename `.env.template` in the root folder to `.env` and add the `REACT_APP_DEV_API_URL` (should be something like `http://localhost:5000/MY_APP/us-central1/app`) and the production equivalent to `REACT_APP_PROD_API_URL` which you can find in the Firebase console under the project Functions.

## Run the project locally

1. Run `npm install` in the root folder and `/functions` folder.
2. Add and use `vibe-duck`` alias with [Firebase CLI](https://firebase.google.com/docs/cli)
3. `npm run serve` in the `/functions` folder.
4. `npm start` in the root folder.

## Deployment

The project is set up to deploy the project build. To deploy to firebase simply run these two commands.

1. `npm run build`
2. `firebase deploy`
