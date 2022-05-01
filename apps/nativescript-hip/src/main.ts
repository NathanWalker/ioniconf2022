import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { Application } from '@nativescript/core';
import { IonicPortalManager } from '@nativescript/ionic-portals';
import { enableProdMode } from '@angular/core';
import { environment } from '@ioniconf/xplat/core';
import { AppModule } from './app.module';

if (environment.production) {
  enableProdMode();
}

Application.on(Application.launchEvent, () => {
  // Register IonicPortals
  IonicPortalManager.register('<portal-api-key>');
});

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
