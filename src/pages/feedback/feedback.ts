import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, Navbar, NavController, Platform,
  ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  @ViewChild('input') feedbackField;
  @ViewChild(Navbar) navBar: Navbar;
  private url: string = 'feedback';
  feedback: string;
  submitForm: FormGroup;

  constructor(public afdb: AngularFireDatabase,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder,
              public navCtrl: NavController,
              public platform: Platform,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController) {
    this.platform = platform;
    this.submitForm = this.formBuilder.group({
      feedback: [this.feedback, Validators.required]
    });
  }

  addItem(item) {
    let count = 0, length = 0;
    let db = this.afdb.list(this.url);
    db.valueChanges().subscribe(data => {
      length = data.length + 2;
      for (let i = 1; i < length; i++) {
        this.afdb.list(this.url + "/id: " + i).valueChanges().subscribe(
          data => {
            if ((data[0] == undefined || data[0] == null || data[0] == '')
              && count == 0) {
                db.set("id: " + i, item);
                count++;
            }
        });
        if (count > 0) {
          break;
        }    
      }
    });
  }
 
  getControl(field) {
    return this.submitForm.controls[field];
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Thank you for the feedback',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('presentToast FeedbackPage');
    });
    toast.present();
  }

  send() {
    if(this.validate()) {
      this.feedback = this.submitForm.value.feedback;
      this.addItem({date: new Date().toString().substr(0,31), platform: this.platform.platforms()[1], input: this.feedback});
      this.presentToast();
      this.viewCtrl.dismiss();
      if (this.navCtrl.canGoBack()) {
        this.navCtrl.pop();
      }
    } 
  }

  showSystem() {
    let alert = this.alertCtrl.create({
      title: 'System Information',
      subTitle: '<br>' + this.platform.platforms()[1] || 'Not found!'
    });
    alert.present();
  }

  validate() {
    let errorMsg : string;
    if (this.submitForm.valid) {
      return true;
    }
    if (this.getControl('feedback').invalid) {
      if (this.getControl('feedback').errors['required']) {
        errorMsg = 'Write your feedback before sending.';
      } 
    }
    let alert = this.alertCtrl.create({
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });
    alert.present();
    return false;    
  }

  ionViewDidLoad() {
    setTimeout(() => {this.feedbackField.setFocus()}, 1000);
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.pop();
      if (this.navCtrl.canGoBack()) {this.navCtrl.pop()}
    };
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
    console.log('ionViewDidLoad FeedBackPage');
  }

}
