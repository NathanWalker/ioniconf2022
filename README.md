# Ioniconf 2022 ~ Opening doors with Portals

This repo demonstrates a diverse development combining different language skills from different engineering departments to deliver app features on time by utilizing the best of all a diverse team has to offer without sacrificing or recreating their work.

The resulting app deployment consists of a iOS/Android app, `HipPortals`, consuming:

* Swift work done by an iOS team
* Java work done by an Android team
* [@capacitor/google-maps](https://capacitorjs.com/docs/apis/google-maps) work done by a web team by utilizing [Portals](https://ionic.io/portals) via [@nativescript/ionic-portals](https://docs.nativescript.org/plugins/ionic-portals.html)

## Run the app

Prerequisites:
* node 16+, npm 7+
* [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* [nativescript](https://www.npmjs.com/package/nativescript) 8.2+
* To use the Google Maps SDK on any platform, API keys associated with an account with billing enabled are required. These can be obtained from the [Google Cloud Console](https://console.cloud.google.com/). This is required for all three platforms, Android, iOS, and JavaScript. Additional information about obtaining these API keys can be found in the [Google Maps documentation](https://developers.google.com/maps/documentation/android-sdk/overview) for each platform.
* Find/replace `<ios-google-maps-key>` with your own.
* Find/replace `<android-google-maps-key>` with your own.
* Must be run on an actual physical device for iOS if using Mac M1 (due to Google Maps ommission of arm64 sim binaries)
* Find/replace `<portal-api-key>` with your own, [can get on here](https://ionic.io/portals).

1. Install workspace dependencies
```
yarn
```

2. Build Ionic Portal for use:
```
// ios:
yarn nx run ionic-map:build:ios

// android:
yarn nx run ionic-map:build:android
```

3. Run NativeScript app:
```
// ios:
yarn nx run nativescript-hip:ios

// android:
yarn nx run nativescript-hip:android
```

## Notes

Development made efficient by [Nx workspace](https://nx.dev).

Technologies used:

* [Ionic](https://ionic.io/)
* [Capacitor](https://capacitorjs.com/)
* [Portals](https://ionic.io/portals)
* [NativeScript](https://nativescript.org)
* [Swift](https://developer.apple.com/swift/)
* [Java](https://dev.java/)
* [Angular](https://angular.io/)

Plugins used:

* [@capacitor/google-maps](https://capacitorjs.com/docs/apis/google-maps)
* [@nativescript/ionic-portals](https://docs.nativescript.org/plugins/ionic-portals.html)

Credits:

* [Swift HamzaGhazouani/HGRippleRadarView](https://github.com/HamzaGhazouani/HGRippleRadarView)
* [Java TristateAndroidTeam/radarview](https://github.com/TristateAndroidTeam/radarview)

Created by Nathan Walker of [nStudio](https://nstudio.io) for [Ioniconf 2022](https://ionic.io/ioniconf).