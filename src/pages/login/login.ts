import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuiler: FormBuilder,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public afAuth: AngularFireAuth
              ) {

          this.loginForm = formBuiler.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.navCtrl.setRoot(HomePage);
    }, (error) => {
      this.loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: "Logging in.."
    });
    this.loading.present();
   }

  resetPwd() {
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount() {
      this.navCtrl.push(RegisterPage);
  }

}