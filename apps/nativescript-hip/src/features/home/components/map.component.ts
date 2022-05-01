import { Component, Inject } from '@angular/core';

import { BaseComponent, IInitialContext, IStoredSpots, madisonWI } from '@ioniconf/xplat/core';
import { RootLayoutParams, UIService } from '@ioniconf/xplat/nativescript/core';
import { ApplicationSettings } from '@nativescript/core';
import { IonicPortal, IonicPortalManager } from '@nativescript/ionic-portals';
import { filter, takeUntil } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'ioniconf-map',
  templateUrl: './map.component.html',
})
export class MapComponent extends BaseComponent {
  ready = false;
  portal: IonicPortal;
  private portalSubscriptions: Array<{ topic: string; ref: number }> = [];

  constructor(public uiService: UIService, @Inject(RootLayoutParams) private params: any) {
    super();
    const hipSpots = ApplicationSettings.getString('HipSpots');
    // we always show Madison, WI
    let initialContext: IInitialContext = { spots: [madisonWI] };

    if (hipSpots) {
      const storedSpots = <IStoredSpots>JSON.parse(hipSpots);
      // can't remove Madison, WI - hippest of the hip spots!
      storedSpots.spots.unshift(madisonWI);
      initialContext = storedSpots;
    }
    if (this.params?.center) {
      initialContext.center = this.params.center;
    }
    if (this.params?.zoom) {
      initialContext.zoom = this.params.zoom;
    }
    IonicPortalManager.setInitialContext('webMapPortal', initialContext);
  }

  ngOnInit() {
    this.uiService.sheetEvents
      .pipe(
        filter((event) => event.name === 'removeMarker'),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.sendPortalMessage('removeMarker', {
          markerId: data.markerId,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      });
    // simulate data load to prepare view
    setTimeout(() => {
      this.ready = true;
    }, 200);
  }

  loaded(args) {
    this.portal = <IonicPortal>args.object;
    this.portalSubscriptions.push({
      topic: 'tapMap',
      ref: IonicPortalManager.subscribeToTopic('tapMap', (result) => {
        this.uiService.sheetEvents.next({
          name: 'tapMap',
          markerId: result.data.markerId,
          latitude: result.data.latitude,
          longitude: result.data.longitude,
        });
      }),
    });
    this.portalSubscriptions.push({
      topic: 'close',
      ref: IonicPortalManager.subscribeToTopic('close', (data) => {
        this.close();
      }),
    });
  }

  close() {
    this.uiService.closeBottomSheet();
  }

  sendPortalMessage(topic: string, data?: any) {
    // let Portal know to drop a marker where we long press
    IonicPortalManager.publishTopic(topic, data);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    for (const sub of this.portalSubscriptions) {
      IonicPortalManager.unsubscribeFromTopic(sub.topic, sub.ref);
    }
  }
}
