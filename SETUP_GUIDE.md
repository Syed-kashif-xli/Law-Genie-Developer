# Law Genie - Flutter Setup Guide

Law Genie Flutter app ko setup karne ke liye complete step-by-step guide.

## 📋 Prerequisites

### 1. System Requirements
- **OS**: Windows 10+, macOS 10.14+, ya Linux (64-bit)
- **Disk Space**: 3GB+ free space
- **RAM**: 8GB+ recommended

### 2. Software Installation

#### Install Flutter SDK

**Windows:**
```bash
# Download Flutter SDK from https://flutter.dev/docs/get-started/install/windows
# Extract to C:\src\flutter
# Add to PATH: C:\src\flutter\bin
```

**macOS:**
```bash
# Using Homebrew
brew install flutter

# Or download manually
cd ~/development
unzip ~/Downloads/flutter_macos_3.x.x-stable.zip
export PATH="$PATH:`pwd`/flutter/bin"
```

**Linux:**
```bash
cd ~/development
tar xf ~/Downloads/flutter_linux_3.x.x-stable.tar.xz
export PATH="$PATH:`pwd`/flutter/bin"
```

#### Verify Installation
```bash
flutter doctor
```

### 3. IDE Setup

**VS Code:**
```bash
# Install extensions
- Flutter
- Dart
- Flutter Widget Snippets
```

**Android Studio:**
```bash
# Install plugins
- Flutter plugin
- Dart plugin
```

## 🚀 Project Setup

### Step 1: Clone & Navigate
```bash
cd law_genie/flutter
```

### Step 2: Install Dependencies
```bash
flutter pub get
```

### Step 3: Run Flutter Doctor
```bash
flutter doctor -v
```

Fix any issues reported by flutter doctor:
- ✅ Flutter SDK
- ✅ Android toolchain
- ✅ iOS toolchain (macOS only)
- ✅ Chrome/Edge (for web)
- ✅ Connected device

### Step 4: Check Available Devices
```bash
flutter devices
```

### Step 5: Run the App
```bash
# Development mode
flutter run

# Select specific device
flutter run -d <device-id>

# Hot reload: Press 'r'
# Hot restart: Press 'R'
# Quit: Press 'q'
```

## 📱 Platform-Specific Setup

### Android Setup

1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Install Android SDK
   - Install Android SDK Command-line Tools
   - Install Android SDK Build-Tools
   - Install Android SDK Platform-Tools

2. **Accept Licenses**
```bash
flutter doctor --android-licenses
```

3. **Create AVD (Android Virtual Device)**
   - Open Android Studio
   - Tools → AVD Manager
   - Create Virtual Device
   - Select device (Pixel 5 recommended)
   - Download system image (Android 11+ recommended)
   - Finish setup

4. **Run on Android**
```bash
flutter run -d android
```

5. **Build APK**
```bash
# Debug APK
flutter build apk --debug

# Release APK
flutter build apk --release

# APK location: build/app/outputs/flutter-apk/app-release.apk
```

### iOS Setup (macOS only)

1. **Install Xcode**
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

2. **Install CocoaPods**
```bash
sudo gem install cocoapods
```

3. **Accept Licenses**
```bash
sudo xcodebuild -license accept
```

4. **Open iOS Simulator**
```bash
open -a Simulator
```

5. **Run on iOS**
```bash
flutter run -d ios
```

6. **Build IPA**
```bash
flutter build ios --release
```

### Web Setup

1. **Enable Web Support** (if needed)
```bash
flutter config --enable-web
```

2. **Run on Web**
```bash
flutter run -d chrome
# or
flutter run -d edge
```

3. **Build for Web**
```bash
flutter build web

# Output: build/web/
```

### Desktop Setup

**Windows:**
```bash
flutter config --enable-windows-desktop
flutter run -d windows
flutter build windows
```

**macOS:**
```bash
flutter config --enable-macos-desktop
flutter run -d macos
flutter build macos
```

**Linux:**
```bash
flutter config --enable-linux-desktop
flutter run -d linux
flutter build linux
```

## 🔧 Development Workflow

### 1. Development Mode
```bash
flutter run
```

**Hot Reload** - Press `r` in terminal
- Instantly updates UI
- Preserves app state
- Works for most code changes

**Hot Restart** - Press `R` in terminal
- Restarts the app
- Loses app state
- Works for all code changes

### 2. Debugging

**VS Code:**
- Press F5 to start debugging
- Set breakpoints
- Use Debug Console
- View variables

**Android Studio:**
- Click Debug icon
- Use Flutter Inspector
- View widget tree
- Analyze performance

