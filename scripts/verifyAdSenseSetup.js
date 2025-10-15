#!/usr/bin/env node

/**
 * AdSense Setup Verification Script
 * Verifies that all necessary components are in place for Google AdSense approval
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class AdSenseVerifier {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.issues = [];
    this.warnings = [];
    this.passed = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      reset: '\x1b[0m'     // Reset
    };
    
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  }

  checkFile(filePath, description) {
    const fullPath = path.join(this.projectRoot, filePath);
    if (fs.existsSync(fullPath)) {
      this.passed.push(`✅ ${description} exists`);
      return true;
    } else {
      this.issues.push(`❌ ${description} missing at ${filePath}`);
      return false;
    }
  }

  checkAdsTxt() {
    this.log('Checking ads.txt configuration...', 'info');
    
    const adsTxtPath = path.join(this.projectRoot, 'public', 'ads.txt');
    if (!this.checkFile('public/ads.txt', 'ads.txt file')) {
      return;
    }

    try {
      const content = fs.readFileSync(adsTxtPath, 'utf8');
      
      // Check for required AdSense publisher ID
      if (content.includes('pub-9816094922761343')) {
        this.passed.push('✅ AdSense publisher ID found in ads.txt');
      } else {
        this.issues.push('❌ AdSense publisher ID not found in ads.txt');
      }

      // Check for proper format
      const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
      let validLines = 0;
      
      lines.forEach(line => {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length === 4 && parts[0] === 'google.com') {
          validLines++;
        }
      });

      if (validLines > 0) {
        this.passed.push(`✅ ${validLines} valid ads.txt entries found`);
      } else {
        this.issues.push('❌ No valid ads.txt entries found');
      }

    } catch (error) {
      this.issues.push(`❌ Error reading ads.txt: ${error.message}`);
    }
  }

  checkLegalPages() {
    this.log('Checking required legal pages...', 'info');
    
    const requiredPages = [
      { file: 'src/pages/PrivacyPolicyPage.tsx', name: 'Privacy Policy' },
      { file: 'src/pages/TermsOfServicePage.tsx', name: 'Terms of Service' },
      { file: 'src/pages/ContactPage.tsx', name: 'Contact Page' },
      { file: 'src/pages/AboutPage.tsx', name: 'About Page' }
    ];

    requiredPages.forEach(page => {
      this.checkFile(page.file, page.name);
    });
  }

  checkRoutes() {
    this.log('Checking route configuration...', 'info');
    
    const appTsxPath = path.join(this.projectRoot, 'src', 'App.tsx');
    if (!this.checkFile('src/App.tsx', 'App.tsx')) {
      return;
    }

    try {
      const content = fs.readFileSync(appTsxPath, 'utf8');
      
      const requiredRoutes = ['/privacy', '/terms', '/contact', '/about'];
      const requiredImports = [
        'PrivacyPolicyPage',
        'TermsOfServicePage', 
        'ContactPage',
        'AboutPage'
      ];

      requiredRoutes.forEach(route => {
        if (content.includes(`path="${route}"`)) {
          this.passed.push(`✅ Route ${route} configured`);
        } else {
          this.issues.push(`❌ Route ${route} not configured`);
        }
      });

      requiredImports.forEach(importName => {
        if (content.includes(importName)) {
          this.passed.push(`✅ ${importName} imported`);
        } else {
          this.issues.push(`❌ ${importName} not imported`);
        }
      });

    } catch (error) {
      this.issues.push(`❌ Error reading App.tsx: ${error.message}`);
    }
  }

  checkFooterLinks() {
    this.log('Checking footer links...', 'info');
    
    const footerPath = path.join(this.projectRoot, 'src', 'components', 'Footer.tsx');
    if (!this.checkFile('src/components/Footer.tsx', 'Footer component')) {
      return;
    }

    try {
      const content = fs.readFileSync(footerPath, 'utf8');
      
      const requiredLinks = [
        { href: '/privacy', text: 'Privacy Policy' },
        { href: '/terms', text: 'Terms of Service' },
        { href: '/contact', text: 'Contact Us' }
      ];

      requiredLinks.forEach(link => {
        if (content.includes(link.href)) {
          this.passed.push(`✅ Footer link to ${link.text} found`);
        } else {
          this.warnings.push(`⚠️  Footer link to ${link.text} might be missing`);
        }
      });

    } catch (error) {
      this.issues.push(`❌ Error reading Footer.tsx: ${error.message}`);
    }
  }

  checkContentQuality() {
    this.log('Checking content quality...', 'info');
    
    // Check if pages have substantial content
    const pages = [
      { file: 'src/pages/PrivacyPolicyPage.tsx', minLength: 3000 },
      { file: 'src/pages/TermsOfServicePage.tsx', minLength: 3000 },
      { file: 'src/pages/AboutPage.tsx', minLength: 2000 },
      { file: 'src/pages/ContactPage.tsx', minLength: 1500 }
    ];

    pages.forEach(page => {
      const filePath = path.join(this.projectRoot, page.file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.length >= page.minLength) {
          this.passed.push(`✅ ${path.basename(page.file)} has substantial content (${content.length} chars)`);
        } else {
          this.warnings.push(`⚠️  ${path.basename(page.file)} might need more content (${content.length} chars)`);
        }
      }
    });
  }

  checkSEOElements() {
    this.log('Checking SEO elements...', 'info');
    
    // Check if sitemap exists
    this.checkFile('public/sitemap.xml', 'Sitemap');
    this.checkFile('public/robots.txt', 'Robots.txt');
    
    // Check if pages have proper meta tags
    const pages = ['PrivacyPolicyPage', 'TermsOfServicePage', 'ContactPage', 'AboutPage'];
    pages.forEach(page => {
      const filePath = path.join(this.projectRoot, 'src', 'pages', `${page}.tsx`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('<title>') || content.includes('document.title')) {
          this.passed.push(`✅ ${page} has title tag`);
        } else {
          this.warnings.push(`⚠️  ${page} might need title tag`);
        }
      }
    });
  }

  generateReport() {
    this.log('\n=== ADSENSE SETUP VERIFICATION REPORT ===', 'info');
    
    if (this.passed.length > 0) {
      this.log('\n✅ PASSED CHECKS:', 'success');
      this.passed.forEach(item => this.log(item, 'success'));
    }

    if (this.warnings.length > 0) {
      this.log('\n⚠️  WARNINGS:', 'warning');
      this.warnings.forEach(item => this.log(item, 'warning'));
    }

    if (this.issues.length > 0) {
      this.log('\n❌ ISSUES TO FIX:', 'error');
      this.issues.forEach(item => this.log(item, 'error'));
    }

    this.log('\n=== SUMMARY ===', 'info');
    this.log(`Passed: ${this.passed.length}`, 'success');
    this.log(`Warnings: ${this.warnings.length}`, 'warning');
    this.log(`Issues: ${this.issues.length}`, 'error');

    if (this.issues.length === 0) {
      this.log('\n🎉 Your AdSense setup looks good! All critical requirements are met.', 'success');
      this.log('You can now submit your site for AdSense review.', 'success');
    } else {
      this.log('\n🔧 Please fix the issues above before submitting for AdSense review.', 'warning');
    }

    return this.issues.length === 0;
  }

  generateAdSenseChecklist() {
    this.log('\n=== ADSENSE APPROVAL CHECKLIST ===', 'info');
    
    const checklist = [
      '□ Website has substantial, original content',
      '□ Privacy Policy page is accessible and comprehensive',
      '□ Terms of Service page is clear and detailed',
      '□ Contact information is easily accessible',
      '□ About page explains website purpose and team',
      '□ ads.txt file is properly configured',
      '□ Website is fully functional with no broken links',
      '□ Content is family-friendly and follows AdSense policies',
      '□ Website has good navigation and user experience',
      '□ Site is mobile-friendly and responsive',
      '□ Website receives regular traffic',
      '□ Content is regularly updated',
      '□ No other ad networks are currently running',
      '□ Website complies with GDPR and other privacy laws'
    ];

    checklist.forEach(item => this.log(item, 'info'));
    
    this.log('\n📋 Additional Tips:', 'info');
    this.log('• Wait for consistent traffic before applying (100+ daily visitors recommended)', 'info');
    this.log('• Ensure your content is unique and valuable to users', 'info');
    this.log('• Make sure your website loads quickly on all devices', 'info');
    this.log('• Consider adding more content pages to demonstrate site value', 'info');
  }

  async run() {
    this.log('Starting AdSense setup verification...', 'info');
    
    this.checkAdsTxt();
    this.checkLegalPages();
    this.checkRoutes();
    this.checkFooterLinks();
    this.checkContentQuality();
    this.checkSEOElements();
    
    const success = this.generateReport();
    this.generateAdSenseChecklist();
    
    return success;
  }
}

// Run the verification
if (require.main === module) {
  const verifier = new AdSenseVerifier();
  verifier.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Verification failed:', error);
    process.exit(1);
  });
}

module.exports = AdSenseVerifier;
