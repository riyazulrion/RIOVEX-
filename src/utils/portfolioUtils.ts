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

export type WorkFilter = 'ALL' | 'POSTERS' | 'ADS' | 'LOGOS' | 'VIDEOS';

/**
 * Maps a work item tag to its filter category:
 * - AI VIDEO -> VIDEOS
 * - LOGO DESIGN and BRAND IDENTITY -> LOGOS
 * - FOOD AD and PRODUCT AD -> ADS
 * - All other tags -> POSTERS
 */
export function getWorkCategoryGroup(tag: string): 'POSTERS' | 'ADS' | 'LOGOS' | 'VIDEOS' {
  const normalized = tag.replace(/\[|\]/g, '').trim().toUpperCase();
  if (normalized === 'AI VIDEO' || normalized === 'VIDEO' || normalized.includes('VIDEO')) {
    return 'VIDEOS';
  }
  if (normalized === 'LOGO DESIGN' || normalized === 'BRAND IDENTITY') {
    return 'LOGOS';
  }
  if (normalized === 'FOOD AD' || normalized === 'PRODUCT AD') {
    return 'ADS';
  }
  return 'POSTERS';
}

export function filterWorkItems<T extends { tag: string }>(items: T[], filter: WorkFilter): T[] {
  if (filter === 'ALL') return items;
  return items.filter((item) => getWorkCategoryGroup(item.tag) === filter);
}

/**
 * Maps a skill number (e.g. '01', '02', '03'...) to its corresponding category filter in the filter bar,
 * or null if there is no direct 1-to-1 match.
 */
export function getMatchingCategoryFilterForSkill(skillNum: string): WorkFilter | null {
  switch (skillNum) {
    case '01':
      return 'POSTERS';
    case '02':
      return 'ADS';
    case '03':
      return 'LOGOS';
    case '06':
      return 'VIDEOS';
    default:
      return null;
  }
}

/**
 * Filters work items by a selected skill number (e.g. '01', '02', '03'...).
 */
export function filterWorkItemsBySkill<T extends { skills: string[] }>(
  items: T[],
  skillNum: string
): T[] {
  return items.filter((item) => Array.isArray(item.skills) && item.skills.includes(skillNum));
}



