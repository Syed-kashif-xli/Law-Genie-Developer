import 'package:flutter/material.dart';

class DocumentGeneratorScreen extends StatefulWidget {
  const DocumentGeneratorScreen({super.key});

  @override
  State<DocumentGeneratorScreen> createState() => _DocumentGeneratorScreenState();
}

class _DocumentGeneratorScreenState extends State<DocumentGeneratorScreen> {
  String? _selectedTemplate;

  final List<DocumentTemplate> _templates = [
    DocumentTemplate(
      id: 'nda',
      name: 'Non-Disclosure Agreement',
      description: 'Protect confidential information',
      icon: Icons.lock_outline,
      color: const Color(0xFF6366F1),
    ),
    DocumentTemplate(
      id: 'contract',
      name: 'Service Contract',
      description: 'Professional services agreement',
      icon: Icons.handshake_outlined,
      color: const Color(0xFF9333EA),
    ),
    DocumentTemplate(
      id: 'employment',
      name: 'Employment Agreement',
      description: 'Hire employees with confidence',
      icon: Icons.work_outline,
      color: const Color(0xFF10B981),
    ),
    DocumentTemplate(
      id: 'lease',
      name: 'Lease Agreement',
      description: 'Property rental contracts',
      icon: Icons.home_outlined,
      color: const Color(0xFFF97316),
    ),
    DocumentTemplate(
      id: 'waiver',
      name: 'Liability Waiver',
      description: 'Release of liability forms',
      icon: Icons.verified_user_outlined,
      color: const Color(0xFFF43F5E),
    ),
    DocumentTemplate(
      id: 'invoice',
      name: 'Legal Invoice',
      description: 'Professional billing template',
      icon: Icons.receipt_long_outlined,
      color: const Color(0xFF14B8A6),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 32),
          
          // Header
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF9333EA), Color(0xFFC026D3)],
                  ),
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF9333EA).withOpacity(0.4),
                      blurRadius: 12,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.description_outlined,
                  color: Colors.white,
                  size: 32,
                ),
              ),
              const SizedBox(width: 16),
              
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Document Generator',
                      style: Theme.of(context).textTheme.displaySmall,
                    ),
                    const SizedBox(height: 4),
                    
                    Text(
                      'Create professional legal documents in seconds',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: isDark
                            ? const Color(0xFF94A3B8)
                            : const Color(0xFF64748B),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 32),
          
          // Templates Grid
          Text(
            'Select a Template',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.1,
            ),
            itemCount: _templates.length,
            itemBuilder: (context, index) {
              final template = _templates[index];
              final isSelected = _selectedTemplate == template.id;

              return InkWell(
                onTap: () => setState(() => _selectedTemplate = template.id),
                borderRadius: BorderRadius.circular(16),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: isDark
                        ? const Color(0xFF1E293B)
                        : Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: isSelected
                          ? template.color
                          : (isDark
                              ? const Color(0xFF334155)
                              : const Color(0xFFE2E8F0)),
                      width: isSelected ? 2 : 1,
                    ),
                    boxShadow: isSelected
                        ? [
                            BoxShadow(
                              color: template.color.withOpacity(0.3),
                              blurRadius: 12,
                              offset: const Offset(0, 6),
                            ),
                          ]
                        : null,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: template.color.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          template.icon,
                          color: template.color,
                          size: 32,
                        ),
                      ),
                      const SizedBox(height: 12),
                      
                      Text(
                        template.name,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      
                      Text(
                        template.description,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: isDark
                              ? const Color(0xFF94A3B8)
                              : const Color(0xFF64748B),
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 32),
          
          // Generate Button
          if (_selectedTemplate != null)
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton.icon(
                onPressed: () {
                  // Show success dialog
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Success!'),
                      content: Text(
                        'Generating ${_templates.firstWhere((t) => t.id == _selectedTemplate).name}...',
                      ),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.pop(context),
                          child: const Text('OK'),
                        ),
                      ],
                    ),
                  );
                },
                icon: const Icon(Icons.auto_awesome, size: 24),
                label: const Text(
                  'Generate Document',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: EdgeInsets.zero,
                ),
              ).shader(
                const LinearGradient(
                  colors: [Color(0xFF9333EA), Color(0xFFC026D3)],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class DocumentTemplate {
  final String id;
  final String name;
  final String description;
  final IconData icon;
  final Color color;

  DocumentTemplate({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    required this.color,
  });
}

extension GradientButton on Widget {
  Widget shader(Gradient gradient) {
    return ShaderMask(
      shaderCallback: (bounds) => gradient.createShader(bounds),
      blendMode: BlendMode.srcATop,
      child: this,
    );
  }
}
