import { Component } from '@angular/core';
import { Platform, NavController, ViewController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ScreenSaverPage } from '../screen-saver/screen-saver';
import { FeedbackPage } from '../feedback/feedback';
import { HelpsPage } from '../helps/helps';

/**
 * Generated class for the PopoverMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover-menu',
  templateUrl: 'popover-menu.html',
})
export class PopoverMenuPage {
  pages: any;

  constructor(public navCtrl: NavController,
              public openNativeSettings: OpenNativeSettings,
              public platform: Platform,
              public viewCtrl: ViewController) {
    this.pages = [
      { MenuPage: ScreenSaverPage, MenuName: 'Screen saver' },
      { MenuPage: null, MenuName: 'Settings' },
      { MenuPage: FeedbackPage, MenuName: 'Send feedback' },
      { MenuPage: HelpsPage, MenuName: 'Help' }
    ];
  }

  close() {
    this.viewCtrl.dismiss();
  }

  forward(page) {
    if (page.MenuName == 'Settings') {
      this.openNativeSettings.open('date');
    } else {
  	  this.navCtrl.push(page.MenuPage);
    }
    this.close();
  }
  
  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {this.close()});
    console.log('ionViewDidLoad PopoverMenuPage');
  }
  
}
