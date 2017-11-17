import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

/**
 * Generated class for the ScreenSaverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-screen-saver',
  templateUrl: 'screen-saver.html',
})
export class ScreenSaverPage {

  constructor(public androidFullScreen: AndroidFullScreen,
              public viewCtrl: ViewController) {
  }

  close() {
    this.viewCtrl.dismiss();
    this.androidFullScreen.showSystemUI();
  }

  ionViewDidLoad() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));
    console.log('ionViewDidLoad ScreenSaverPage');
  }

}
