/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Calculates scroll progress as a percentage from 0 to 100.
 *
 * @param scrollY - Current vertical scroll offset (e.g. window.scrollY)
 * @param scrollHeight - Total scrollable height of document (e.g. document.documentElement.scrollHeight)
 * @param innerHeight - Viewport height (e.g. window.innerHeight)
 * @returns Number between 0 and 100 representing scroll progress percentage
 */
export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  innerHeight: number
): number {
  const maxScroll = scrollHeight - innerHeight;
  if (maxScroll <= 0) {
    return 0;
  }
  const progress = (scrollY / maxScroll) * 100;
  return Math.min(100, Math.max(0, progress));
}
