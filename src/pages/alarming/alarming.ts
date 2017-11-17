import { Component } from '@angular/core';
import { Nav, NavController, NavParams, Platform,
  ViewController } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Vibration } from '@ionic-native/vibration';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AlarmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alarming',
  templateUrl: 'alarming.html',
})
export class AlarmingPage {
  private num: number[] = [];
  time: string;

  constructor(public androidFullScreen: AndroidFullScreen,
              public nav: Nav,
              public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public vibration: Vibration,
              public viewCtrl: ViewController) {
    this.time = this.navParams.get('time');
    for (var i = 0; i < 100; i++) {
      if (i % 2 == 0) {
        this.num.push(1000);
        this.num.push(1000);
      } else if (Math.abs(i % 2) == 1) {
        this.num.push(0);
        this.num.push(0);
      }
    }
    this.vibration.vibrate(this.num);
  }

  stopAlarm() {
    this.vibration.vibrate(0);
    this.viewCtrl.dismiss();
    this.nav.push(TabsPage).then(() => {
      const index = this.nav.getActive().index;
      this.nav.remove(0, index);
    });
  }

  ionViewDidLoad() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));
    console.log('ionViewDidLoad AlarmingPage');
  }

}
