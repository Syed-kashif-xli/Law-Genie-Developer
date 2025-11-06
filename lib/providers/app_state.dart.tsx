import 'package:flutter/material.dart';

class AppState extends ChangeNotifier {
  bool _isDarkMode = false;
  String _currentScreen = 'dashboard';
  String _userName = 'Alex';
  String _userPlan = 'Pro';
  
  bool get isDarkMode => _isDarkMode;
  String get currentScreen => _currentScreen;
  String get userName => _userName;
  String get userPlan => _userPlan;
  
  void toggleDarkMode() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }
  
  void setScreen(String screen) {
    _currentScreen = screen;
    notifyListeners();
  }
  
  void setUserName(String name) {
    _userName = name;
    notifyListeners();
  }
  
  void setUserPlan(String plan) {
    _userPlan = plan;
    notifyListeners();
  }
}
