import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../theme/app_theme.dart';
import 'dashboard_screen.dart';
import 'chat_screen.dart';
import 'document_generator_screen.dart';
import 'case_timeline_screen.dart';
import 'risk_assessment_screen.dart';
import 'document_library_screen.dart';
import 'profile_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  bool _isDrawerOpen = false;
  
  final List<NavItem> _navItems = [
    NavItem(icon: Icons.dashboard, label: 'Dashboard', id: 'dashboard'),
    NavItem(icon: Icons.chat_bubble_outline, label: 'AI Chat', id: 'chat'),
    NavItem(icon: Icons.description_outlined, label: 'Documents', id: 'documents'),
    NavItem(icon: Icons.shield_outlined, label: 'Risk Check', id: 'risk'),
    NavItem(icon: Icons.calendar_today_outlined, label: 'Timeline', id: 'timeline'),
    NavItem(icon: Icons.folder_outlined, label: 'Library', id: 'library'),
    NavItem(icon: Icons.person_outline, label: 'Profile', id: 'profile'),
  ];

  Widget _getScreen(String id) {
    switch (id) {
      case 'dashboard':
        return const DashboardScreen();
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
        return const DashboardScreen();
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isLargeScreen = MediaQuery.of(context).size.width > 1024;
    
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: isDark 
            ? AppTheme.backgroundGradientDark 
            : AppTheme.backgroundGradientLight,
        ),
        child: Row(
          children: [
            // Sidebar for large screens
            if (isLargeScreen) _buildSidebar(isDark),
            
            // Main content
            Expanded(
              child: _getScreen(_navItems[_selectedIndex].id),
            ),
          ],
        ),
      ),
      
      // Bottom navigation for mobile
      bottomNavigationBar: !isLargeScreen ? _buildBottomNav(isDark) : null,
      
      // Drawer for mobile
      drawer: !isLargeScreen ? _buildDrawer(isDark) : null,
    );
  }
  
  Widget _buildSidebar(bool isDark) {
    final appState = Provider.of<AppState>(context);
    
    return Container(
      width: 280,
      decoration: BoxDecoration(
        color: isDark 
          ? Colors.black.withOpacity(0.3) 
          : Colors.white.withOpacity(0.8),
        border: Border(
          right: BorderSide(
            color: isDark 
              ? Colors.white.withOpacity(0.1) 
              : Colors.black.withOpacity(0.1),
          ),
        ),
      ),
      child: SafeArea(
        child: Column(
          children: [
            // Logo
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          gradient: AppTheme.primaryGradient,
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.primaryIndigo.withOpacity(0.5),
                              blurRadius: 20,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            const Icon(
                              Icons.balance,
                              size: 28,
                              color: Colors.white,
                            ),
                            Positioned(
                              right: 6,
                              top: 6,
                              child: Icon(
                                Icons.auto_awesome,
                                size: 14,
                                color: Colors.white.withOpacity(0.8),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ShaderMask(
                            shaderCallback: (bounds) => AppTheme.primaryGradient.createShader(bounds),
                            child: const Text(
                              'Law Genie',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Text(
                            'AI Legal Assistant',
                            style: TextStyle(
                              color: isDark ? Colors.white60 : Colors.black54,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  
                  // Pro Badge
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      gradient: AppTheme.primaryGradient,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.workspace_premium, color: Colors.white, size: 16),
                                SizedBox(width: 8),
                                Text(
                                  'Pro Plan',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: const Text(
                                'Active',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: 0.65,
                            backgroundColor: Colors.white.withOpacity(0.2),
                            valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                            minHeight: 6,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '247/500 queries used',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.9),
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            const Divider(height: 1),
            
            // Navigation Items
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: _navItems.length,
                itemBuilder: (context, index) {
                  final item = _navItems[index];
                  final isSelected = _selectedIndex == index;
                  
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () {
                          setState(() {
                            _selectedIndex = index;
                          });
                        },
                        borderRadius: BorderRadius.circular(12),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            gradient: isSelected ? AppTheme.primaryGradient : null,
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: isSelected ? [
                              BoxShadow(
                                color: AppTheme.primaryIndigo.withOpacity(0.4),
                                blurRadius: 20,
                                offset: const Offset(0, 5),
                              ),
                            ] : null,
                          ),
                          child: Row(
                            children: [
                              Icon(
                                item.icon,
                                color: isSelected 
                                  ? Colors.white 
                                  : (isDark ? Colors.white60 : Colors.black54),
                                size: 20,
                              ),
                              const SizedBox(width: 12),
                              Text(
                                item.label,
                                style: TextStyle(
                                  color: isSelected 
                                    ? Colors.white 
                                    : (isDark ? Colors.white60 : Colors.black87),
                                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            
            const Divider(height: 1),
            
            // Dark Mode Toggle
            Padding(
              padding: const EdgeInsets.all(16),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {
                    appState.toggleDarkMode();
                  },
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: isDark 
                        ? Colors.white.withOpacity(0.05) 
                        : Colors.black.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(
                              isDark ? Icons.dark_mode : Icons.light_mode,
                              color: isDark ? AppTheme.primaryPurple : AppTheme.primaryIndigo,
                              size: 20,
                            ),
                            const SizedBox(width: 12),
                            Text(
                              isDark ? 'Dark Mode' : 'Light Mode',
                              style: TextStyle(
                                color: isDark ? Colors.white70 : Colors.black87,
                              ),
                            ),
                          ],
                        ),
                        Switch(
                          value: isDark,
                          onChanged: (_) {
                            appState.toggleDarkMode();
                          },
                          activeColor: AppTheme.primaryPurple,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildBottomNav(bool isDark) {
    return Container(
      decoration: BoxDecoration(
        color: isDark 
          ? Colors.black.withOpacity(0.3) 
          : Colors.white.withOpacity(0.8),
        border: Border(
          top: BorderSide(
            color: isDark 
              ? Colors.white.withOpacity(0.1) 
              : Colors.black.withOpacity(0.1),
          ),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: _navItems.take(5).map((item) {
              final index = _navItems.indexOf(item);
              final isSelected = _selectedIndex == index;
              
              return InkWell(
                onTap: () {
                  setState(() {
                    _selectedIndex = index;
                  });
                },
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      item.icon,
                      color: isSelected 
                        ? AppTheme.primaryIndigo 
                        : (isDark ? Colors.white60 : Colors.black54),
                      size: 24,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      item.label,
                      style: TextStyle(
                        color: isSelected 
                          ? AppTheme.primaryIndigo 
                          : (isDark ? Colors.white60 : Colors.black54),
                        fontSize: 12,
                        fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
  
  Widget _buildDrawer(bool isDark) {
    return Drawer(
      child: Container(
        color: isDark ? AppTheme.bgDark : Colors.white,
        child: _buildSidebar(isDark),
      ),
    );
  }
}

class NavItem {
  final IconData icon;
  final String label;
  final String id;

  NavItem({
    required this.icon,
    required this.label,
    required this.id,
  });
}
