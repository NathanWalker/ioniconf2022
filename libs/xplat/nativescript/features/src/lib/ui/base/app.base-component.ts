import { Directive } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { BaseComponent } from '@ioniconf/xplat/core';
import { AppService } from '@ioniconf/xplat/nativescript/core';
import { IonicPortal } from '@nativescript/ionic-portals'
registerElement('IonicPortal', () => IonicPortal);

@Directive()
export abstract class AppBaseComponent extends BaseComponent {
  constructor(protected appService: AppService) {
    super();
  }
}
