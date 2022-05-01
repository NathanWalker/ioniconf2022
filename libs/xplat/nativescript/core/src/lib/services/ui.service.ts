import { Injectable, Injector, ComponentRef, Type } from '@angular/core';
import { generateNativeScriptView } from '@nativescript/angular';
import { getRootLayout, View, CoreTypes, isAndroid, Utils } from '@nativescript/core';
import { Subject } from 'rxjs';
import { RootLayoutParams } from './tokens';

export const DEFAULT_ANIMATION_CURVE = CoreTypes.AnimationCurve.cubicBezier(0.17, 0.89, 0.24, 1.11);

@Injectable({
  providedIn: 'root',
})
export class UIService {
  isAndroid = isAndroid;
  sheetEvents: Subject<{ name: 'tapMap' | 'removeMarker'; markerId?: string; longitude?: number; latitude?: number; x?: number; y?: number; show?: boolean }> = new Subject();
  private _activeView: View;

  constructor(private injector: Injector) {}

  showBottomSheet(component: Type<any>, params?: any) {
    this.getView(component, params).then((v) => {
      this._activeView = v;
      this._activeView.on('closed', () => {
        // this will fire when shade cover is tapped on to close bottom sheet
        // ensure angular ref is cleaned up
        this.destroyNgRef(this._activeView);
      });
      getRootLayout()
        .open(this._activeView, {
          shadeCover: {
            color: '#000',
            opacity: 0.7,
            tapToClose: true
          },
          animation: {
            enterFrom: {
              translateY: 500,
              duration: 300,
              curve: CoreTypes.AnimationCurve.easeInOut,
            },
            exitTo: {
              translateY: 500,
              duration: 300,
              curve: CoreTypes.AnimationCurve.easeInOut,
            },
          },
        })
        .then(() => {
          console.log('opened');
        })
        .catch((err: any) => {
          console.log('error opening', err);
        });
    });
  }

  closeBottomSheet(): void {
    if (this._activeView) {
      Utils.executeOnMainThread(() => {
        getRootLayout().closeShadeCover();
        getRootLayout()
          .close(this._activeView)
          .then(() => {
            this.destroyNgRef(this._activeView);
          })
          .catch((err: any) => {
            console.log('error closing', err);
          });
      });
    }
  }

  closeAll(): void {
    getRootLayout().closeAll();
  }

  destroyNgRef(view: View) {
    if ((<any>view)?.__ngRef) {
      ((<any>view).__ngRef as ComponentRef<View>).destroy();
    }
  }

  getView(component: Type<any>, params?: any): Promise<View> {
    return new Promise((resolve) => {
      const injector = Injector.create({
        providers: [{ provide: RootLayoutParams, useValue: params }],
        parent: this.injector,
      });
      const cmpRef = generateNativeScriptView(component, {
        injector,
      });
      (<any>cmpRef.firstNativeLikeView).__ngRef = cmpRef.ref;
      resolve(cmpRef.firstNativeLikeView);
    });
  }
}
