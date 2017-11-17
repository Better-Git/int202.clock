import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, Platform, PopoverController,
  ViewController } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { HelpArticlesPage } from '../help-articles/help-articles';
import { PopoverHelpsPage } from '../popover-helps/popover-helps';

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
  private count: number = 0;
  private isClicked: boolean = false;
  private isEmpty: boolean = true;
  @ViewChild('search') searchBar: any;
  @ViewChild(Navbar) navBar: Navbar;
  lists: any;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public popoverCtrl: PopoverController,
              public viewCtrl: ViewController) {
    this.lists = [
      { title: 'Set, cancel, or snooze alarms', number: 2840926 },
      { title: 'Use the timer & stopwatch', number: 6143309 },
      { title: 'Send feedback', number: null }
    ]
  }

  cancel() {
    this.search();
    this.count = 0;
    this.type('');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  forward(list: any) {
    if (list.number == null) {
      this.navCtrl.push(FeedbackPage);
    } else {
      this.navCtrl.push(HelpArticlesPage, {article: list});
    }
    this.viewCtrl.dismiss();
  }
  
  helpPopover(event) {
    let popover = this.popoverCtrl.create(PopoverHelpsPage, {clicked: this.isClicked});
    popover.present({ev: event});
  }

  na() {
  }

  search() {
    this.isClicked = !this.isClicked;
    setTimeout(() => {this.searchBar.setFocus()}, 1000);
  }

  type(ev: string) {
    if (ev != '' && this.count == 0) {
      this.isEmpty = !this.isEmpty;
      this.count++;
    }
    if (ev == '' && this.count == 0) {
      this.isEmpty = !this.isEmpty;
    }
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
