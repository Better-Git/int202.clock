import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Vibration } from '@ionic-native/vibration';

import { TabsPage } from '../pages/tabs/tabs';
import { PopoverMenuPage } from '../pages/popover-menu/popover-menu';
import { AlarmsPage } from '../pages/alarms/alarms';
import { AlarmingPage } from '../pages/alarming/alarming';
import { ClocksPage } from '../pages/clocks/clocks';
import { TimersPage } from '../pages/timers/timers';
import { StopwatchesPage } from '../pages/stopwatches/stopwatches';
import { ScreenSaverPage } from '../pages/screen-saver/screen-saver';
import { FeedbackPage } from '../pages/feedback/feedback';
import { HelpsPage } from '../pages/helps/helps';
import { HelpArticlesPage } from '../pages/help-articles/help-articles';

import { ClockDataProvider } from '../providers/clock-data/clock-data';

const firebaseConfig = {
    apiKey: "AIzaSyC1TILo39dqZaWvCJIbQHG_FDm3LHOJBP4",
    authDomain: "ionic-clock.firebaseapp.com",
    databaseURL: "https://ionic-clock.firebaseio.com",
    projectId: "ionic-clock",
    storageBucket: "",
    messagingSenderId: "432317450204"
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PopoverMenuPage,
    AlarmsPage,
    AlarmingPage,
    ClocksPage,
    TimersPage,
    StopwatchesPage,
    ScreenSaverPage,
    FeedbackPage,
    HelpsPage,
    HelpArticlesPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PopoverMenuPage,
    AlarmsPage,
    AlarmingPage,
    ClocksPage,
    TimersPage,
    StopwatchesPage,
    ScreenSaverPage,
    FeedbackPage,
    HelpsPage,
    HelpArticlesPage,
  ],
  providers: [
    Vibration,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OpenNativeSettings,
    DatePicker,
    AndroidFullScreen,
    ClockDataProvider,
  ]
})

export class AppModule {}
