/**
 * Form field validation helpers per PRD Section 13.4 & 14.3
 */

const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
];

export function isValidEmail(email: string): { valid: boolean; message?: string } {
  if (!email || !email.trim()) {
    return { valid: false, message: 'Please enter your email address.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }

  const domain = email.trim().split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return { valid: false, message: 'Please provide a permanent work or personal email.' };
  }

  return { valid: true };
}

export function isValidRequired(val: string, minLength = 2, fieldName = 'This field'): { valid: boolean; message?: string } {
  if (!val || val.trim().length < minLength) {
    return { valid: false, message: `${fieldName} is required (at least ${minLength} characters).` };
  }
  return { valid: true };
}
