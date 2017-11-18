import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NavController, NavParams, Platform,
  ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { AlarmingPage } from '../alarming/alarming';
import { ClockDataProvider, Alarm } from '../../providers/clock-data/clock-data';

/**
 * Generated class for the AlarmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alarms',
  templateUrl: 'alarms.html',
})
export class AlarmsPage {
  private subscription;
  private isAdded: boolean = false;
  private count: number = 0;
  private time: string;
  alarms: Array<Alarm> = [];

  constructor(public androidFullScreen: AndroidFullScreen,
              public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public toastCtrl: ToastController,
              public storage: Storage,
              public datePicker: DatePicker,
              public provider: ClockDataProvider) {
    this.storage.ready().then(() => {
      this.storage.get('alarms').then((data) => {
        if (data != null && data.length > 0) {
          this.alarms = data;
          this.isAdded = true;
        }
      });
    });
    this.time = this.provider.getTime().substr(0,5);
    this.checkAlarm();
    this.platform.pause.subscribe(() => {
      this.checkAlarm();
    });
    this.platform.resume.subscribe(() => {
      this.checkAlarm();
    });
  }

  addAlarm() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      is24Hour: true,
    }).then(
      date => {
        this.alarms.push({time: date.toTimeString().substr(0,5), status: 'on'});
        this.alarms.sort(function(a,b) {
          return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
        });
        this.storage.set('alarms', this.alarms);
        this.isAdded = true;
        this.checkAlarm();
      },
      err => console.log(err)
    );
  }

  checkAlarm() {
    this.subscription = Observable.interval(1000).subscribe(x => {
      this.time = this.provider.getTime().substr(0,5);
      let sec = this.provider.getTime().substr(6,7);
      for (var i = 0; i < this.alarms.length; i++) {
        if (this.alarms[i].time == this.time &&
          this.alarms[i].status == 'on'&& sec == '00') {
            this.navCtrl.push(AlarmingPage, {time: this.alarms[i].time});
            this.count++;
            this.subscription.unsubscribe();
            break;
        }
      }
    });
  }

  editAlarm(alarm) {
    let index = this.alarms.indexOf(alarm);
    var today = new Date();
    this.datePicker.show({
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(),
        alarm.time.substr(0,2), alarm.time.substr(3,5), 0),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK,
      is24Hour: true,
    }).then(
      date => {
        this.alarms.splice(index, 1, {time: date.toTimeString().substr(0,5), status: 'on'});
        this.alarms.sort(function(a,b) {
          return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
        });
        this.storage.set('alarms', this.alarms);
        this.checkAlarm();
      },
      err => console.log(err)
    );
  }

  deleteAlarm(alarm) {
    let index = this.alarms.indexOf(alarm);
    if (index > -1) {
      this.alarms.splice(index, 1);
      this.storage.set('alarms', this.alarms);
      if (this.alarms.length <= 0) {
        this.isAdded = false;
      }
    }
    const toast = this.toastCtrl.create({
      message: 'Alarm deleted',
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'UNDO'
    });
    toast.onDidDismiss((_null, role) => {
      if (role == 'close') {
        this.alarms.splice(index, 0, {time: alarm.time, status: 'on'});
        this.storage.set('alarms', this.alarms);
        if (this.alarms.length > 0) {
          this.isAdded = true;
          this.checkAlarm();
        }
        
      }
    });
    toast.present();
  }

  switchAlarm(ctl, alarm) {
    if (ctl.checked === true) {
      alarm.status = 'on';
      this.checkAlarm();
    } else {
      alarm.status = 'off';
    }
    this.storage.set('alarms', this.alarms);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmsPage');
  }

  ionViewDidEnter() {
    this.androidFullScreen.showSystemUI();
    this.checkAlarm();
  }

}
