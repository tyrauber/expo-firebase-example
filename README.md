# expo-firebase-example

## Implementing react-native-firebase/analytics in Expo SDK 46.

This example was created after a struggle to implement react-native-firebase/analytics in an existing Expo application.

The purpose is to determine support with a variety of configurations:

 - [X] "expo": "~46.0.16"
 - [X] "expo-dev-client": "~1.3.1"
 - [X] "@react-native-firebase/analytics": "^16.2.0
 - [X] "@react-native-firebase/app": "~16.2.0"
 - [X] "@react-native-firebase/crashlytics": "^16.2.0"
 - [X] "@react-native-firebase/perf": "^16.2.0"
 - [:bomb:] Hermes

## Usage

### Setup

1) Create a Firebase Project and download the `google-services.plist` and `google-services.plist` to the root directory.
2) Rename the `ios.bundleIdentifier` and `android.package` in app.json

### Run Local

1) `yarn install`
2) `expo prebuild`
3) `expo run:ios -d` or `expo run:andoid -d`

App should build on your device. 

- [ ] You should be able to click between tabs, and screen changes you should be sent to Firebase/ Google Analytics
- [ ] You should be able to click "Crash" to crash the app, sending a crash to Crashlytics
- [ ] You should be able to throw an exception

### Build on EAS

1) `eas build -p ios --profile preview`

iOS App should build on EAS. You should be able to install the app, and do the above.

## Now break it

Add `"jsEngine": "hermes"` to eas.json.  It will still build locally and will build on EAS, but the iOS app will crash on launch. 

Adding ios.bitcode="debug" will not resolve the crash.

Note: Android works fine with hermes enabled.
