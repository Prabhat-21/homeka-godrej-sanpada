import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <img src="/img/comman/homeka_logo.jpg" alt="Homeka Club Pvt Ltd Logo" className="h-20 w-auto" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            TERMS AND CONDITIONS
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Welcome to the Godrej Sanpada operated by Homeka Club Pvt Ltd ("<strong>Homeka Club Pvt Ltd</strong>", "<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>"). These Terms and Conditions ("<strong>Terms</strong>") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. ACCEPTANCE OF TERMS</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. DEFINITIONS</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Company"</strong> (referred to either as "the Company", "we", "us" or "our") refers to Homeka Club Pvt. Ltd.</li>
              <li><strong>"Company"</strong> (referred to either as "the Company", "we", "us" or "our") refers to Homeka Club Pvt Ltd.</li>
              <li><strong>"You"</strong> refers to the individual accessing or using the website.</li>
              <li><strong>"Service"</strong> refers to the website and all related services provided by the Company.</li>
              <li><strong>"Content"</strong> refers to all information, text, graphics, images, and other materials on the website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. USE OF WEBSITE</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Permitted Use</h3>
            <p>You may use our website for lawful purposes only. You agree to use the website in accordance with these Terms and all applicable laws and regulations.</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Prohibited Activities</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Collect or harvest personal information of other users</li>
              <li>Use automated systems to access the website without permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. PROPERTY INFORMATION</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Information Accuracy</h3>
            <p className="bg-yellow-50 p-4 rounded-lg">
              All property information, including but not limited to prices, availability, specifications, images, and amenities, is provided for informational purposes only. While we strive to ensure accuracy, this information is subject to change without notice and may not reflect the current status of the property.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 No Guarantee</h3>
            <p>
              We do not guarantee the accuracy, completeness, or timeliness of any information on this website. Property details, pricing, and availability are subject to change and should be verified directly with the developer or authorized sales representatives.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3 Developer Authorization</h3>
            <p>
              We are authorized marketing partners for Godrej Sanpada and have the necessary permissions to advertise and generate leads for this project. All developer materials, logos, and project information are used with proper authorization.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. USER REGISTRATION AND ACCOUNTS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.1 Registration Information</h3>
            <p>
              When you register or provide information through our website, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of any account credentials.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.2 Communication Consent</h3>
            <p>
              By providing your contact information, you consent to receive communications from us and our authorized partners regarding property information, offers, and related services through phone calls, SMS, email, or WhatsApp, even if your number is registered on DNC/NDNC lists.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. INTELLECTUAL PROPERTY RIGHTS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.1 Website Content</h3>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of Homeka Real Estate Solutions or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.2 Developer Content</h3>
            <p>
              Project-specific content, including Godrej Sanpada branding, logos, images, and materials, are the property of Godrej Properties and are used with proper authorization for marketing purposes.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.3 Usage Restrictions</h3>
            <p>
              You may not reproduce, distribute, modify, or create derivative works of any content from this website without express written permission from the respective copyright holders.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. PRIVACY AND DATA PROTECTION</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our website, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. DISCLAIMERS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.1 Website Availability</h3>
            <p>
              We strive to ensure that our website is available 24/7, but we do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, technical issues, or other factors beyond our control.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.2 Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. Your use of third-party websites is at your own risk.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">8.3 "AS IS" BASIS</h3>
            <p className="bg-red-50 p-4 rounded-lg">
              <strong>THE WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES PROVIDED ON OR THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. LIMITATION OF LIABILITY</h2>
            <p className="bg-red-50 p-4 rounded-lg">
              <strong>TO THE FULLEST EXTENT PERMITTED BY LAW, HOMEKA CLUB PVT. LTD SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE WEBSITE OR SERVICES.</strong>
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. INDEMNIFICATION</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Homeka Club Pvt. Ltd and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of the website or violation of these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. REAL ESTATE SPECIFIC TERMS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.1 No Binding Commitment</h3>
            <p>
              Information provided on this website does not constitute a binding offer or commitment to sell. All property transactions are subject to separate purchase agreements and terms as determined by the developer.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.2 RERA Compliance</h3>
            <p>
              This project is registered under the Real Estate Regulatory Authority (RERA). All applicable RERA regulations and guidelines apply to any property transactions. Project RERA registration details are available on the Maharashtra RERA website.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.3 Site Visits</h3>
            <p>
              Site visits are arranged for informational purposes only. We recommend that prospective buyers conduct their own due diligence and inspection of the property before making any purchase decisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">12. MODIFICATIONS TO TERMS</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">13. TERMINATION</h2>
            <p>
              We may terminate or suspend your access to the website immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">14. GOVERNING LAW</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">15. SEVERABILITY</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">16. CONTACT INFORMATION</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p><strong>Homeka Club Pvt Ltd</strong></p>
              <p>Email: <a href="mailto:info@homekaclub.com" className="text-blue-600 hover:text-blue-700 underline">info@homekaclub.com</a></p>
              <p>Phone: <a href="tel:+917304238433" className="text-blue-600 hover:text-blue-700 underline">+91 73042 38433</a></p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">17. EFFECTIVE DATE</h2>
            <p>
              These Terms and Conditions are effective as of January 1, 2025, and will remain in effect until modified or terminated.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Important Notice:</strong> By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.
              </p>
              <p className="text-sm text-gray-600">
                These Terms and Conditions, together with our Privacy Policy, constitute the entire agreement between you and Homeka Club Pvt Ltd regarding your use of the website.
              </p>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last Updated: January 1, 2025 | © 2025 Homeka Club Pvt Ltd - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;