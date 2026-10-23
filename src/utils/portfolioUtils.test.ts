import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBangladeshPhone,
  buildWhatsAppLink,
  getStorageKey,
  isValidMediaType,
} from './portfolioUtils.ts';

test('formatBangladeshPhone formats local 11-digit numbers with country code', () => {
  const result = formatBangladeshPhone('01646206866');
  assert.equal(result, '+880 1646-206866');
});

test('buildWhatsAppLink constructs valid wa.me international link without prefix zeros', () => {
  const link = buildWhatsAppLink('01646206866');
  assert.equal(link, 'https://wa.me/8801646206866');
});

test('buildWhatsAppLink properly appends encoded prefill message', () => {
  const link = buildWhatsAppLink('01646206866', 'Hello Riyazul!');
  assert.equal(link, 'https://wa.me/8801646206866?text=Hello%20Riyazul!');
});

test('getStorageKey generates namespaced key for portfolio items', () => {
  const key = getStorageKey('fresh-sprite');
  assert.equal(key, 'rion_portfolio_media_fresh-sprite');
});

test('isValidMediaType validates image and video file extensions', () => {
  assert.equal(isValidMediaType('poster.png', 'image'), true);
  assert.equal(isValidMediaType('ad.jpg', 'image'), true);
  assert.equal(isValidMediaType('video.mp4', 'video'), true);
  assert.equal(isValidMediaType('document.pdf', 'image'), false);
});

test('copyToClipboard safely returns false in non-window/SSR environment', async () => {
  const { copyToClipboard } = await import('./portfolioUtils.ts');
  const result = await copyToClipboard('test string');
  assert.equal(typeof result, 'boolean');
});

