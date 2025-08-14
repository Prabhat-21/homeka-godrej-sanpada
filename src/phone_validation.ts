// src/phone_validation.ts

export const cleanPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  let cleanPhone = phone.replace(/\D/g, '');
  
  // Handle +91 or 91 prefix (country code)
  if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
    cleanPhone = cleanPhone.substring(2, 12);
  }
  // Handle 0 prefix
  else if (cleanPhone.startsWith('0') && cleanPhone.length > 1) {
    cleanPhone = cleanPhone.substring(1, 11);
  }
  // Standard 10-digit number
  else {
    cleanPhone = cleanPhone.slice(0, 10);
  }
  
  return cleanPhone;
};

export const formatPhoneDisplay = (value: string): string => {
  let cleanValue = value.replace(/\D/g, '');
  let displayValue = cleanValue;
  
  // Preserve the prefix format for display
  const hasPlus = value.startsWith('+');
  
  // Handle different input formats
  if (cleanValue.startsWith('91') && cleanValue.length > 10) {
    // If user typed +91 or 91, allow up to 12 digits total
    displayValue = cleanValue.slice(0, 12);
    if (hasPlus) displayValue = '+' + displayValue;
  } else if (cleanValue.startsWith('0')) {
    // If user typed 0, allow up to 11 digits total
    displayValue = cleanValue.slice(0, 11);
  } else {
    // Standard 10-digit number
    displayValue = cleanValue.slice(0, 10);
  }
  
  return displayValue;
};

export const validatePhoneNumber = (phone: string): string => {
  // This function is called while typing - be very lenient
  // Only show errors for clearly invalid cases
  
  // Remove all non-digit characters
  let cleanPhone = phone.replace(/\D/g, '');
  
  // If empty, no error
  if (cleanPhone.length === 0) return '';
  
  // Determine the actual phone number (after removing prefixes)
  let actualPhone = cleanPhone;
  
  // If starts with 91 and has more than 10 digits, it's +91 format
  if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
    actualPhone = cleanPhone.substring(2);
  }
  // If starts with 0 and has more than 1 digit, it's 0 prefix format
  else if (cleanPhone.startsWith('0') && cleanPhone.length > 1) {
    actualPhone = cleanPhone.substring(1);
  }
  
  // IMPORTANT: Don't show any errors while user is still typing
  // Only validate the starting digit if they've typed enough digits
  
  // If they've typed at least one digit of the actual phone number
  if (actualPhone.length >= 1) {
    const firstDigit = actualPhone.charAt(0);
    // Only check for invalid starting digits
    if (['0', '1', '2', '3', '4', '5'].includes(firstDigit)) {
      return 'Phone number cannot start with 0, 1, 2, 3, 4, or 5';
    }
  }
  
  // Don't show "incomplete" error while typing - that's annoying
  // Let them finish typing
  return '';
};

export const validatePhoneOnSubmit = (phone: string): string => {
  // This function is called on submit - be strict
  
  // Remove all non-digit characters
  let cleanPhone = phone.replace(/\D/g, '');
  
  // Handle +91 or 91 prefix
  if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
    cleanPhone = cleanPhone.substring(2);
  }
  // Handle 0 prefix
  else if (cleanPhone.startsWith('0') && cleanPhone.length > 1) {
    cleanPhone = cleanPhone.substring(1);
  }
  
  if (cleanPhone.length === 0) return 'Phone number is required';
  
  const firstDigit = cleanPhone.charAt(0);
  if (['0', '1', '2', '3', '4', '5'].includes(firstDigit)) {
    return 'Phone number cannot start with 0, 1, 2, 3, 4, or 5';
  }
  
  if (cleanPhone.length < 10) {
    return 'Please enter complete 10-digit phone number';
  }
  
  if (cleanPhone.length > 10) {
    return 'Phone number must be exactly 10 digits';
  }
  
  return '';
};
