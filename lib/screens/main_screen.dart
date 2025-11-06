import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import 'dashboard_screen.dart';
import 'chat_screen.dart';
import 'document_generator_screen.dart';
import 'risk_assessment_screen.dart';
import 'case_timeline_screen.dart';
import 'document_library_screen.dart';
import 'profile_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  String _currentScreen = 'dashboard';
  bool _isSidebarExpanded = true;

  final Map<String, String> _screenTitles = {
    'dashboard': 'Dashboard',
    'chat': 'AI Chat',
    'documents': 'Document Generator',
    'risk': 'Risk Assessment',
    'timeline': 'Case Timeline',
    'library': 'Document Library',
    'resources': 'Legal Resources',
    'notifications': 'Notifications',
    'profile': 'Profile Settings',
  };

  @override
  Widget build(BuildContext context) {
    final appState = context.watch<AppState>();
    final isDark = appState.isDarkMode;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: isDark
                ? [const Color(0xFF0F172A), const Color(0xFF312E81), const Color(0xFF581C87)]
                : [const Color(0xFFF8FAFC), const Color(0xFFEEF2FF), const Color(0xFFF5F3FF)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Row(
          children: [
            // Sidebar - Desktop only
            if (MediaQuery.of(context).size.width >= 1024)
              _buildSidebar(appState, isDark),
            
            // Main Content
            Expanded(
              child: _buildCurrentScreen(),
            ),
          ],
        ),
      ),
      
      // Bottom Navigation - Mobile only
      bottomNavigationBar: MediaQuery.of(context).size.width < 1024
          ? _buildBottomNav(isDark)
          : null,
    );
  }

  Widget _buildSidebar(AppState appState, bool isDark) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: _isSidebarExpanded ? 280 : 80,
      decoration: BoxDecoration(
        color: isDark
            ? const Color(0xFF1E293B).withOpacity(0.8)
            : Colors.white.withOpacity(0.8),
        border: Border(
          right: BorderSide(
            color: isDark
                ? const Color(0xFF334155).withOpacity(0.5)
                : const Color(0xFFE2E8F0).withOpacity(0.5),
          ),
        ),
      ),
      child: Column(
        children: [
          const SizedBox(height: 24),
          
          // Logo
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    gradient: const LinearGradient(
                      colors: [Color(0xFF6366F1), Color(0xFF9333EA), Color(0xFF7C3AED)],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF6366F1).withOpacity(0.5),
                        blurRadius: 12,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: const [
                      Icon(Icons.balance, color: Colors.white, size: 24),
                      Positioned(
                        right: 6,
                        top: 6,
                        child: Icon(Icons.auto_awesome, color: Colors.white, size: 12),
                      ),
                    ],
                  ),
                ),
                if (_isSidebarExpanded) ...[
                  const SizedBox(width: 12),
                  Expanded(
                    child: ShaderMask(
                      shaderCallback: (bounds) => const LinearGradient(
                        colors: [Color(0xFF6366F1), Color(0xFF9333EA)],
                      ).createShader(bounds),
                      child: const Text(
                        'Law Genie',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: 32),
          
          // Navigation Items
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Column(
                children: [
                  _buildNavItem(
                    icon: Icons.dashboard_outlined,
                    label: 'Dashboard',
                    screen: 'dashboard',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.chat_bubble_outline,
                    label: 'AI Chat',
                    screen: 'chat',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.description_outlined,
                    label: 'Generate Docs',
                    screen: 'documents',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.shield_outlined,
                    label: 'Risk Assessment',
                    screen: 'risk',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.calendar_today_outlined,
                    label: 'Case Timeline',
                    screen: 'timeline',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.folder_outlined,
                    label: 'Document Library',
                    screen: 'library',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.book_outlined,
                    label: 'Resources',
                    screen: 'resources',
                    isDark: isDark,
                  ),
                  _buildNavItem(
                    icon: Icons.notifications_outlined,
                    label: 'Notifications',
                    screen: 'notifications',
                    isDark: isDark,
                    badge: '3',
                  ),
                  
                  const SizedBox(height: 16),
                  if (_isSidebarExpanded)
                    Divider(
                      color: isDark
                          ? const Color(0xFF334155)
                          : const Color(0xFFE2E8F0),
                    ),
                  const SizedBox(height: 16),
                  
                  _buildNavItem(
                    icon: Icons.person_outline,
                    label: 'Profile',
                    screen: 'profile',
                    isDark: isDark,
                  ),
                ],
              ),
            ),
          ),
          
          // Dark Mode Toggle & Collapse
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                if (_isSidebarExpanded)
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isDark
                          ? const Color(0xFF0F172A)
                          : const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isDark
                            ? const Color(0xFF334155)
                            : const Color(0xFFE2E8F0),
                      ),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          isDark ? Icons.dark_mode : Icons.light_mode,
                          size: 20,
                          color: isDark
                              ? const Color(0xFF94A3B8)
                              : const Color(0xFF64748B),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            isDark ? 'Dark Mode' : 'Light Mode',
                            style: TextStyle(
                              fontSize: 14,
                              color: isDark
                                  ? const Color(0xFF94A3B8)
                                  : const Color(0xFF64748B),
                            ),
                          ),
                        ),
                        Switch(
                          value: isDark,
                          onChanged: (_) => appState.toggleDarkMode(),
                          activeColor: const Color(0xFF6366F1),
                        ),
                      ],
                    ),
                  ),
                const SizedBox(height: 12),
                
                IconButton(
                  onPressed: () {
                    setState(() => _isSidebarExpanded = !_isSidebarExpanded);
                  },
                  icon: Icon(
                    _isSidebarExpanded
                        ? Icons.keyboard_arrow_left
                        : Icons.keyboard_arrow_right,
                  ),
                  style: IconButton.styleFrom(
                    foregroundColor: isDark
                        ? const Color(0xFF94A3B8)
                        : const Color(0xFF64748B),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required String label,
    required String screen,
    required bool isDark,
    String? badge,
  }) {
    final isActive = _currentScreen == screen;

    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: InkWell(
        onTap: () => setState(() => _currentScreen = screen),
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            gradient: isActive
                ? const LinearGradient(
                    colors: [Color(0xFF6366F1), Color(0xFF9333EA)],
                  )
                : null,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              Icon(
                icon,
                size: 20,
                color: isActive
                    ? Colors.white
                    : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
              ),
              if (_isSidebarExpanded) ...[
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    label,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                      color: isActive
                          ? Colors.white
                          : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
                    ),
                  ),
                ),
                if (badge != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF43F5E),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      badge,
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBottomNav(bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: isDark
            ? const Color(0xFF1E293B).withOpacity(0.95)
            : Colors.white.withOpacity(0.95),
        border: Border(
          top: BorderSide(
            color: isDark
                ? const Color(0xFF334155).withOpacity(0.5)
                : const Color(0xFFE2E8F0).withOpacity(0.5),
          ),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildBottomNavItem(
                icon: Icons.dashboard_outlined,
                label: 'Dashboard',
                screen: 'dashboard',
                isDark: isDark,
              ),
              _buildBottomNavItem(
                icon: Icons.chat_bubble_outline,
                label: 'Chat',
                screen: 'chat',
                isDark: isDark,
              ),
              _buildBottomNavItem(
                icon: Icons.description_outlined,
                label: 'Docs',
                screen: 'documents',
                isDark: isDark,
              ),
              _buildBottomNavItem(
                icon: Icons.person_outline,
                label: 'Profile',
                screen: 'profile',
                isDark: isDark,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBottomNavItem({
    required IconData icon,
    required String label,
    required String screen,
    required bool isDark,
  }) {
    final isActive = _currentScreen == screen;

    return InkWell(
      onTap: () => setState(() => _currentScreen = screen),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          gradient: isActive
              ? const LinearGradient(
                  colors: [Color(0xFF6366F1), Color(0xFF9333EA)],
                )
              : null,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 24,
              color: isActive
                  ? Colors.white
                  : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                color: isActive
                    ? Colors.white
                    : (isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCurrentScreen() {
    switch (_currentScreen) {
      case 'dashboard':
        return DashboardScreen(
          onNavigate: (screen) => setState(() => _currentScreen = screen),
          userName: 'Alex',
        );
      case 'chat':
        return const ChatScreen();
      case 'documents':
        return const DocumentGeneratorScreen();
      case 'risk':
        return const RiskAssessmentScreen();
      case 'timeline':
        return const CaseTimelineScreen();
      case 'library':
        return const DocumentLibraryScreen();
      case 'profile':
        return const ProfileScreen();
      default:
        return Center(
          child: Text(
            'Screen: ${_screenTitles[_currentScreen] ?? _currentScreen}',
            style: const TextStyle(fontSize: 24),
          ),
        );
    }
  }
}
