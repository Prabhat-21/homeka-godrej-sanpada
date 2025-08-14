// utils/phoneValidation.ts

export const cleanPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  let cleanValue = value.replace(/\D/g, '');
  
  // Handle +91 prefix (country code)
  if (cleanValue.startsWith('91') && cleanValue.length > 10) {
    // Remove the 91 prefix and keep the next 10 digits
    cleanValue = cleanValue.substring(2, 12);
  }
  // Handle 0 prefix (common in Indian phone numbers)
  else if (cleanValue.startsWith('0') && cleanValue.length > 10) {
    // Remove the 0 and keep the next 10 digits
    cleanValue = cleanValue.substring(1, 11);
  }
  // For any other case, just take the first 10 digits
  else {
    cleanValue = cleanValue.slice(0, 10);
  }
  
  return cleanValue;
};

export const validatePhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 0) return '';
  
  // Extract the actual 10-digit number after removing prefixes
  let actualNumber = cleanPhone;
  
  // Remove +91 or 91 prefix
  if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
    actualNumber = cleanPhone.substring(2);
  }
  // Remove 0 prefix
  else if (cleanPhone.startsWith('0') && cleanPhone.length > 1) {
    actualNumber = cleanPhone.substring(1);
  }
  
  // Check if the first digit of the actual number is valid
  if (actualNumber.length > 0) {
    const firstDigit = actualNumber.charAt(0);
    if (['0', '1', '2', '3', '4', '5'].includes(firstDigit)) {
      return 'Phone number cannot start with 0, 1, 2, 3, 4, or 5';
    }
  }
  
  // Check length of the actual number
  if (actualNumber.length > 10) {
    return 'Phone number must be exactly 10 digits (excluding +91 or 0)';
  }
  
  if (actualNumber.length < 10 && actualNumber.length > 0) {
    return `Please enter ${10 - actualNumber.length} more digit${10 - actualNumber.length > 1 ? 's' : ''}`;
  }
  
  return '';
};

export const formatPhoneDisplay = (value: string): string => {
  // This function preserves the user's input format but cleans it
  const hasPlus = value.startsWith('+');
  let cleanValue = value.replace(/\D/g, '');
  
  // If it started with +, add it back
  if (hasPlus && cleanValue.startsWith('91')) {
    return '+' + cleanValue.slice(0, 12); // +91 plus 10 digits
  }
  
  // Return cleaned value up to appropriate length
  if (cleanValue.startsWith('91') && cleanValue.length > 10) {
    return cleanValue.slice(0, 12); // 91 plus 10 digits
  }
  
  if (cleanValue.startsWith('0') && cleanValue.length > 10) {
    return cleanValue.slice(0, 11); // 0 plus 10 digits
  }
  
  return cleanValue.slice(0, 10);
};
