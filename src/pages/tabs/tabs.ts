import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { AlarmsPage } from '../alarms/alarms';
import { ClocksPage } from '../clocks/clocks';
import { TimersPage } from '../timers/timers';
import { StopwatchesPage } from '../stopwatches/stopwatches';
import { PopoverMenuPage } from '../popover-menu/popover-menu';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AlarmsPage;
  tab2Root = ClocksPage;
  tab3Root = TimersPage;
  tab4Root = StopwatchesPage;

  constructor(public popoverCtrl: PopoverController) {
  }

  optionPopover(event) {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({ev: {target: event.btn._elementRef.nativeElement}});
  }
  
}
