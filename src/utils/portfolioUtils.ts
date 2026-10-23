/**
 * Formats a phone number for display or API use
 */
export function formatBangladeshPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('880')) {
    return `+880 ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.startsWith('0')) {
    return `+880 ${cleaned.slice(1, 5)}-${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Builds standard WhatsApp direct chat link
 */
export function buildWhatsAppLink(phone: string, text?: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const internationalNumber = cleaned.startsWith('880')
    ? cleaned
    : cleaned.startsWith('0')
    ? `88${cleaned}`
    : `880${cleaned}`;

  const base = `https://wa.me/${internationalNumber}`;
  if (text) {
    return `${base}?text=${encodeURIComponent(text)}`;
  }
  return base;
}

/**
 * Key for saving work media in localStorage
 */
export function getStorageKey(workId: string): string {
  return `rion_portfolio_media_${workId}`;
}

/**
 * Reads custom media stored in localStorage
 */
export function getSavedMedia(workId: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return localStorage.getItem(getStorageKey(workId));
  } catch {
    return null;
  }
}

/**
 * Saves custom media to localStorage
 */
export function saveMedia(workId: string, dataUrl: string): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    localStorage.setItem(getStorageKey(workId), dataUrl);
    return true;
  } catch (err) {
    console.warn('Storage quota exceeded or unavailable', err);
    return false;
  }
}

/**
 * Clears custom media from localStorage
 */
export function clearSavedMedia(workId: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(getStorageKey(workId));
  } catch (err) {
    console.warn('Could not remove item', err);
  }
}

/**
 * Safe clipboard copy with legacy fallback for environments with restricted navigator.clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Proceed to textarea fallback
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Helper to validate image or video file extension
 */
export function isValidMediaType(filename: string, expectedType: 'image' | 'video'): boolean {
  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'avif'];
  const videoExts = ['mp4', 'webm', 'ogg', 'mov'];
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  if (expectedType === 'image') {
    return imageExts.includes(ext);
  }
  return videoExts.includes(ext) || imageExts.includes(ext);
}

