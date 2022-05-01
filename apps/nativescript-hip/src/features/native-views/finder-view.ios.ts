import { ContentView } from '@nativescript/core';

export class FinderView extends ContentView {
  // @ts-ignore
  get ios(): RippleView {
    return this.nativeView;
  }

  createNativeView() {
    return RippleView.alloc().initWithFrame(CGRectMake(0, 0, 300, 300));
  }

  initNativeView(): void {
    this.ios.diskRadius = 12;
    this.ios.diskColor = UIColor.colorWithRedGreenBlueAlpha(0.87, 0.74, .13, 1);
    this.ios.numberOfCircles = 5;
    this.ios.circleOffColor = UIColor.colorWithRedGreenBlueAlpha(0.96, 0.78, .02, 1);
    this.ios.circleOnColor = UIColor.redColor;
  }
}
