import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test1234@example.com',
    password: 'test1234'
  };

  // Our translated text strings
  private loginSuccessString: string;
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_SUCCESS').subscribe((value) => {
      this.loginSuccessString = value;
    });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

  }

  // Attempt to login in through our User service
  doLogin() {
    console.log('login-doLogin()a');
    this.user.loginEmail(this.account)
    .then(
      (result) => {
        console.log("login-doLogin()-success [" + result + "]");
        this.user.updateDisplayName( 'Test User-1045');
        this.navCtrl.push(MainPage);
        let toast = this.toastCtrl.create({
          message: this.loginSuccessString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      },
      (error) => {
        console.log("login-doLogin()-fail [" + error + "]");
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    )
  }


  doFacebook() {
    console.log('login-doFacebook()');
    this.user.loginFacebook(this.account)
    .then(
      (result) => {
        console.log('login-user.loginFacebook-success() [' + JSON.stringify(result) + ']');
        this.navCtrl.push(MainPage);
        let toast = this.toastCtrl.create({
          message: this.loginSuccessString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (error) => {
        console.log('login-user.loginFacebookGoogle-fail() [' + JSON.stringify(error) + ']');

        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    )
  }

  doGoogle() {
    console.log('login-doGoogle()');

    this.user.loginGoogle(this.account)
    .then(
      (result) => {
        console.log('login-user.loginGoogle-success() [' + JSON.stringify(result) + ']');
        this.navCtrl.push(MainPage);
        let toast = this.toastCtrl.create({
          message: this.loginSuccessString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (error) => {
        console.log('login-user.loginGoogle-fail() [' + JSON.stringify(error) + ']');

        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    )
  }
}
