import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Phone, Mail, Clock, Gift, Download, MapPin, Home } from 'lucide-react';

// Mock customerService for demo - replace with your actual import
const customerService = {
  getCustomerByPhone: async (phone) => {
    // Simulate API call
    return null;
  },
  createCustomer: async (data) => {
    // Simulate API call
    console.log('Creating customer:', data);
    return { id: Date.now() };
  },
  updateCustomer: async (id, data) => {
    // Simulate API call
    console.log('Updating customer:', id, data);
    return { id };
  }
};

// Constants
const POPUP_DELAY = {
  SEVEN_SECONDS: 7000,
  THIRTY_SECONDS: 30000
};

const POPUP_TYPES = {
  GENERAL: 'general',
  COSTING: 'costing',
  BROCHURE: 'brochure',
  MASTER_PLAN: 'master_plan',
  UNIT_LAYOUT: 'unit_layout',
  AMENITIES: 'amenities',
  GALLERY: 'gallery',
  SITE_VISIT: 'site_visit'
};

const POPUP_SOURCES = {
  SEVEN_SECOND: 'seven_second_popup',
  THIRTY_SECOND: 'thirty_second_popup',
  ACTION: 'action_popup'
};

// Popup content configuration
const POPUP_CONTENT_CONFIG = {
  [POPUP_TYPES.COSTING]: {
    title: 'Get Complete Costing Details',
    subtitle: 'Detailed pricing, payment plans & exclusive offers',
    icon: Gift,
    iconColor: 'text-yellow-500',
    benefits: ['Detailed Unit Pricing', 'Payment Schedule', 'Special Offers', 'Hidden Costs Breakdown']
  },
  [POPUP_TYPES.BROCHURE]: {
    title: 'Download Project Brochure',
    subtitle: 'Complete project information & floor plans',
    icon: Download,
    iconColor: 'text-blue-500',
    benefits: ['High-Quality Images', 'Floor Plans', 'Amenities Details', 'Location Map']
  },
  [POPUP_TYPES.MASTER_PLAN]: {
    title: 'Get Master Plan Layout',
    subtitle: 'Complete master plan with detailed layout',
    icon: MapPin,
    iconColor: 'text-green-500',
    benefits: ['Detailed Master Plan', 'Layout Information', 'Project Overview', 'Site Map']
  },
  [POPUP_TYPES.UNIT_LAYOUT]: {
    title: 'Get Unit Layout Plans',
    subtitle: 'Detailed unit plans for all configurations',
    icon: Home,
    iconColor: 'text-purple-500',
    benefits: ['2 BHK Floor Plans', '3 BHK Floor Plans', 'Unit Specifications', 'Area Details']
  },
  [POPUP_TYPES.AMENITIES]: {
    title: 'Complete Amenities List',
    subtitle: 'All luxury amenities and facilities',
    icon: Gift,
    iconColor: 'text-orange-500',
    benefits: ['Clubhouse Details', 'Recreation Facilities', 'Sports Amenities', 'Lifestyle Features']
  },
  [POPUP_TYPES.GALLERY]: {
    title: 'Complete Project Gallery',
    subtitle: 'High-resolution images and virtual tour',
    icon: Download,
    iconColor: 'text-indigo-500',
    benefits: ['HD Project Images', 'Interior Views', 'Amenity Photos', 'Virtual Tour Access']
  },
  [POPUP_TYPES.SITE_VISIT]: {
    title: 'Schedule Site Visit',
    subtitle: 'Experience the project firsthand',
    icon: Clock,
    iconColor: 'text-green-500',
    benefits: ['Free Site Visit', 'Expert Guidance', 'Live Project Tour', 'On-Spot Booking Benefits']
  },
  [POPUP_TYPES.GENERAL]: {
    title: 'Have Any Questions?',
    subtitle: 'Our experts are here to help you',
    icon: Phone,
    iconColor: 'text-blue-500',
    benefits: ['Instant Call Back', 'Expert Consultation', 'Best Price Guarantee', 'Exclusive Deals']
  }
};

// Utility functions
const isFormSubmittedToday = () => {
  try {
    const submissionData = localStorage.getItem('formSubmissionData');
    if (!submissionData) return false;
    
    const { timestamp } = JSON.parse(submissionData);
    const today = new Date().toDateString();
    const submissionDate = new Date(timestamp).toDateString();
    
    return today === submissionDate;
  } catch (error) {
    console.error('Error checking form submission:', error);
    return false;
  }
};

