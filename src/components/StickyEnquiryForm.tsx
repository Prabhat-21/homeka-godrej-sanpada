import React, { useState, useRef, useCallback } from 'react';
import { Phone, User } from 'lucide-react';
import { customerService } from '../lib/supabase';
import { cleanPhoneNumber, formatPhoneDisplay, validatePhoneNumber, validatePhoneOnSubmit } from '../phone_validation';

const StickyEnquiryForm = () => {
  // Form data refs
  const formDataRef = useRef({
    name: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  const handleSubmit = useCallback(async (e) => {
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
          source: 'sticky_form',
          interest_type: 'site_visit',
          notes: 'Enquiry from sticky sidebar form'
        });
        setSubmitMessage('Thank you! We will contact you soon.');
      } else {
        await customerService.createCustomer({
          name: currentName,
          phone: currentPhone,
          source: 'sticky_form',
          interest_type: 'site_visit',
          notes: 'Enquiry from sticky sidebar form'
        });
        setSubmitMessage('Thank you! Redirecting...');
      }

      formDataRef.current = { name: '', phone: '' };
      if (nameInputRef.current) nameInputRef.current.value = '';
      if (phoneInputRef.current) phoneInputRef.current.value = '';
      
      localStorage.setItem('hasSubmittedForm', 'true');
      
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Sorry, there was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleChange = useCallback((e) => {
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
    <div className="w-full h-full bg-white shadow-2xl border-l border-gray-200 flex flex-col">
      <div className="flex-1 flex flex-col p-5 overflow-y-auto">
        {/* Header - More compact for desktop */}
        <div className="text-center mb-3">
          <p className="text-blue-600 font-semibold text-xs mb-1">New Launch</p>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Godrej Sanpada</h2>
          <p className="text-xs text-gray-600 mb-1">At Sanpada, Navi Mumbai</p>
          <p className="text-xs text-gray-600">By Godrej Properties</p>
        </div>

        {/* EOI Benefits Box with Animation - Same as mobile */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-2 mb-3 animate-glow-pulse">
          <div className="space-y-1">
            <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.2s' }}>
              <span className="text-blue-600 font-semibold text-xs">🌊 Sea-Facing Premium Towers</span>
            </div>
            <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.4s' }}>
              <span className="text-blue-600 font-semibold text-xs">🏡 Spacious Deck Homes</span>
            </div>
            <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.6s' }}>
              <span className="text-blue-600 font-semibold text-xs">🌿 70% Open Green Spaces</span>
            </div>
            <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.8s' }}>
              <span className="text-blue-600 font-semibold text-xs">🏖️ Palm Beach Road Location</span>
            </div>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="text-center mb-3">
          <p className="text-gray-700 text-xs mb-1">Luxurious 2 & 3 BHK Starting At</p>
          <div className="text-xl font-bold text-gray-800">
            <span className="text-blue-600">Rs. 3.5 Cr*</span>
            <span className="text-sm ml-1">Onwards</span>
          </div>
        </div>

        {/* Form Title */}
        <div className="bg-blue-50 rounded-lg p-2 mb-3">
          <h3 className="font-semibold text-gray-800 text-sm text-center">Pre-Register for Best Offers</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Name *
            </label>
            <div className="relative">
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontSize: '14px' }}
              />
              <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <input
                ref={phoneInputRef}
                type="tel"
                name="phone"
                onChange={handleChange}
                required
                placeholder="Enter 10-digit number"
                className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent ${
                  phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                style={{ fontSize: '14px' }}
              />
              <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
          </div>

          {phoneError && (
            <div className="text-red-600 text-xs bg-red-50 px-2 py-1 rounded">
              {phoneError}
            </div>
          )}

          {submitMessage && (
            <div className={`text-xs p-2 rounded-lg ${
              submitMessage.includes('error') || submitMessage.includes('Sorry')
                ? 'bg-red-50 text-red-700'
                : 'bg-green-50 text-green-700'
            }`}>
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-black font-bold py-2 rounded-lg transition-colors text-sm"
          >
            {isSubmitting ? 'Submitting...' : 'Pre-Register Now'}
          </button>
        </form>

        {/* Features - Compact */}
        <div className="mt-3 pt-3 border-t">
          <h4 className="font-semibold text-gray-800 mb-2 text-xs">Why Choose Godrej Eternal Palms?</h4>
          <ul className="space-y-1 text-xs text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-1">✓</span>
              Just off Palm Beach Road, Sanpada
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-1">✓</span>
              100+ Curated Premium Amenities
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-1">✓</span>
              1.5 km from Vashi Railway Station
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-1">✓</span>
              10 km from Navi Mumbai Airport
            </li>
          </ul>
        </div>

        {/* Contact Info - Compact */}
        <div className="mt-auto pt-3 border-t text-center">
          <p className="text-xs text-gray-600 mb-1">Need immediate assistance?</p>
          <a href="tel:+919702978506" className="text-blue-600 font-semibold text-sm hover:text-blue-700">
            📞 +91 97029 78506
          </a>
        </div>

        {/* Consent - Compact */}
        <div className="mt-2 text-xs text-gray-500">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="mr-1 mt-0.5"
            />
            <span className="text-xs leading-tight">
              I authorize company representatives to Call, SMS, Email or WhatsApp me. This consent overrides DNC/NDNC.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StickyEnquiryForm;
