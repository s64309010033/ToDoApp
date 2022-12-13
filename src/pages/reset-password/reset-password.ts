import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  public resetPwdForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuiler: FormBuilder,
              public alertCtrl: AlertController,
              public afAuth: AngularFireAuth
              ) {

    this.resetPwdForm = formBuiler.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetUserPwd() {
    this.afAuth.auth.sendPasswordResetEmail(this.resetPwdForm.value.email).then((user) => {
      let alert = this.alertCtrl.create({
        message: "We just sent a link to reset your password to your email.",
        buttons: [{ text: "Ok", role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }}]
      });
      alert.present();
    }, (error) => {
      let errorAlert = this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      errorAlert.present();
    });
   }

}