import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { ClockDataProvider } from '../../providers/clock-data/clock-data';

/**
 * Generated class for the TimersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-timers',
  templateUrl: 'timers.html',
})
export class TimersPage {
  private subscription;
  private isClicked: boolean = false;
  private isEntered: boolean = false;
  private isFirstClick: boolean = true;
  private isFirstTime: boolean = true;
  private isVibrated: boolean = false; 
  private daughter: string = '0';
  private mt: string = '';
  private num: number[] = [];
  count: number = 0;
  enter: number = 0;
  nums: number[] = [];
  h: string = '00'; m: string = '00'; s: string = '00';

  constructor(public provider: ClockDataProvider,
              public platform: Platform,
              public vibration: Vibration) {
    this.platform = platform;
    for (let i = 1; i < 10; i++) {
      this.nums.push(i);
    }
    this.nums.push(0);
    for (let i = 0; i < 500; i++) {
      if (i % 2 == 0) {
        this.num.push(1000);
        this.num.push(1000);
      } else if (Math.abs(i % 2) == 1) {
        this.num.push(0);
        this.num.push(0);
      }
    }
  }

  add(num) {
    if (num == 0 && this.isFirstTime) {
      return;
    }
    this.isEntered = true;
    this.isFirstTime = false;
    if (this.enter <= 6) {
      this.enter++;
    }
    switch (this.enter) {
      case 1:
        this.s = '0' + num;
        break;
      case 2:
        this.s = this.s.substr(1) + num;
        break;
      case 3:
        this.m = '0' + this.s.slice(0, -1);
        this.s = this.s.substr(1) + num;
        break;
      case 4:
        this.m = this.m.substr(1) + this.s.slice(0, -1);
        this.s = this.s.substr(1) + num;
        break;
      case 5:
        this.h = '0' + this.m.slice(0, -1);
        this.m = this.m.substr(1) + this.s.slice(0, -1);
        this.s = this.s.substr(1) + num;
        break;
      case 6:
        this.h = this.h.substr(1) + this.m.slice(0, -1);
        this.m = this.m.substr(1) + this.s.slice(0, -1);
        this.s = this.s.substr(1) + num;
        break;
    }
  }

  addMinute() {
    this.isVibrated = false;
    let m = this.provider.getTimerMinute();
    m += 1;
    this.daughter = this.provider.resetCountDown(this.h, m,
      this.provider.getTimerSecond() - 1);
    this.provider.setCountdown(this.h, m, this.provider.getTimerSecond() - 1);
    this.vibration.vibrate(0);
  }

  countStartStop() {
    this.isClicked = !this.isClicked;
    if (this.count == 0) {
      this.isFirstClick = !this.isFirstClick;
      this.provider.setCountdown(this.h, this.m, this.s);
      this.mt = this.m;
    }
    this.count++;
    if (this.isClicked) {
      this.daughter = this.provider.getCountdown();
      this.subscription = Observable.interval(1000).subscribe(x => {
        this.daughter = this.provider.getCountdown();
        if (this.daughter == 'DONE') {
          this.daughter = '0';
          this.vibration.vibrate(this.num);
          this.isVibrated = true;
        }
      });
    } else {
      this.subscription.unsubscribe();
      if (this.daughter == '0') {
        this.reset();
        this.vibration.vibrate(0);
        this.isVibrated = false;
      }
    }
  }

  delete() {
    this.isClicked = false;
    this.isEntered = false;
    this.isFirstClick = true;
    this.isFirstTime = true;
    this.isVibrated = false;
    this.count = 0;
    this.enter = 0;
    this.daughter = '0';
    this.mt = '';
    this.h = '00';
    this.m = '00';
    this.s = '00';
    this.subscription.unsubscribe();
    this.provider.resetTimer();
    this.vibration.vibrate(0);
  }

  remove() {
    switch (this.enter) {
      case 1:
        this.s = '00';
        this.isEntered = false;
        this.isFirstClick = true;
        this.isFirstTime = true;
        break;
      case 2:
        this.s = '0' + this.s.slice(0, -1);
        break;
      case 3:
        this.s = this.m.substr(1) + this.s.slice(0, -1);
        this.m = '00';
        break;
      case 4:
        this.s = this.m.substr(1) + this.s.slice(0, -1);
        this.m = '0' + this.m.slice(0, -1);
        break;
      case 5:
        this.s = this.m.substr(1) + this.s.slice(0, -1);
        this.m = this.h.substr(1) + this.m.slice(0, -1);
        this.h = '00';
        break;
      case 6:
        this.s = this.m.substr(1) + this.s.slice(0, -1);
        this.m = this.h.substr(1) + this.m.slice(0, -1);
        this.h = '0' + this.h.slice(0, -1);
        break;
    }
    if (this.enter >= 0) {
      this.enter--;
    }
  }

  reset() {
    this.isClicked = false;
    this.daughter = this.provider.resetCountDown(this.h, this.mt, this.s);
    this.subscription.unsubscribe();
    let ns = parseInt(this.s) - 1;
    this.provider.setCountdown(this.h, this.mt, ns);
    this.m = this.mt;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimersPage');
  }

}
