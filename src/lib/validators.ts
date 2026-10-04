/**
 * Validation utilities for Canadian local business forms
 */

export function isValidCanadianPostalCode(postalCode: string): boolean {
  // e.g. T2P 1J9, K1A 0B1, H3Z 2Y7 (standard Canadian postal format)
  const regex = /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z][ -]?\d[A-CEGHJ-NPR-TV-Z]\d$/i;
  return regex.test(postalCode.trim());
}

export function formatCanadianPostalCode(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length > 3) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)}`;
  }
  return clean;
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function isValidDomain(domain: string): boolean {
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return regex.test(domain.trim());
}
