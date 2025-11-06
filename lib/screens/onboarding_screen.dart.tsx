import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import '../theme/app_theme.dart';
import '../widgets/gradient_button.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> with TickerProviderStateMixin {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  
  final List<OnboardingSlide> _slides = [
    OnboardingSlide(
      icon: Icons.chat_bubble_outline,
      title: 'Chat with Law Genie',
      description: 'Get instant AI-powered legal advice and answers to your questions 24/7',
      gradient: const LinearGradient(
        colors: [Color(0xFF6366F1), Color(0xFF9333EA), Color(0xFF7C3AED)],
      ),
    ),
    OnboardingSlide(
      icon: Icons.description_outlined,
      title: 'Generate Legal Docs in Seconds',
      description: 'Create professional contracts, NDAs, and legal documents with AI assistance',
      gradient: const LinearGradient(
        colors: [Color(0xFF9333EA), Color(0xFFD946EF), Color(0xFFEC4899)],
      ),
    ),
    OnboardingSlide(
      icon: Icons.shield_outlined,
      title: 'Assess Legal Risks Instantly',
      description: 'Analyze potential legal risks and get AI-powered recommendations',
      gradient: const LinearGradient(
        colors: [Color(0xFFF43F5E), Color(0xFFF97316), Color(0xFFEF4444)],
      ),
    ),
    OnboardingSlide(
      icon: Icons.calendar_today_outlined,
      title: 'Track Your Case Timeline',
      description: 'Manage deadlines, hearings, and case milestones all in one place',
      gradient: const LinearGradient(
        colors: [Color(0xFF10B981), Color(0xFF14B8A6), Color(0xFF06B6D4)],
      ),
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: isDark 
            ? AppTheme.backgroundGradientDark 
            : AppTheme.backgroundGradientLight,
        ),
        child: Stack(
          children: [
            // Animated Background Elements
            _buildAnimatedBackground(),
            
            // Content
            SafeArea(
              child: Column(
                children: [
                  // Logo and Title
                  _buildHeader(),
                  
                  const SizedBox(height: 40),
                  
                  // Slides
                  Expanded(
                    child: PageView.builder(
                      controller: _pageController,
                      onPageChanged: (index) {
                        setState(() {
                          _currentPage = index;
                        });
                      },
                      itemCount: _slides.length,
                      itemBuilder: (context, index) {
                        return _buildSlide(_slides[index]);
                      },
                    ),
                  ),
                  
                  const SizedBox(height: 20),
                  
                  // Page Indicator
                  _buildPageIndicator(),
                  
                  const SizedBox(height: 30),
                  
                  // Next/Get Started Button
                  _buildActionButton(),
                  
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildAnimatedBackground() {
    return Stack(
      children: [
        Positioned(
          top: 80,
          left: 80,
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  AppTheme.primaryIndigo.withOpacity(0.2),
                  Colors.transparent,
                ],
              ),
            ),
          ),
        ),
        Positioned(
          bottom: 80,
          right: 80,
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(
                colors: [
                  AppTheme.primaryPurple.withOpacity(0.2),
                  Colors.transparent,
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
  
  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
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
                  size: 40,
                  color: Colors.white,
                ),
                Positioned(
                  right: 8,
                  top: 8,
                  child: Icon(
                    Icons.auto_awesome,
                    size: 20,
                    color: Colors.white.withOpacity(0.8),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          ShaderMask(
            shaderCallback: (bounds) => AppTheme.primaryGradient.createShader(bounds),
            child: Text(
              'Law Genie',
              style: Theme.of(context).textTheme.displayMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Your AI Legal Partner',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white70,
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildSlide(OnboardingSlide slide) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(30),
              gradient: slide.gradient,
              boxShadow: [
                BoxShadow(
                  color: slide.gradient.colors.first.withOpacity(0.4),
                  blurRadius: 30,
                  offset: const Offset(0, 15),
                ),
              ],
            ),
            child: Icon(
              slide.icon,
              size: 60,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 40),
          Text(
            slide.title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.displaySmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 20),
          Text(
            slide.description,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.white70,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildPageIndicator() {
    return SmoothPageIndicator(
      controller: _pageController,
      count: _slides.length,
      effect: ExpandingDotsEffect(
        activeDotColor: AppTheme.primaryIndigo,
        dotColor: Colors.white.withOpacity(0.3),
        dotHeight: 8,
        dotWidth: 8,
        expansionFactor: 4,
      ),
    );
  }
  
  Widget _buildActionButton() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 40),
      child: GradientButton(
        onPressed: () {
          if (_currentPage == _slides.length - 1) {
            Navigator.pushReplacementNamed(context, '/login');
          } else {
            _pageController.nextPage(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
            );
          }
        },
        gradient: AppTheme.primaryGradient,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              _currentPage == _slides.length - 1 ? 'Get Started' : 'Next',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
            if (_currentPage != _slides.length - 1) ...[
              const SizedBox(width: 8),
              const Icon(
                Icons.arrow_forward,
                color: Colors.white,
                size: 20,
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class OnboardingSlide {
  final IconData icon;
  final String title;
  final String description;
  final LinearGradient gradient;

  OnboardingSlide({
    required this.icon,
    required this.title,
    required this.description,
    required this.gradient,
  });
}
