import { Component } from '@angular/core';
import { AlertController, Platform, NavParams, ToastController,
  ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverHelpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover-helps',
  templateUrl: 'popover-helps.html',
})
export class PopoverHelpsPage {
  private isClicked: boolean;
  icon : string = '../../assets/icon/favicon.ico';

  constructor(public alertCtrl: AlertController,
              public navParams: NavParams,
              public platform: Platform,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController) {
    this.isClicked = this.navParams.get('clicked');
  }

  clear() {
    const toast = this.toastCtrl.create({
      message: 'Help history cleared.',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('presentToast PopoverHelpsPage');
    });
    this.close();
    toast.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  info() {
    let alert = this.alertCtrl.create({
      subTitle: '<img src="' + this.icon + '"/><div class="ph-content"><h2>Clock</h2>' + 
      'Version 5.1 (4224536)<br><br>&copy;2017 Google Inc.</div>',
      cssClass: 'ph-info',
    });
    alert.present();
    this.close();
  }

  na() {
  }

  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {this.close()});
    console.log('ionViewDidLoad PopoverHelpsPage');
  }
  
}
