import { Component } from '@angular/core';
import { Platform, NavController, ViewController } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { HelpsPage } from '../helps/helps';

/**
 * Generated class for the PopoverSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover-settings',
  templateUrl: 'popover-settings.html',
})
export class PopoverSettingsPage {
  pages: any;

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public viewCtrl: ViewController) {
    this.pages = [
      { MenuPage: FeedbackPage, MenuName: 'Send feedback' },
      { MenuPage: HelpsPage, MenuName: 'Help' }
    ]
  }

  close() {
    this.viewCtrl.dismiss();
  }

  forward(page: any) {
    this.navCtrl.push(page.MenuPage);
    this.close();
  }

  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {this.close()});
    console.log('ionViewDidLoad PopoverSettingsPage');
  }
  
}
