import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '@ioniconf/xplat/core';
import { GoogleMap } from '@capacitor/google-maps';
import Portals from '@ionic/portals';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      capacitor-google-map {
        display: inline-block;
        width: 100%;
        height: 100%;
        --background: transparent;
        background-image: linear-gradient(to top,  rgba(225, 10, 10, .6), rgb(225, 10, 10));
      }
    `,
  ],
})
export class HomeComponent extends BaseComponent {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  ngAfterViewInit() {
    setTimeout(() => {
      this.createMap();
    }, 300);
  }

  createMap() {
    Portals.getInitialContext<{
      spots: Array<{ latitude: number; longitude: number }>;
    }>()
      .then(this.setupContext.bind(this))
      .catch(() => {
        this.setupContext();
      });
  }

  async setupContext(context?: any) {
    console.log('portal context:', context);
    this.newMap = await GoogleMap.create({
      id: 'the-map',
      element: this.mapRef.nativeElement,
      apiKey: Capacitor.getPlatform() === 'android' ? '<android-google-maps-key>' : '<ios-google-maps-key>',
      config: {
        center: context?.value?.center || {
          lat: 43.07427,
          lng: -89.38101,
        },
        zoom: context?.value?.zoom || 14,
      },
    });

    if (context?.value?.spots) {
      for (const spot of context.value.spots) {
        this.newMap.addMarker({
          coordinate: {
            lat: spot.latitude,
            lng: spot.longitude,
          },
        });
      }
    }

    Portals.subscribe({ topic: 'removeMarker' }, async (result) => {
      if (result?.data && this.newMap) {
        const data = <{ markerId: string }>result.data;
        this.newMap.removeMarker(data.markerId);
      }
    });

    this.newMap.setOnMapClickListener((event) => {
      const coordinate = {
        lat: event.latitude,
        lng: event.longitude,
      };
      this.newMap
        .addMarker({
          coordinate,
        })
        .then((id) => {
          // console.log('added marker id:', id);
          Portals.publish({
            topic: 'tapMap',
            data: {
              markerId: id,
              latitude: event.latitude,
              longitude: event.longitude,
            },
          });
        });
    });
  }

  close() {
    Portals.publish({
      topic: 'close',
      data: {},
    });
  }
}
