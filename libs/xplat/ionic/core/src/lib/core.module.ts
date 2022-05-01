import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { throwIfAlreadyLoaded } from '@ioniconf/xplat/utils';
import { IoniconfCoreModule } from '@ioniconf/xplat/web/core';

@NgModule({
  imports: [IoniconfCoreModule, IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class IoniconfIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: IoniconfIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'IoniconfIonicCoreModule');
  }
}
