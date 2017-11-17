import { Component } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { TabsPage } from '../tabs/tabs';
import { PopoverSettingsPage } from '../popover-settings/popover-settings';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  days: string[] = ['Sunday','Friday','Saturday','Monday'];
  ints: number[] = [5,10,15,20,25];
  nums: number[] = [];
  secs: number[] = [];

  constructor(public navCtrl: NavController,
              public openNativeSettings: OpenNativeSettings,
              public platform: Platform, 
              public popoverCtrl: PopoverController) {
    for (var i = 2; i < 31; i++) {
      this.nums.push(i);
    }
    for (var i = 5; i <= 60; i++) {
      if (i % 5 == 0) {
        this.secs.push(i);
      }
    }
  }

  openDate(){
    this.openNativeSettings.open('date');
  }

  settingPopover(event) {
    let popover = this.popoverCtrl.create(PopoverSettingsPage);
    popover.present({ev: event});
  }

  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
    console.log('ionViewDidLoad SettingsPage');
  }

}
