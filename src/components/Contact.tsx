import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User } from 'lucide-react';
import { customerService } from '../lib/supabase';
import { cleanPhoneNumber, formatPhoneDisplay, validatePhoneNumber, validatePhoneOnSubmit } from '../phone_validation';

const Contact = () => {
  // Form state management (for mobile only)
  const formDataRef = React.useRef({
    name: '',
    phone: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const nameInputRef = React.useRef(null);
  const phoneInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    
    const currentName = formDataRef.current.name;
    const currentPhone = formDataRef.current.phone;
    
    if (!currentName.trim() || !currentPhone.trim()) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    const phoneValidationError = validatePhoneOnSubmit(currentPhone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setPhoneError('');

    try {
      const existingCustomer = await customerService.getCustomerByPhone(currentPhone);
      
      if (existingCustomer) {
        await customerService.updateCustomer(existingCustomer.id, {
          name: currentName,
          source: 'contact_form',
          interest_type: 'site_visit',
          notes: 'Requested site visit from contact form'
        });
        setSubmitMessage('Thank you! We have updated your information and will contact you soon.');
      } else {
        await customerService.createCustomer({
          name: currentName,
          phone: currentPhone,
          source: 'contact_form',
          interest_type: 'site_visit',
          notes: 'Requested site visit from contact form'
        });
        setSubmitMessage('Thank you for your request! Redirecting...');
      }

      formDataRef.current = { name: '', phone: '', email: '' };
      if (nameInputRef.current) nameInputRef.current.value = '';
      if (phoneInputRef.current) phoneInputRef.current.value = '';
      if (emailInputRef.current) emailInputRef.current.value = '';

      localStorage.setItem('hasSubmittedForm', 'true');

      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 10);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Sorry, there was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const displayValue = formatPhoneDisplay(value);
      const cleanedPhone = cleanPhoneNumber(value);
      
      e.target.value = displayValue;
      
      formDataRef.current = {
        ...formDataRef.current,
        [name]: cleanedPhone
      };
      
      const error = validatePhoneNumber(value);
      setPhoneError(error);
    } else {
      formDataRef.current = {
        ...formDataRef.current,
        [name]: value
      };
    }
  }, []);

  return (
    <section id="contact" className="py-12 lg:py-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pb-20 lg:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl lg:max-w-6xl mx-auto">
          
          {/* Mobile Layout - With Form */}
          <div className="lg:hidden">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src="/img/1.jpg"
                    alt="L&T West Square Project View"
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </div>
                
                <div className="p-4 md:p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Schedule a Site Visit</h2>
                
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative mobile-input-container">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Name here..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        style={{ fontSize: '16px' }}
                      />
                    </div>

                    <div className="relative mobile-input-container">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Phone Number here..."
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-base ${
                          phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        style={{ fontSize: '16px' }}
                      />
                    </div>

                    {phoneError && (
                      <div className="text-red-600 text-sm mt-1 bg-red-50 px-3 py-2 rounded border border-red-200">
                        {phoneError}
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        checked={true}
                        readOnly
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="consent" className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                      </label>
                    </div>

                    {submitMessage && (
                      <div className={`text-sm p-3 rounded-lg ${
                        submitMessage.includes('error') || submitMessage.includes('Sorry') 
                          ? 'bg-red-50 text-red-700 border border-red-200' 
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors text-base"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Compact RERA Section Only */}
          <div className="hidden lg:block">
            {/* Compact Developer Branding Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center space-x-6 mb-3">
                <img src="/img/comman/logo.svg" alt="L&T Realty Logo" className="h-12 w-auto" />
              </div>

              <p className="text-gray-600 text-sm mb-3 text-center">This project is RERA registered.</p>

              <div className="text-xs text-gray-600 mb-4 text-center">
                <p>
                  Project MAHARERA : PHASE 1 - P51700020275 | JASPER - P51700045793 | OPAL - P51700045794 | AMBER - P51700045795 | NORTH TOWERS - P51700026653 | West Square - P51700056254
                </p>
              </div>

              <div className="grid grid-cols-5 gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="bg-gray-200 w-16 h-16 mx-auto rounded-lg flex items-center justify-center">
                    <img src="/img/qr.webp" alt={`QR Code ${index}`} className="w-14 h-14" />
                  </div>
                ))}
              </div>

              <div className="text-xs text-gray-500 text-center mb-3">
                <p>
                  Disclaimer: Information for reference only. Prices and availability subject to change. Images are illustrative. Authorized marketing by Homeka Club Pvt Ltd.
                </p>
              </div>

              <div className="text-center">
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline text-xs mr-3">
                  Privacy Policy
                </a>
                <span className="text-gray-400">|</span>
                <a href="/terms-conditions" className="text-blue-600 hover:text-blue-700 underline text-xs ml-3">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>

          {/* Mobile RERA Section */}
          <div className="lg:hidden mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
                <img src="/img/comman/logo.svg" alt="L&T Realty Logo" className="h-12 w-auto" />
              </div>

              <p className="text-gray-600 text-sm mb-4 text-center">This project is RERA registered.</p>

              <div className="text-xs text-gray-600 mb-6 text-center">
                <p>
                  Project MAHARERA : PHASE 1 - P51700020275 | JASPER - P51700045793 | OPAL - P51700045794 | AMBER - P51700045795 | NORTH TOWERS - P51700026653 | West Square - P51700056254
                </p>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="bg-gray-200 w-20 h-20 mx-auto rounded-lg flex items-center justify-center">
                    <img src="/img/qr.webp" alt={`QR Code ${index}`} className="w-16 h-16" />
                  </div>
                ))}
              </div>

              <div className="text-xs text-gray-500 mb-4 text-center">
                <p>
                  Disclaimer: The information provided on this website is for informational purposes only. Prices subject to change. Images are illustrative. Authorized marketing partner: Homeka Club Pvt Ltd.
                </p>
              </div>

              <div className="text-center">
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline text-sm mr-4">
                  Privacy Policy
                </a>
                <span className="text-gray-400">|</span>
                <a href="/terms-conditions" className="text-blue-600 hover:text-blue-700 underline text-sm ml-4">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
