import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EmailValidator } from '../../validators/email';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuiler: FormBuilder,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public afAuth: AngularFireAuth,
              public firestore: AngularFirestore
              ) {

        this.signupForm = formBuiler.group({
          email: ['', Validators.compose([Validators.required])],
          password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
          retype: ['', Validators.compose([Validators.minLength(6), Validators.required])],
          firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signupUser() {
    if (this.signupForm.value.password == this.signupForm.value.retype) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          let userId = this.afAuth.auth.currentUser.uid;
          let userDoc = this.firestore.doc<any>('users/' + userId);
          userDoc.set({
            firstName: this.signupForm.value.firstName,
            lastName: this.signupForm.value.lastName,
            email: this.signupForm.value.email
          });
          this.navCtrl.setRoot(LoginPage);
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
        content: "Signing up.."
      });
      this.loading.present();
    } else {
      let alert = this.alertCtrl.create({
        message: "The passwords do not match.",
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      alert.present();
    }
  }

}