const markFormSubmitted = () => {
  try {
    localStorage.setItem('formSubmissionData', JSON.stringify({
      timestamp: Date.now(),
      date: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error marking form submission:', error);
  }
};

const validatePhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 0) return '';
  
  // Only check first digit if we have at least one digit
  if (cleanPhone.length >= 1) {
    const firstDigit = cleanPhone.charAt(0);
    if (['0', '1', '2', '3', '4', '5'].includes(firstDigit)) {
      return 'Phone number cannot start with 0, 1, 2, 3, 4, or 5';
    }
  }
  
  // Only show length error when user has finished typing or has too many digits
  if (cleanPhone.length > 10) {
    return 'Phone number must be exactly 10 digits';
  }
  
  // Don't show error while user is still typing (under 10 digits)
  return '';
};

const formatPhoneNumber = (value) => {
  let cleanValue = value.replace(/\D/g, '');
  
  // Handle autofill with 11 digits starting with 0
  if (cleanValue.length === 11 && cleanValue.startsWith('0')) {
    cleanValue = cleanValue.substring(1);
  }
  
  // Limit to 10 digits
  return cleanValue.slice(0, 10);
};

// PopupForm Component
const PopupForm = React.memo(({ popup, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  
  const content = useMemo(() => {
    const config = POPUP_CONTENT_CONFIG[popup.type] || POPUP_CONTENT_CONFIG[POPUP_TYPES.GENERAL];
    const IconComponent = config.icon;
    return {
      ...config,
      iconElement: <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
    };
  }, [popup.type]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
      
      // Only set error if there's an actual error, avoid unnecessary re-renders
      const error = formattedPhone ? validatePhoneNumber(formattedPhone) : '';
      setPhoneError(prevError => {
        if (prevError !== error) return error;
        return prevError;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Don't clear submit message on every keystroke - only clear errors
    if (submitMessage && (submitMessage.includes('error') || submitMessage.includes('Sorry'))) {
      // Don't clear immediately, let user see the error
    } else if (submitMessage && submitMessage.includes('fill in all')) {
      setSubmitMessage('');
    }
  }, [submitMessage]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!consentChecked) {
      setSubmitMessage('Please accept the consent to proceed.');
      return;
    }
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    // Check for complete phone number on submit
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setPhoneError('Please enter complete 10-digit phone number');
      return;
    }
    
    const phoneValidationError = validatePhoneNumber(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setPhoneError('');

    try {
      await onSubmit({
        ...formData,
        source: popup.source,
        type: popup.type
      });
      
      setSubmitMessage('Thank you! Redirecting...');
      setFormData({ name: '', phone: '' });
      
      // Safe redirect
      setTimeout(() => {
        if (window.location.pathname !== '/thank-you') {
          window.location.href = '/thank-you';
        }
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Sorry, there was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit();
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return 'Processing...';
    
    switch (popup.type) {
      case POPUP_TYPES.COSTING: return 'Get Pricing';
      case POPUP_TYPES.BROCHURE: return 'Get Brochure';
      case POPUP_TYPES.SITE_VISIT: return 'Schedule Visit';
      default: return `Get ${popup.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[10010] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl relative w-full max-w-sm md:max-w-lg mx-auto max-h-[90vh] md:max-h-[75vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-white hover:text-gray-200 z-[10011] bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 md:p-5 flex-1 overflow-y-auto">
          <div className="text-center mb-3 md:mb-4">
            <div className="flex justify-center mb-2">{content.iconElement}</div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{content.title}</h3>
            <p className="text-sm text-gray-600">{content.subtitle}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">What you'll get:</h4>
            <div className="space-y-1">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                autoComplete="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="Enter Your Name here..."
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                autoComplete="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-base ${
                  phoneError && formData.phone.length > 0 ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Phone Number (10 digits)"
                maxLength="10"
              />
            </div>

            {phoneError && (
              <div className="text-red-600 text-xs bg-red-50 px-2 py-1 rounded border border-red-200">
                {phoneError}
              </div>
            )}

            {submitMessage && (
              <div
                className={`text-xs p-2 rounded-lg ${
                  submitMessage.includes('error') || submitMessage.includes('Sorry')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}
              >
                {submitMessage}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !consentChecked}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
            >
              {getButtonText()}
            </button>
          </div>

          <div className="text-xs text-gray-500 mt-3">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mr-2 mt-0.5 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="select-none">
                I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. 
                This consent overrides any registration for DNC/NDNC.
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

PopupForm.displayName = 'PopupForm';

// Main Component
const EngagementPopups = ({ onClose }) => {
  const [popup, setPopup] = useState({
    show: false,
    type: POPUP_TYPES.GENERAL,
    source: null
  });
  
  const timersRef = useRef({
    sevenSecond: null,
    thirtySecond: null
  });
  
  const hasInteractedRef = useRef(false);
  const isMountedRef = useRef(true);

  // Clear all timers utility
  const clearAllTimers = useCallback(() => {
    Object.values(timersRef.current).forEach(timer => {
      if (timer) clearTimeout(timer);
    });
    timersRef.current = {
      sevenSecond: null,
      thirtySecond: null
    };
  }, []);

  // Close mobile menus utility
  const closeMobileMenus = useCallback(() => {
    try {
      window.dispatchEvent(new CustomEvent('closeMobileMenu'));
    } catch (error) {
      console.error('Error closing mobile menu:', error);
    }
  }, []);

  // Handle form submission
  const handleFormSubmit = useCallback(async (formData) => {
    try {
      const existingCustomer = await customerService.getCustomerByPhone(formData.phone);
      const customerData = {
        name: formData.name,
        phone: formData.phone,
        source: formData.source,
        interest_type: formData.type,
        notes: `Interested in ${formData.type.replace('_', ' ')} - from ${formData.source} popup`
      };

      if (existingCustomer) {
        await customerService.updateCustomer(existingCustomer.id, customerData);
      } else {
        await customerService.createCustomer(customerData);
      }

      // Mark form as submitted for today
      markFormSubmitted();
      
      // Clear remaining timers after submission
      clearAllTimers();
    } catch (error) {
      console.error('Error in form submission:', error);
      throw error;
    }
  }, [clearAllTimers]);

  // Handle popup close
  const handlePopupClose = useCallback(() => {
    setPopup({ show: false, type: POPUP_TYPES.GENERAL, source: null });
    onClose?.();
  }, [onClose]);

  // Setup automated popups
  useEffect(() => {
    // Check if we should show popups
    const shouldShowPopups = !isFormSubmittedToday() && 
                            window.location.pathname !== '/thank-you';
    
    if (!shouldShowPopups) return;

    // Handle CTA clicks
    const handleCTAClick = (e) => {
      const target = e.target;
      const isCTA = target.tagName === 'BUTTON' ||
                   target.closest('button') ||
                   target.classList.contains('cta-button') ||
                   target.closest('.cta-button') ||
                   target.getAttribute('data-cta') ||
                   target.closest('[data-cta]');
      
      if (isCTA && !hasInteractedRef.current) {
        hasInteractedRef.current = true;
        // Clear only the 7-second timer on CTA click
        if (timersRef.current.sevenSecond) {
          clearTimeout(timersRef.current.sevenSecond);
          timersRef.current.sevenSecond = null;
        }
      }
    };

    document.addEventListener('click', handleCTAClick);

    // Set up 7-second popup
    timersRef.current.sevenSecond = setTimeout(() => {
      if (!hasInteractedRef.current && isMountedRef.current) {
        closeMobileMenus();
        setPopup({
          show: true,
          type: POPUP_TYPES.GENERAL,
          source: POPUP_SOURCES.SEVEN_SECOND
        });
      }
    }, POPUP_DELAY.SEVEN_SECONDS);

    // Set up 30-second popup
    timersRef.current.thirtySecond = setTimeout(() => {
      if (isMountedRef.current && !isFormSubmittedToday()) {
        closeMobileMenus();
        setPopup({
          show: true,
          type: POPUP_TYPES.GENERAL,
          source: POPUP_SOURCES.THIRTY_SECOND
        });
      }
    }, POPUP_DELAY.THIRTY_SECONDS);

    return () => {
      document.removeEventListener('click', handleCTAClick);
      clearAllTimers();
    };
  }, [clearAllTimers, closeMobileMenus]);

  // Handle action popups from custom events
  useEffect(() => {
    const handleActionPopup = (event) => {
      const popupType = event.detail?.type || POPUP_TYPES.GENERAL;
      
      closeMobileMenus();
      setPopup({
        show: true,
        type: popupType,
        source: POPUP_SOURCES.ACTION
      });
      
      // Mark as interacted to prevent 7-second popup
      hasInteractedRef.current = true;
      
      // Clear 7-second timer if it's still running
      if (timersRef.current.sevenSecond) {
        clearTimeout(timersRef.current.sevenSecond);
        timersRef.current.sevenSecond = null;
      }
    };

    window.addEventListener('showEngagementPopup', handleActionPopup);
    
    return () => {
      window.removeEventListener('showEngagementPopup', handleActionPopup);
    };
  }, [closeMobileMenus]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (popup.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [popup.show]);

  if (!popup.show) return null;

  return (
    <PopupForm
      popup={popup}
      onClose={handlePopupClose}
      onSubmit={handleFormSubmit}
    />
  );
};

export default EngagementPopups;
