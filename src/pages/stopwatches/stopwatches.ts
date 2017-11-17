import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';
import { ClockDataProvider } from '../../providers/clock-data/clock-data'

/**
 * Generated class for the StopwatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stopwatches',
  templateUrl: 'stopwatches.html',
})
export class StopwatchesPage {
  private subscription;
  private isClicked: boolean = false;
  private isFirstTime: boolean = true;
  private daughter: string = '0';
  private son: string = '00';
  count: number = 0;

  constructor(public platform: Platform,
              public provider: ClockDataProvider) {
    this.platform = platform;
  }

  countStartStop() {
    this.isClicked = !this.isClicked;
    if (this.count == 0) {
      this.isFirstTime = !this.isFirstTime;
    }
    this.count++;
    if (this.isClicked) {
      this.subscription = Observable.interval(9.999999999995).subscribe(x => {
        this.daughter = this.provider.getSeconds();
        this.son = this.provider.getMilliseconds();
      });
    } else {
      this.subscription.unsubscribe();
    }
  }

  reset() {
    this.isClicked = false;
    this.isFirstTime = true;
    this.count = 0;
    this.daughter = '0';
    this.son = '00';
    this.subscription.unsubscribe();
    this.provider.reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StopwatchesPage');
  }

}
