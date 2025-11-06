import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DocumentGeneratorScreen extends StatelessWidget {
  const DocumentGeneratorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        title: const Text('Document Generator'),
      ),
      body: Center(
        child: Text(
          'Document Generator Screen',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
    );
  }
}
