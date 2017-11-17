import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, Platform, ViewController } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { HelpArticlesPage } from '../help-articles/help-articles';

/**
 * Generated class for the HelpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-helps',
  templateUrl: 'helps.html',
})
export class HelpsPage {
  @ViewChild(Navbar) navBar: Navbar;
  lists: any;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public viewCtrl: ViewController) {
    this.lists = [
      { title: 'Set or delete alarms', number: 2840926 },
      { title: 'Use the timer & stopwatch', number: 6143309 },
      { title: 'Send feedback', number: null }
    ];
  }

  forward(list) {
    if (list.number == null) {
      this.navCtrl.push(FeedbackPage);
    } else {
      this.navCtrl.push(HelpArticlesPage, {article: list});
    }
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.pop();
      if (this.navCtrl.canGoBack()) {this.navCtrl.pop()}
    };
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
    console.log('ionViewDidLoad HelpsPage');
  }

}