**DevTools:**
```bash
flutter pub global activate devtools
flutter pub global run devtools
```

### 3. Testing
```bash
# Run all tests
flutter test

# Run specific test
flutter test test/widget_test.dart

# With coverage
flutter test --coverage
```

### 4. Code Quality
```bash
# Analyze code
flutter analyze

# Format code
dart format .

# Fix lint issues
dart fix --apply
```

## 📦 Build & Release

### Android Release

1. **Generate Keystore**
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

2. **Configure Signing** (android/key.properties)
```properties
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=<path-to-keystore>
```

3. **Build Release APK**
```bash
flutter build apk --release
```

4. **Build App Bundle** (for Play Store)
```bash
flutter build appbundle --release
```

### iOS Release

1. **Open Xcode Project**
```bash
open ios/Runner.xcworkspace
```

2. **Configure Signing**
   - Select Runner in Xcode
   - Signing & Capabilities tab
   - Select your team
   - Configure bundle identifier

3. **Build for Release**
```bash
flutter build ios --release
```

4. **Archive in Xcode**
   - Product → Archive
   - Upload to App Store Connect

## 🎨 Customization

### Change App Name
```yaml
# pubspec.yaml
name: your_app_name
```

### Change App Icon
1. Replace `assets/icon/icon.png` with your icon (1024x1024)
2. Run:
```bash
flutter pub run flutter_launcher_icons:main
```

### Change Package Name

**Android:**
- Edit `android/app/build.gradle`
- Update `applicationId`

**iOS:**
- Open Xcode
- Update Bundle Identifier

### Add Custom Fonts
```yaml
# pubspec.yaml
flutter:
  fonts:
    - family: CustomFont
      fonts:
        - asset: assets/fonts/CustomFont-Regular.ttf
        - asset: assets/fonts/CustomFont-Bold.ttf
          weight: 700
```

## 🐛 Common Issues & Solutions

### Issue 1: "pub get failed"
```bash
flutter clean
rm -rf .dart_tool/
flutter pub get
```

### Issue 2: "Gradle build failed" (Android)
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter run
```

### Issue 3: "CocoaPods not installed" (iOS)
```bash
sudo gem install cocoapods
cd ios
pod install
cd ..
flutter run
```

### Issue 4: "Hot reload not working"
- Save the file (Ctrl+S / Cmd+S)
- Check console for errors
- Try hot restart (R)
- Restart the app

### Issue 5: "Device not found"
```bash
# Check connected devices
flutter devices

# For Android emulator
emulator -avd <avd-name>

# For iOS simulator
open -a Simulator
```

### Issue 6: "Build number conflict"
```yaml
# pubspec.yaml - Increment version
version: 1.0.1+2  # version+build_number
```

## 📊 Performance Optimization

### 1. Enable Dart VM optimizations
```bash
flutter run --profile
flutter run --release
```

### 2. Analyze Performance
```bash
flutter run --profile
# Then open DevTools for performance analysis
```

### 3. Reduce APK Size
```bash
# Enable shrinking and obfuscation
flutter build apk --release --shrink --obfuscate

# Split per ABI
flutter build apk --release --split-per-abi
```

### 4. Optimize Images
- Use WebP format
- Compress images
- Use appropriate resolutions
- Lazy load images

## 🔐 Security Best Practices

1. **Never commit sensitive data**
   - API keys
   - Passwords
   - Certificates

2. **Use environment variables**
```dart
const apiKey = String.fromEnvironment('API_KEY');
```

3. **Enable obfuscation for release**
```bash
flutter build apk --release --obfuscate
```

4. **Validate user input**
5. **Use HTTPS only**
6. **Implement proper authentication**

## 📱 Testing on Real Devices

### Android
1. Enable Developer Options on device
2. Enable USB Debugging
3. Connect via USB
4. Run `flutter devices`
5. Run `flutter run`

### iOS
1. Connect iPhone/iPad via USB
2. Trust computer on device
3. Select device in Xcode
4. Run app from Xcode or VS Code

## 🌐 Resources

- **Official Docs**: https://flutter.dev/docs
- **Pub.dev**: https://pub.dev
- **Flutter Community**: https://flutter.dev/community
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/flutter
- **GitHub**: https://github.com/flutter/flutter

## ✅ Checklist

Before releasing:
- [ ] Tested on multiple devices
- [ ] Tested both light and dark modes
- [ ] No console errors or warnings
- [ ] All features working
- [ ] Performance optimized
- [ ] App icon updated
- [ ] App name configured
- [ ] Splash screen ready
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] Analytics configured
- [ ] Crash reporting setup

---

Happy Coding! 🎉🚀

**Law Genie Development Team**
