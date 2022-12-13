import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

export const firebaseConfig = {
  apiKey: "AIzaSyAbT_I41CB-UOll6QI94V32imteryN4J-c",
  authDomain: "todolist-c8d47.firebaseapp.com",
  //databaseURL: "https://###########.firebaseio.com",
  projectId: "todolist-c8d47",
  storageBucket: "todolist-c8d47.appspot.com",
  messagingSenderId: "446515602081",
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
