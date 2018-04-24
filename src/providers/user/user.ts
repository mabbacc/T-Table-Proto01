import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../../config';

import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api,
      private afAuth: AngularFireAuth) { 
        afAuth.authState.subscribe(user => {
          this._user = user;
        });
    }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  loginEmail(accountInfo: any) {
    console.log('user-loginEmail()a');
    return this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signupEmail(accountInfo: any) {
    console.log('user-signupEmail()a');
    return this.afAuth.auth.createUserWithEmailAndPassword(accountInfo.email, accountInfo.password);
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    // this.menu.close();
    this.afAuth.auth.signOut();

    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }




  /* Facebook Login */
  loginFacebook(accountInfo: any) {
    console.log("user-loginFacebook()a");
    return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
  }

  /* Google Login */
  loginGoogle(accountInfo: any) {
    console.log("user-loginGoogle()a");
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
      .then(() => {
        return this.afAuth.auth.getRedirectResult().then( result => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log('oAuth SignIn OK [' + token + ":" + user + "]");
        }).catch(function(error) {
          alert(error.message);
        });
      });
    }
  }



  updateDisplayName(_displayName: string, _photoURL: string = '') {
    this.afAuth.auth.currentUser.updateProfile( {
      displayName: _displayName,
      photoURL: _photoURL
    });
  }

  getUserId() {
    console.log('user-getUserId()a' );
    var userId = this._user.uid;
    console.log('userId [' + userId + ']' );
    return userId;
  }

  getUserName() {
    console.log('user-getUserName()a' );
    var userName = this._user.displayName;
    console.log('userName [' + userName + ']' );
    return userName;
  }
}
