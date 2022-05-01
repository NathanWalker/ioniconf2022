import { Component } from '@angular/core';

import { BaseComponent, ISpot, IStoredSpots, madisonWI } from '@ioniconf/xplat/core';
import { UIService } from '@ioniconf/xplat/nativescript/core';
import { MapComponent } from './map.component';
import { ApplicationSettings, Dialogs, isIOS, ItemEventData, ObservableArray, Page, Utils } from '@nativescript/core';
import { filter, takeUntil } from 'rxjs';
import { requestPermissions } from 'nativescript-permissions';
import { StorageKeys } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'ioniconf-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends BaseComponent {
  spots = new ObservableArray<ISpot>([madisonWI]);
  storedSpots: IStoredSpots;

  constructor(private page: Page, public uiService: UIService) {
    super();
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    const hipSpots = ApplicationSettings.getString(StorageKeys.hipSpots);
    if (hipSpots) {
      this.storedSpots = <IStoredSpots>JSON.parse(hipSpots);
      if (this.storedSpots?.spots) {
        for (const spot of this.storedSpots.spots) {
          this.spots.push(spot);
        }
      }
    }
    this.uiService.sheetEvents
      .pipe(
        filter((event) => event.name === 'tapMap'),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        // good practice to handle web/native callbacks on main thread when doing UI behavior
        // for example: showing a dialog prompt like this...
        Utils.executeOnMainThread(() => {
          // show prompt to name the hip spot
          Dialogs.prompt({
            title: 'Save Hip Spot?',
            message: 'What name should your Hip Spot be?',
            okButtonText: 'Save',
            cancelButtonText: 'Cancel',
          }).then((value) => {
            if (value?.text) {
              const newSpot: ISpot = {
                title: value.text,
                markerId: data.markerId,
                latitude: data.latitude,
                longitude: data.longitude,
              };
              if (this.storedSpots?.spots) {
                this.storedSpots.spots.push(newSpot);
              } else {
                this.storedSpots = {
                  spots: [newSpot],
                };
              }
              this.spots.push(newSpot);
              this._saveSpots();
            } else {
              // not saving marker, just remove it from map
              this.uiService.sheetEvents.next({
                name: 'removeMarker',
                markerId: data.markerId,
                latitude: data.latitude,
                longitude: data.longitude,
              });
            }
          });
        });
      });
  }

  openMap() {
    const showBottomSheet = () => {
      this.uiService.showBottomSheet(MapComponent);
    };
    if (isIOS) {
      showBottomSheet();
    } else {
      requestPermissions([android.Manifest.permission.ACCESS_COARSE_LOCATION, android.Manifest.permission.ACCESS_FINE_LOCATION, android.Manifest.permission.ACCESS_NETWORK_STATE, android.Manifest.permission.READ_EXTERNAL_STORAGE, android.Manifest.permission.WRITE_EXTERNAL_STORAGE]).then(() => {
        showBottomSheet();
      });
    }
  }

  openSpot(args: ItemEventData) {
    const selectedSpot = this.spots.getItem(args.index);
    this.uiService.showBottomSheet(MapComponent, {
      center: {
        lat: selectedSpot.latitude,
        lng: selectedSpot.longitude,
      },
      zoom: 18,
    });
  }

  removeSpot(item: ISpot) {
    Dialogs.confirm({
      title: 'No longer a Hip Portal?',
      message: `Are you sure you want to remove?`,
      okButtonText: 'Yeah, remove',
      cancelButtonText: 'Cancel',
    }).then((ok) => {
      if (ok) {
        let index = this.storedSpots.spots.findIndex((spot) => spot.markerId === item.markerId);
        if (index > -1) {
          this.storedSpots.spots.splice(index, 1);
        }
        index = this.spots.findIndex((spot) => spot.markerId === item.markerId);
        if (index > -1) {
          this.spots.splice(index, 1);
        }
        this._saveSpots();
      }
    });
  }

  private backgroundView: UIView;
  onItemLoading(args) {
    if (isIOS) {
      // args.ios.selectionStyle = UITableViewCellSelectionStyle.;
      if (!this.backgroundView) {
        const cell = <UITableViewCell>args.ios;
        this.backgroundView = UIView.alloc().initWithFrame(cell.frame);
        this.backgroundView.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(.20,.20,.20,.5);
      }
      (<UITableViewCell>args.ios).selectedBackgroundView = this.backgroundView;
    }
  }

  private _saveSpots() {
    ApplicationSettings.setString(StorageKeys.hipSpots, JSON.stringify(this.storedSpots));
  }
}
