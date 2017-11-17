import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the HelpArticlesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-articles',
  templateUrl: 'help-articles.html',
})
export class HelpArticlesPage {
  @ViewChild(Navbar) navBar: Navbar;
  lists: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform) {
    this.lists = this.navParams.get('article');
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (ev: UIEvent) => {
      this.navCtrl.pop();
      if (this.navCtrl.canGoBack()) {this.navCtrl.pop()}
    };
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
    console.log('ionViewDidLoad HelpArticlesPage');
  }

}
