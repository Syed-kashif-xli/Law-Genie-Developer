import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/gradient_button.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _phoneController = TextEditingController();
  final _otpControllers = List.generate(6, (index) => TextEditingController());
  bool _showOTP = false;
  String? _selectedPlan;
  bool _acceptedTerms = false;
  
  final List<PlanData> _plans = [
    PlanData(
      id: 'free',
      name: 'Free',
      price: '\$0',
      period: '/month',
      features: ['10 AI queries/day', 'Basic document templates', 'Email support'],
      gradient: const LinearGradient(
        colors: [Color(0xFF475569), Color(0xFF1E293B)],
      ),
      popular: false,
    ),
    PlanData(
      id: 'pro',
      name: 'Pro',
      price: '\$29',
      period: '/month',
      features: ['500 AI queries/month', 'Advanced document generation', 'Priority support', 'Case timeline tracker', 'Risk assessment tools'],
      gradient: const LinearGradient(
        colors: [Color(0xFF6366F1), Color(0xFF9333EA)],
      ),
      popular: true,
    ),
    PlanData(
      id: 'enterprise',
      name: 'Enterprise',
      price: '\$99',
      period: '/month',
      features: ['Everything in Pro', 'Team collaboration', 'Admin dashboard', 'API access', 'Dedicated support', 'Custom training'],
      gradient: const LinearGradient(
        colors: [Color(0xFF7C3AED), Color(0xFF9333EA)],
      ),
      popular: false,
    ),
  ];

  @override
  void dispose() {
    _phoneController.dispose();
    for (var controller in _otpControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  void _handleContinue() {
    if (!_showOTP) {
      if (_phoneController.text.trim().isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please enter your phone number')),
        );
        return;
      }
      
      if (!_acceptedTerms) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please accept Terms and Conditions')),
        );
        return;
      }
      
      setState(() {
        _showOTP = true;
      });
    } else {
      Navigator.pushReplacementNamed(context, '/main');
    }
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
        child: SafeArea(
          child: _selectedPlan == null ? _buildPlanSelection() : _buildLoginForm(),
        ),
      ),
    );
  }
  
  Widget _buildPlanSelection() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const SizedBox(height: 40),
          
          // Title
          ShaderMask(
            shaderCallback: (bounds) => AppTheme.primaryGradient.createShader(bounds),
            child: Text(
              'Choose Your Plan',
              style: Theme.of(context).textTheme.displayMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Select the perfect plan for your legal needs',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.white70,
            ),
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 40),
          
          // Plans
          ..._plans.map((plan) => Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: _buildPlanCard(plan),
          )),
          
          const SizedBox(height: 20),
          
          // Continue Button
          if (_selectedPlan != null)
            GradientButton(
              onPressed: () {
                setState(() {
                  // Move to login form
                });
              },
              gradient: AppTheme.primaryGradient,
              child: Text(
                'Continue with ${_plans.firstWhere((p) => p.id == _selectedPlan).name}',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
    );
  }
  
  Widget _buildPlanCard(PlanData plan) {
    final isSelected = _selectedPlan == plan.id;
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedPlan = plan.id;
        });
      },
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected 
              ? AppTheme.primaryIndigo 
              : Colors.white.withOpacity(0.1),
            width: isSelected ? 2 : 1,
          ),
          boxShadow: isSelected ? [
            BoxShadow(
              color: AppTheme.primaryIndigo.withOpacity(0.3),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ] : null,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    gradient: plan.gradient,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    plan.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                if (plan.popular)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppTheme.secondaryEmerald,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'Popular',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  plan.price,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 4),
                Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Text(
                    plan.period,
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.7),
                      fontSize: 14,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ...plan.features.map((feature) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                children: [
                  Icon(
                    Icons.check_circle,
                    color: AppTheme.secondaryEmerald,
                    size: 20,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      feature,
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.9),
                        fontSize: 14,
                      ),
                    ),
                  ),
                ],
              ),
            )),
          ],
        ),
      ),
    );
  }
  
  Widget _buildLoginForm() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const SizedBox(height: 40),
          
          // Logo
          Container(
            width: 64,
            height: 64,
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
                  size: 32,
                  color: Colors.white,
                ),
                Positioned(
                  right: 6,
                  top: 6,
                  child: Icon(
                    Icons.auto_awesome,
                    size: 16,
                    color: Colors.white.withOpacity(0.8),
                  ),
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 24),
          
          Text(
            'Welcome to Law Genie',
            style: Theme.of(context).textTheme.displaySmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'Sign in to continue',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.white70,
            ),
            textAlign: TextAlign.center,
          ),
          
          const SizedBox(height: 40),
          
          // Phone Number Input
          if (!_showOTP) ...[
            Container(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white.withOpacity(0.1)),
              ),
              child: TextField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'Enter phone number',
                  hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                  prefixIcon: Icon(Icons.phone, color: Colors.white.withOpacity(0.7)),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.all(16),
                ),
              ),
            ),
          ],
          
          // OTP Input
          if (_showOTP) ...[
            Text(
              'Enter 6-digit code sent to',
              style: TextStyle(color: Colors.white.withOpacity(0.7)),
            ),
            const SizedBox(height: 8),
            Text(
              _phoneController.text,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(6, (index) {
                return SizedBox(
                  width: 48,
                  height: 56,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white.withOpacity(0.1)),
                    ),
                    child: TextField(
                      controller: _otpControllers[index],
                      keyboardType: TextInputType.number,
                      textAlign: TextAlign.center,
                      maxLength: 1,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        counterText: '',
                      ),
                      onChanged: (value) {
                        if (value.isNotEmpty && index < 5) {
                          FocusScope.of(context).nextFocus();
                        }
                      },
                    ),
                  ),
                );
              }),
            ),
          ],
          
          // Terms and Conditions Checkbox (only show when not OTP screen)
          if (!_showOTP) ...[\n            const SizedBox(height: 24),\n            _buildTermsCheckbox(),\n          ],\n          \n          const SizedBox(height: 40),
          
          // Continue Button
          GradientButton(
            onPressed: _handleContinue,
            gradient: AppTheme.primaryGradient,
            child: Text(
              _showOTP ? 'Verify & Continue' : 'Continue',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          
          const SizedBox(height: 20),
          
          // Back to plans
          if (_selectedPlan != null)
            TextButton(
              onPressed: () {
                setState(() {
                  _selectedPlan = null;
                });
              },
              child: Text(
                'Change Plan',
                style: TextStyle(
                  color: AppTheme.primaryIndigo.withOpacity(0.8),
                ),
              ),
            ),
        ],
      ),
    );
  }
  
  Widget _buildTermsCheckbox() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _acceptedTerms 
            ? AppTheme.primaryIndigo 
            : Colors.white.withOpacity(0.1),
          width: _acceptedTerms ? 2 : 1,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            onTap: () {
              setState(() {
                _acceptedTerms = !_acceptedTerms;
              });
            },
            child: Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                gradient: _acceptedTerms ? AppTheme.primaryGradient : null,
                color: _acceptedTerms ? null : Colors.white.withOpacity(0.1),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(
                  color: _acceptedTerms 
                    ? Colors.transparent 
                    : Colors.white.withOpacity(0.3),
                  width: 2,
                ),
                boxShadow: _acceptedTerms ? [
                  BoxShadow(
                    color: AppTheme.primaryIndigo.withOpacity(0.4),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ] : null,
              ),
              child: _acceptedTerms
                ? const Icon(
                    Icons.check,
                    color: Colors.white,
                    size: 16,
                  )
                : null,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: GestureDetector(
              onTap: () {
                setState(() {
                  _acceptedTerms = !_acceptedTerms;
                });
              },
              child: RichText(
                text: TextSpan(
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.9),
                    fontSize: 14,
                    height: 1.5,
                  ),
                  children: [
                    const TextSpan(
                      text: 'I accept the ',
                    ),
                    TextSpan(
                      text: 'Terms and Conditions',
                      style: TextStyle(
                        color: AppTheme.primaryIndigo,
                        fontWeight: FontWeight.w600,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                    const TextSpan(
                      text: ' and ',
                    ),
                    TextSpan(
                      text: 'Privacy Policy',
                      style: TextStyle(
                        color: AppTheme.primaryIndigo,
                        fontWeight: FontWeight.w600,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class PlanData {
  final String id;
  final String name;
  final String price;
  final String period;
  final List<String> features;
  final LinearGradient gradient;
  final bool popular;

  PlanData({
    required this.id,
    required this.name,
    required this.price,
    required this.period,
    required this.features,
    required this.gradient,
    this.popular = false,
  });
}
