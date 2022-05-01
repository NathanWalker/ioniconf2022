import { Component } from '@angular/core';

import { HeaderBaseComponent } from '@ioniconf/xplat/features';

@Component({
  selector: 'ioniconf-ion-header',
  templateUrl: 'header.component.html',
  styles: [
    `
    ion-toolbar {
      --background: transparent;
      background-image: linear-gradient(to bottom, rgb(225, 10, 10), rgba(225, 10, 10, .6));
    }
    `
  ]
})
export class HeaderComponent extends HeaderBaseComponent {}
