import React from 'react';
import { customerService } from '../lib/supabase';
import { cleanPhoneNumber, formatPhoneDisplay, validatePhoneNumber, validatePhoneOnSubmit } from '../phone_validation';

const TextCarousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const messages = [
    "An investment with perfect blend of luxury, location, and long-term value in Sanpada",
    "A grand clubhouse (25,000 sqft) for social events and leisure activities", 
    "100 steps from Nexus Mall, Seawoods Station & Palm Beach Rd",
    "20 mins from upcoming Navi Mumbai International Airport"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="mb-6">
      <div className="text-center mb-4 min-h-[3rem] flex items-center justify-center">
        <p className="text-white text-sm md:text-base transition-opacity duration-500">
          {messages[currentSlide]}
        </p>
      </div>
      
      <div className="flex justify-center space-x-2">
        {messages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-400' 
                : 'bg-white bg-opacity-40 hover:bg-opacity-60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const formDataRef = React.useRef({
    name: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const nameInputRef = React.useRef(null);
  const phoneInputRef = React.useRef(null);

  const handlePhoneBlur = React.useCallback((e) => {
    const phone = e.target.value;
    const error = validatePhoneNumber(phone);
    setPhoneError(error);
  }, []);

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
          source: 'hero_form',
          interest_type: 'pre_registration',
          notes: 'Pre-registered from hero section'
        });
        setSubmitMessage('Thank you! We have updated your pre-registration.');
      } else {
        await customerService.createCustomer({
          name: currentName,
          phone: currentPhone,
          source: 'hero_form',
          interest_type: 'pre_registration',
          notes: 'Pre-registered from hero section'
        });
        setSubmitMessage('Thank you for your registration! Redirecting...');
      }

      formDataRef.current = { name: '', phone: '' };
      if (nameInputRef.current) nameInputRef.current.value = '';
      if (phoneInputRef.current) phoneInputRef.current.value = '';
      
      localStorage.setItem('hasSubmittedForm', 'true');
      
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 10);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Sorry, there was an error. Please try again.');
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
    <section id="home" className="relative">
      {/* Mobile Layout Only - Hero section for mobile */}
      <div className="lg:hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-8 md:py-20">
          {/* Main Content Card */}
          <div className="bg-white text-gray-800 rounded-2xl p-4 md:p-8 shadow-2xl mb-8">
            <div className="text-center mb-3 md:mb-4">
              <p className="text-blue-600 font-semibold text-sm md:text-lg mb-1 md:mb-2">New Launch</p>
              <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 text-gray-800">
                Godrej New Launch
              </h1>
              <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-4">At Sanpada, Navi Mumbai</p>
              <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-4">By Godrej Properties</p>

              {/* EOI Benefits Box - Updated without Sea-Facing */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-lg p-2 md:p-3 mb-2 md:mb-4 animate-glow-pulse">
                <div className="flex items-center justify-center mb-1 md:mb-2 opacity-0 animate-slide-bounce" style={{ animationDelay: '0.2s' }}>
                  <span className="text-blue-600 font-semibold text-sm md:text-lg">🏗️ 2 Towers • G+35 Storeys</span>
                </div>
                <div className="flex items-center justify-center mb-1 md:mb-2 opacity-0 animate-slide-bounce" style={{ animationDelay: '0.4s' }}>
                  <span className="text-blue-600 font-semibold text-sm md:text-lg">🏡 Spacious Deck Homes</span>
                </div>
                <div className="flex items-center justify-center mb-1 md:mb-2 opacity-0 animate-slide-bounce" style={{ animationDelay: '0.6s' }}>
                  <span className="text-blue-600 font-semibold text-sm md:text-lg">🌿 70% Open Green Spaces</span>
                </div>
                <div className="flex items-center justify-center opacity-0 animate-slide-bounce" style={{ animationDelay: '0.8s' }}>
                  <span className="text-blue-600 font-semibold text-sm md:text-lg">🏖️ Just off Palm Beach Road</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-base md:text-xl mb-2 md:mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
                Luxurious 2 & 3 BHK Starting At
              </p>
              <div className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 text-gray-800 opacity-0 animate-fade-up" style={{ animationDelay: '1.2s' }}>
                <span className="text-blue-600">Rs. 3.5 Cr*</span>
                <span className="text-base md:text-3xl ml-1 md:ml-2">Onwards</span>
              </div>
              
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('showEngagementPopup', { detail: { type: 'costing' } }))}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 md:px-8 rounded-lg transition-all duration-300 text-base md:text-lg transform hover:scale-105 hover:shadow-lg opacity-0 animate-fade-up"
                style={{ animationDelay: '1.4s' }}
              >
                Check Full Price Break Up
              </button>
            </div>
          </div>
          
          {/* Mobile Pre-Register Form */}
          <div id="hero-form" className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-center">Pre-Register here for Best Offers</h3>
            
            <TextCarousel />
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mobile-input-container">
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  inputMode="text"
                  autoCapitalize="words"
                  autoCorrect="off"
                  spellCheck="false"
                  key="hero-name"
                  placeholder="Enter Your Name here..."
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                  style={{ fontSize: '16px', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              <div className="mobile-input-container">
                <input
                  ref={phoneInputRef}
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  key="hero-phone"
                  placeholder="Enter Your Phone Number here..."
                  className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 text-base ${
                    phoneError 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-white border-opacity-30 focus:ring-yellow-400'
                  }`}
                  style={{ fontSize: '16px', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent' }}
                />
              </div>
              
              {phoneError && (
                <div className="text-red-200 text-sm mt-1 bg-red-500 bg-opacity-20 px-3 py-2 rounded">
                  {phoneError}
                </div>
              )}

              {submitMessage && (
                <div className={`text-sm p-3 rounded-lg ${
                  submitMessage.includes('error') || submitMessage.includes('Sorry') 
                    ? 'bg-red-500 bg-opacity-20 text-red-100 border border-red-400' 
                    : 'bg-green-500 bg-opacity-20 text-green-100 border border-green-400'
                }`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 disabled:cursor-not-allowed text-black font-bold py-3 px-4 md:px-6 rounded-lg transition-colors text-base"
              >
                {isSubmitting ? 'Submitting...' : 'Pre-Register Now'}
              </button>
            </form>
            
            <div className="text-xs text-blue-100 mt-3">
              <input
                type="checkbox"
                id="hero-consent"
                checked={true}
                readOnly
                className="mr-2 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
