'use strict';

const functions = require('firebase-functions');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const crypto = require('crypto');

const express = require('express');
const app = express();

app.use(cookieParser());

// Firebase SDK Setup, use firebase-config.json for dev
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const firebaseConfig =
  Object.keys(functions.config()).length === 0
    ? require('./firebase-config.json')
    : functions.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});

/**
 * Spotify credentials
 * set environment config variables:
 * firebase functions:config:set spotify.client_id="yourClientID"
 * spotify.client_secret="yourClientSecret"
 *
 * set up front-end uri, else will use ./firebase-config.json for development variables
 *
 * set up functions uri
 * `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/app/callback`
 */
const credentials = {
  clientId: firebaseConfig.spotify.client_id,
  clientSecret: firebaseConfig.spotify.client_secret,
  redirectUri: firebaseConfig.functions.uri + '/app/callback',
};

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi(credentials);

const scopes = ['playlist-modify-public'];
const uri = firebaseConfig.frontend.uri;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', uri); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/**
 * Redirect to Spotify Accounts service
 */
app.get('/login', async (req, res) => {
  const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
  // set cookie to expire in 1h
  res.cookie('state', state.toString(), {
    maxAge: 3600000,
  });
  const authorizeURL = await spotifyApi.createAuthorizeURL(
    scopes,
    state.toString()
  );
  res.redirect(authorizeURL);
});

/**
 * Request tokens from accounts service and redirect to app
 */
app.get('/callback', (req, res) => {
  // can't get res from callback unless state is valid
  if (!req.cookies.state) {
    res.redirect(
      `${uri}/?` +
        querystring.stringify({
          error: 'state cookie expired or not set',
        })
    );
  }

  if (req.cookies.state !== req.query.state) {
    res.redirect(
      `${uri}//?` +
        querystring.stringify({
          error: 'state validation failed',
        })
    );
  }

  const authorizationCode = req.query.code || null;

  // request tokens from spotify accounts service
  spotifyApi
    .authorizationCodeGrant(authorizationCode)
    .then(
      (data) => {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      },
      (err) => {
        res.redirect(
          `${uri}/?` +
            querystring.stringify({
              error: 'invalid token',
            })
        );
      }
    )
    .then(() => {
      res.redirect(
        `${uri}/?` +
          querystring.stringify({
            access_token: spotifyApi.getAccessToken(),
            refresh_token: spotifyApi.getRefreshToken(),
          })
      );
    });
});

app.post('/refresh_token', (req, res, next) => {
  const refreshToken = req.body.refresh_token;
  spotifyApi.setRefreshToken(refreshToken);

  spotifyApi.refreshAccessToken().then(
    (data) => {
      const newToken = data.body['access_token'];
      spotifyApi.setAccessToken(newToken);
      res.status(200).send({ access_token: newToken });
    },
    (err) => {
      console.log('Could not refresh access token', err);
      res.status(400).send({ error: 'invalid refresh token' });
    }
  );
});

exports.app = functions.https.onRequest(app);
