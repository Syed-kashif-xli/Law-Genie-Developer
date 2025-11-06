# Law Genie - AI Legal Assistant (Flutter)

Law Genie ek comprehensive premium UI/UX Flutter app hai jo AI-powered legal assistant hai with futuristic yet professional design aesthetic.

## Features

### ✨ Premium Features
- **Dual Light/Dark Modes** - Material Design 3 ke saath complete theme support
- **Premium Indigo-Purple Color Scheme** - Deep indigo, royal purple, emerald green gradients
- **Glassmorphism Effects** - Modern frosted glass UI effects
- **Smooth Animations** - Buttery smooth 60fps animations
- **Responsive Design** - Mobile, Tablet, aur Desktop support

### 🎯 Core Functionality
1. **Onboarding Slides** - Interactive 4-slide onboarding experience
2. **Enhanced Authentication** - Email/Phone login with OTP verification
3. **Subscription Tiers** - Free, Pro, and Enterprise plans
4. **Comprehensive Dashboard** - Stats cards, quick actions, events, news
5. **AI Chatbot** - Real-time chat with Law Genie AI (Legal/Simple modes)
6. **Document Generator** - 6+ professional legal document templates
7. **Risk Assessment** - AI-powered legal risk analysis
8. **Case Timeline Tracker** - Visual timeline with milestones
9. **Document Library** - Organize all legal documents
10. **Profile Management** - Complete user profile settings

## 🎨 Design System

### Color Palette
```dart
// Primary Colors
primaryIndigo: Color(0xFF6366F1)    // indigo-500
primaryPurple: Color(0xFF9333EA)    // purple-600
primaryViolet: Color(0xFF7C3AED)    // violet-600

// Secondary Colors
secondaryEmerald: Color(0xFF10B981) // emerald-500
secondaryTeal: Color(0xFF14B8A6)    // teal-500
secondaryRose: Color(0xFFF43F5E)    // rose-500
secondaryOrange: Color(0xFFF97316)  // orange-500
```

### Gradients
- **Primary Gradient**: Indigo → Purple → Violet
- **Background Light**: Slate-50 → Indigo-50 → Purple-50
- **Background Dark**: Slate-950 → Indigo-950 → Purple-950

## 📁 Project Structure

```
lib/
├── main.dart                  # App entry point
├── providers/
│   └── app_state.dart        # State management
├── screens/
│   ├── onboarding_screen.dart
│   ├── login_screen.dart
│   ├── main_screen.dart
│   ├── dashboard_screen.dart
│   ├── chat_screen.dart
│   ├── document_generator_screen.dart
│   ├── risk_assessment_screen.dart
│   ├── case_timeline_screen.dart
│   ├── document_library_screen.dart
│   └── profile_screen.dart
└── theme/
    └── app_theme.dart        # Theme configuration
```

## 🚀 Getting Started

### Prerequisites
- Flutter SDK (>=3.0.0)
- Dart SDK (>=3.0.0)
- Android Studio / VS Code with Flutter extensions

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd law_genie/flutter
```

2. **Install dependencies**
```bash
flutter pub get
```

3. **Run the app**
```bash
# For development
flutter run

# For specific device
flutter run -d <device-id>

# For release build
flutter run --release
```

### Available Commands

```bash
# Run tests
flutter test

# Build APK
flutter build apk

# Build iOS
flutter build ios

# Build Web
flutter build web

# Analyze code
flutter analyze

# Format code
dart format .
```

## 📱 Screens Overview

### 1. Onboarding Screen
- 4 interactive slides
- Feature highlights
- Skip/Next navigation
- Smooth page transitions

### 2. Login Screen
- Email/Phone tabs
- OTP verification
- Terms & Conditions checkbox
- Social login options (Google, Apple)
- Subscription plan selection

### 3. Dashboard
- Welcome greeting
- Stats cards (AI Queries, Documents, Cases)
- Quick action cards
- Upcoming events timeline
- Legal news feed

### 4. AI Chat
- Real-time messaging
- AI avatar with animations
- Legal/Simple mode toggle
- Message bubbles with gradients
- File attachment support

### 5. Document Generator
- 6 document templates
- Visual template cards
- One-click generation
- Template descriptions

### 6. Risk Assessment
- Situation description input
- AI risk analysis
- Risk level indicators
- Risk factors breakdown
- AI recommendations

### 7. Case Timeline
- Visual timeline with milestones
- Status indicators
- Date tracking
- Add new events

### 8. Document Library
- Document list with icons
- File type indicators
- Size and date info
- Quick actions menu

### 9. Profile Settings
- User profile display
- Plan badge
- Account settings
- Preferences (Dark mode, Notifications, Language)
- Logout functionality

## 🎨 Theme System

### Light Theme
- Background: Gradient (Slate-50 → Indigo-50 → Purple-50)
- Cards: White with subtle borders
- Text: Slate shades (900, 600, 400)

### Dark Theme
- Background: Gradient (Slate-950 → Indigo-950 → Purple-950)
- Cards: Slate-900 with subtle borders
- Text: White, Slate-200, Slate-400

## 🔧 State Management

App uses **Provider** for state management:
- `AppState` - Global app state (dark mode, current screen, user data)
- Reactive UI updates
- Easy state access with `context.watch<AppState>()`

## 📦 Dependencies

### Production
- `flutter` - Flutter SDK
- `provider` - State management
- `google_fonts` - Inter font family
- `intl` - Date/time formatting

### Development
- `flutter_test` - Testing framework
- `flutter_lints` - Code linting
- `flutter_launcher_icons` - App icon generation

## 🎯 Navigation

### Routes
```dart
'/onboarding'  → OnboardingScreen
'/login'       → LoginScreen
'/main'        → MainScreen (with nested screens)
```

### Nested Screens (in MainScreen)
- dashboard
- chat
- documents
- risk
- timeline
- library
- resources
- notifications
- profile

## 🌟 Best Practices

1. **Code Organization**
   - Separate screens in `/screens`
   - Reusable widgets in `/widgets`
   - State in `/providers`
   - Themes in `/theme`

2. **Naming Conventions**
   - Files: `snake_case.dart`
   - Classes: `PascalCase`
   - Variables: `camelCase`
   - Constants: `SCREAMING_SNAKE_CASE`

3. **Performance**
   - Use `const` constructors
   - Avoid rebuilds with `Consumer`
   - Lazy load heavy screens
   - Optimize images

4. **Responsive Design**
   - MediaQuery for screen sizes
   - Breakpoints: Mobile (<1024), Desktop (>=1024)
   - Flexible layouts with Row/Column
   - Adaptive navigation (Bottom nav / Sidebar)

## 🐛 Troubleshooting

### Common Issues

**Issue: Dependencies not found**
```bash
flutter pub get
flutter clean
flutter pub get
```

**Issue: Hot reload not working**
```bash
# Restart the app
flutter run
```

**Issue: Build errors**
```bash
flutter clean
flutter pub get
flutter run
```

## 📝 License

This project is proprietary and confidential.

## 👨‍💻 Development

Developed with ❤️ using Flutter

### Tech Stack
- **Framework**: Flutter 3.x
- **Language**: Dart 3.x
- **State Management**: Provider
- **Design**: Material Design 3
- **Theme**: Custom premium indigo-purple palette

### Future Enhancements
- [ ] API Integration for real AI responses
- [ ] Document PDF generation
- [ ] Push notifications
- [ ] Cloud storage integration
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Advanced analytics

## 📞 Support

For support and queries, please contact the development team.

---

**Law Genie** - Your AI Legal Partner 🧞‍♂️⚖️
