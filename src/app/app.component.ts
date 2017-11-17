import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(androidFullScreen: AndroidFullScreen,
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        statusBar.backgroundColorByHexString("#0D1012");
      } else {
        statusBar.styleDefault();
      }
      splashScreen.hide();
    });
  }
  
}
