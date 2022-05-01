import { Directive, Inject } from '@angular/core';
// libs
import { BaseComponent } from '@ioniconf/xplat/core';

@Directive()
export abstract class AppBaseComponent extends BaseComponent {
  /**
   * Define common root app component behavior for all web apps here
   */
}
