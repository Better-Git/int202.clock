import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ClockDataProvider } from '../../providers/clock-data/clock-data';

/**
 * Generated class for the ClocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-clocks',
  templateUrl: 'clocks.html',
})
export class ClocksPage {
  private subscription;
  private time: string;

  constructor(public provider: ClockDataProvider) {
    this.time = this.provider.getTime();
    this.subscription = Observable.interval(1000).subscribe(x => {
      this.time = this.provider.getTime();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClocksPage');
  }

}
