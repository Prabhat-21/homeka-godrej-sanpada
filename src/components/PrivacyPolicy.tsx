import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const PrivacyPolicy = () => {
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
            PRIVACY POLICY & TERMS OF USE
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Homeka Club Pvt Ltd ("<strong>Homeka Club Pvt Ltd</strong>" or "<strong>We</strong>") a Real Estate marketing partner. We prioritize your privacy. Our concise Privacy Policy outlines the personal information we collect through our website, including sub-domains and microsites, the purposes of collection we may share it with, and security measures in place. It also informs you about your rights, choices, and how to contact us regarding privacy concerns. We highly recommend reading this Privacy Policy before using services and/or providing personal information.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">INTERPRETATIONS AND DEFINITIONS</h2>
            
            <p>
              "<strong>Data</strong>" shall mean personal information, including sensitive personal information and special category personal data (as defined under Data Protection Laws) about you, which we collect, receive, or otherwise process in connection with your use of our website and/or the Platform.
            </p>
            
            <p>
              "<strong>Data Protection Laws</strong>" shall mean any applicable law for the time being in force relating to the processing of Data.
            </p>
            
            <p>
              "<strong>Service Providers</strong>" includes entities which provide services to and to whom we may disclose your Data for a specific purpose pursuant to a written contract.
            </p>
            
            <p>
              "<strong>Homeka Club Pvt Ltd/We</strong>" shall mean Homeka Club Pvt Ltd, and its subsidiaries, affiliates and associate companies.
            </p>
            
            <p>
              "<strong>User or You</strong>" shall mean the natural person who accesses our website/pages or Platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">WEBSITE CONTENT OVERVIEW</h2>
            <p className="bg-blue-50 p-4 rounded-lg">
              The contents of this landing page, containing details of properties, property photos, costs, and availability, are provided for informational and illustrative purposes only. This information is subject to change at any time. Users are hereby advised that the actual properties may differ from what is shown in photos and cost on the website and pages, and as such, no claims shall be entertained based on such representations.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Uses of Developer Information</h2>
            <p>
              All images, cost descriptions, logos, and other project materials featured on this landing page are presented in accordance with the respective project developer or its licensors. We are in legal agreements and established legal relationships with the said respective developer, thereby possessing the authority to advertise, market for sale, and generate leads for the respective project.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">TYPES OF DATA COLLECTED</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">PERSONAL DATA</h3>
            <p>
              While visiting to this website, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">We may use Personal Data for the following purposes:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
              <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
              <li><strong>To provide Information related to the property's sale, purchase etc.</strong> with, special offers and general information about properties, real estate services which we offer that are similar to those that you have already purchased or enquired about.</li>
              <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">We may share Your personal information in the following situations:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our associates and any other subsidiaries, that We control or that are under common control with Us.</li>
              <li><strong>With Authorized Developers</strong>: We may disclose Your personal information with Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary.</li>
              <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">RETENTION OF YOUR PERSONAL DATA</h2>
            <p>
              We shall retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws).
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">DISCLOSURE OF YOUR PERSONAL DATA</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">USER'S CONSENT</h3>
            <p>
              By using the Website/Landing Page and/or by providing information to Us through this Website/Landing Page, the User consents to the collection and use of the information disclosed by the User on the Website in accordance with this Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">LAW ENFORCEMENT</h3>
            <p>
              Under certain circumstances, the We may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">OTHER LEGAL REQUIREMENTS</h3>
            <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with a legal obligation.</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
              <li>Protect the personal safety of Users of the Service or the public.</li>
              <li>Protect against legal liability.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">COOKIES</h2>
            <p>
              Cookies are primarily used to enhance your online experience and are not employed to track identifiable visitors' navigational habits. Statistical information, such as the domain from which you access the Internet, date and time of access, and the Internet address of the website from which you linked directly to our site, is collected in aggregate form to improve site functionality.
            </p>
            <p>
              Most internet browsers accept cookies by default, but you can adjust settings or use third-party tools to refuse or receive prompts before accepting cookies. Disabling cookies may impact the functionality of certain parts of our Services.
            </p>
            <p>
              For more information about cookies and how to manage them, visit{' '}
              <a href="https://www.aboutcookies.org" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                www.aboutcookies.org
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">SECURITY OF YOUR PERSONAL DATA</h2>
            <p>
              The security of Your Personal Data is important to Us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">CHILDREN'S PRIVACY</h2>
            <p>
              Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, we take steps to remove that information from Our servers.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">CHANGES TO THIS PRIVACY POLICY</h2>
            <p>
              We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">CONTACT US</h2>
            <p>
              To request to review, update, or delete your personal information or to otherwise reach us, please submit a request by e-mailing us at{' '}
              <a href="mailto:info@homekaclub.com" className="text-blue-600 hover:text-blue-700 underline">
                info@homekaclub.com
              </a>
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Disclaimer:</strong> The information provided on this website is intended exclusively for informational purposes and should not be construed as an offer of services. This site is managed by a real estate marketing partner namely Homeka Club Pvt Ltd. The pricing information presented on this website is subject to alteration without advance notification, and the assurance of property availability cannot be guaranteed. The images showcased on this website are for representational purposes only and may not accurately reflect the actual properties. We may share your data with Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary. Additionally, we may send updates and information to the mobile number or email address registered with us.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                For complete terms of use, please refer to our <a href="/terms-conditions" className="text-blue-600 hover:text-blue-700 underline">Terms and Conditions</a>.
              </p>
              <p className="text-sm text-gray-600">
                All rights reserved. The content, design, and information on this website are protected by copyright and other intellectual property rights. Any unauthorized use or reproduction of the content may violate applicable laws. For accurate and up-to-date information regarding services, pricing, availability, and any other details, it is recommended to contact us directly through the provided contact information on this website. Thank you for visiting our website.
              </p>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                All Rights Reserved. © 2025 Homeka Club Pvt. Ltd
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;