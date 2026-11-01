/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScrollProgress } from './scrollProgress.ts';

test('calculateScrollProgress returns 0 at top of page', () => {
  const result = calculateScrollProgress(0, 3000, 1000);
  assert.equal(result, 0);
});

test('calculateScrollProgress returns 50 at midpoint', () => {
  const result = calculateScrollProgress(1000, 3000, 1000);
  assert.equal(result, 50);
});

test('calculateScrollProgress returns 100 at bottom of page', () => {
  const result = calculateScrollProgress(2000, 3000, 1000);
  assert.equal(result, 100);
});

test('calculateScrollProgress clamps overscroll at top and bottom', () => {
  assert.equal(calculateScrollProgress(-150, 3000, 1000), 0);
  assert.equal(calculateScrollProgress(3500, 3000, 1000), 100);
});

test('calculateScrollProgress handles non-scrollable pages gracefully', () => {
  assert.equal(calculateScrollProgress(0, 800, 1000), 0);
  assert.equal(calculateScrollProgress(0, 1000, 1000), 0);
});
