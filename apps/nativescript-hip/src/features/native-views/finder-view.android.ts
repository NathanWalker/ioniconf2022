import { GridLayout, Image } from '@nativescript/core';
declare var com;

export class FinderView extends GridLayout {
  onLoaded(): void {
    super.onLoaded();
    const img2 = new Image();
    img2.src = 'res://ic_radar';
    this.addChild(img2);
    img2.animate({
      rotate: 360,
      duration: 3000,
      iterations: Number.POSITIVE_INFINITY,
    });
    const radarview = new com.tristate.radarview.RadarViewC(this._context);
    const container = new android.widget.LinearLayout(this._context);
    const text = new android.widget.TextView(this._context);
    text.setText('🔴');
    text.setTextSize(20);
    const text2 = new android.widget.TextView(this._context);
    text2.setText('🔴');
    text2.setTextSize(20);

    const mDataSet = new java.util.ArrayList();
    mDataSet.add(new com.tristate.radarview.ObjectModel(23.069213, 72.518889, 100, text));
    mDataSet.add(new com.tristate.radarview.ObjectModel(23.069213, 72.520989, 100, text2));
    const latLongCs = new com.tristate.radarview.LatLongCs(23.070301, 72.517406);
    radarview.setupData(250, mDataSet, latLongCs, container);
    this.nativeView.addView(radarview);
  }
}
