import { Component } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { AppService, UIService } from '@ioniconf/xplat/nativescript/core';
import { AppBaseComponent } from '@ioniconf/xplat/nativescript/features';
import { FinderView } from './features/native-views';

registerElement('FinderView', () => FinderView);

@Component({
  selector: 'ioniconf-root',
  template: `
    <RootLayout>
      <page-router-outlet></page-router-outlet>
    </RootLayout>
  `,
})
export class AppComponent extends AppBaseComponent {

  constructor(appService: AppService, private uiService: UIService) {
    super(appService);
  }
}
