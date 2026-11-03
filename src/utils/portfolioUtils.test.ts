import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getStorageKey,
  isValidMediaType,
} from './portfolioUtils.ts';

test('CONTACT_DATA contains only email, instagram, and youtube without phone or whatsapp', async () => {
  const { CONTACT_DATA } = await import('../data/portfolioData.ts');
  assert.ok(CONTACT_DATA.email);
  assert.ok(CONTACT_DATA.instagram.url);
  assert.equal(CONTACT_DATA.youtube.url, 'https://youtube.com/@riovex-818');
  assert.equal('phone' in CONTACT_DATA, false);
  assert.equal('whatsapp' in CONTACT_DATA, false);
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

test('WORK_ITEMS contain valid default media paths with supported extensions', async () => {
  const { WORK_ITEMS } = await import('../data/portfolioData.ts');
  assert.equal(WORK_ITEMS.length, 11);
  for (const item of WORK_ITEMS) {
    assert.ok(item.id && item.id.length > 0);
    assert.ok(item.title && item.title.length > 0);
    assert.ok(item.defaultImage && item.defaultImage.length > 0);
    const expectedType = item.tag === '[AI VIDEO]' ? 'video' : 'image';
    assert.equal(isValidMediaType(item.defaultImage, expectedType), true);
  }

  // Ensure BURGER OFFER exists only once
  const burgerCards = WORK_ITEMS.filter((i) => i.title.toUpperCase().includes('BURGER OFFER'));
  assert.equal(burgerCards.length, 1);

  // Ensure JUICE COMMERCIAL exists
  const juiceCards = WORK_ITEMS.filter((i) => i.title.toUpperCase().includes('JUICE COMMERCIAL'));
  assert.equal(juiceCards.length, 1);

  // Ensure SHAMPOO COMMERCIAL exists
  const shampooCards = WORK_ITEMS.filter((i) => i.title.toUpperCase().includes('SHAMPOO COMMERCIAL'));
  assert.equal(shampooCards.length, 1);
});

test('SKILL_ROWS contains updated 6 disciplines in correct order', async () => {
  const { SKILL_ROWS } = await import('../data/portfolioData.ts');
  assert.deepEqual(SKILL_ROWS, [
    { num: '01', title: 'Poster Design' },
    { num: '02', title: 'Ad Creatives' },
    { num: '03', title: 'Logo & Brand Identity' },
    { num: '04', title: 'Brand Visuals' },
    { num: '05', title: 'Product Graphic Design' },
    { num: '06', title: 'AI Video Creation' },
  ]);
});

test('getWorkCategoryGroup correctly maps tags to filter groups including VIDEOS', async () => {
  const { getWorkCategoryGroup } = await import('./portfolioUtils.ts');
  assert.equal(getWorkCategoryGroup('[AI VIDEO]'), 'VIDEOS');
  assert.equal(getWorkCategoryGroup('AI VIDEO'), 'VIDEOS');
  assert.equal(getWorkCategoryGroup('[VIDEO]'), 'VIDEOS');
  assert.equal(getWorkCategoryGroup('[LOGO DESIGN]'), 'LOGOS');
  assert.equal(getWorkCategoryGroup('LOGO DESIGN'), 'LOGOS');
  assert.equal(getWorkCategoryGroup('[BRAND IDENTITY]'), 'LOGOS');
  assert.equal(getWorkCategoryGroup('[FOOD AD]'), 'ADS');
  assert.equal(getWorkCategoryGroup('[PRODUCT AD]'), 'ADS');
  assert.equal(getWorkCategoryGroup('[POSTER]'), 'POSTERS');
  assert.equal(getWorkCategoryGroup('[AD DESIGN]'), 'POSTERS');
  assert.equal(getWorkCategoryGroup('[MOVIE POSTER]'), 'POSTERS');
  assert.equal(getWorkCategoryGroup('[SPORTS POSTER]'), 'POSTERS');
});

test('filterWorkItems filters items correctly by category', async () => {
  const { filterWorkItems } = await import('./portfolioUtils.ts');
  const { WORK_ITEMS } = await import('../data/portfolioData.ts');

  const allItems = filterWorkItems(WORK_ITEMS, 'ALL');
  assert.equal(allItems.length, 11);

  const posters = filterWorkItems(WORK_ITEMS, 'POSTERS');
  assert.equal(posters.length, 4); // Jordan 4, Cane Man, Street Grunge, Cricketer

  const ads = filterWorkItems(WORK_ITEMS, 'ADS');
  assert.equal(ads.length, 2); // Fresh Sprite, Burger Offer

  const logos = filterWorkItems(WORK_ITEMS, 'LOGOS');
  assert.equal(logos.length, 3); // Rionira, The Detox, Stratum

  const videos = filterWorkItems(WORK_ITEMS, 'VIDEOS');
  assert.equal(videos.length, 2); // Juice Commercial, Shampoo Commercial
  const videoTitles = videos.map((v) => v.title).sort();
  assert.deepEqual(videoTitles, ['JUICE COMMERCIAL', 'SHAMPOO COMMERCIAL']);
});

test('getMatchingCategoryFilterForSkill maps direct matching skills and returns null for multi/non-matching skills', async () => {
  const { getMatchingCategoryFilterForSkill } = await import('./portfolioUtils.ts');
  assert.equal(getMatchingCategoryFilterForSkill('01'), 'POSTERS');
  assert.equal(getMatchingCategoryFilterForSkill('02'), 'ADS');
  assert.equal(getMatchingCategoryFilterForSkill('03'), 'LOGOS');
  assert.equal(getMatchingCategoryFilterForSkill('04'), null);
  assert.equal(getMatchingCategoryFilterForSkill('05'), null);
  assert.equal(getMatchingCategoryFilterForSkill('06'), 'VIDEOS');
  assert.equal(getMatchingCategoryFilterForSkill('99'), null);
});

test('filterWorkItemsBySkill correctly filters items according to the requested skill mappings', async () => {
  const { filterWorkItemsBySkill } = await import('./portfolioUtils.ts');
  const { WORK_ITEMS } = await import('../data/portfolioData.ts');

  // 01 POSTER DESIGN → 6 items
  const posterSkillItems = filterWorkItemsBySkill(WORK_ITEMS, '01');
  assert.equal(posterSkillItems.length, 6);
  const posterIds = posterSkillItems.map((i) => i.id).sort();
  assert.deepEqual(posterIds, [
    'burger-offer',
    'cane-man',
    'cricketer-poster',
    'fresh-sprite',
    'jordan-4-sneaker-ad',
    'street-grunge-poster',
  ]);

  // 02 AD CREATIVES → 4 items (Jordan 4, Fresh Sprite, Burger offer, juice commercial)
  const adSkillItems = filterWorkItemsBySkill(WORK_ITEMS, '02');
  assert.equal(adSkillItems.length, 4);
  const adIds = adSkillItems.map((i) => i.id).sort();
  assert.deepEqual(adIds, ['burger-offer', 'fresh-sprite', 'jordan-4-sneaker-ad', 'juice-commercial']);

  // 03 LOGO & BRAND IDENTITY → 3 items (RioNira, The Detox, Stratum)
  const logoSkillItems = filterWorkItemsBySkill(WORK_ITEMS, '03');
  assert.equal(logoSkillItems.length, 3);
  const logoIds = logoSkillItems.map((i) => i.id).sort();
  assert.deepEqual(logoIds, ['rionira', 'stratum', 'the-detox']);

  // 04 BRAND VISUALS → 5 items (RioNira, The Detox, Stratum, Fresh Sprite, Burger offer)
  const brandVisualItems = filterWorkItemsBySkill(WORK_ITEMS, '04');
  assert.equal(brandVisualItems.length, 5);
  const brandVisualIds = brandVisualItems.map((i) => i.id).sort();
  assert.deepEqual(brandVisualIds, ['burger-offer', 'fresh-sprite', 'rionira', 'stratum', 'the-detox']);

  // 05 PRODUCT GRAPHIC DESIGN → 3 items (Jordan 4 sneaker ad, Fresh Sprite, Burger offer)
  const productDesignItems = filterWorkItemsBySkill(WORK_ITEMS, '05');
  assert.equal(productDesignItems.length, 3);
  const productDesignIds = productDesignItems.map((i) => i.id).sort();
  assert.deepEqual(productDesignIds, ['burger-offer', 'fresh-sprite', 'jordan-4-sneaker-ad']);

  // 06 AI VIDEO CREATION → 2 items (Juice commercial, Shampoo commercial)
  const videoSkillItems = filterWorkItemsBySkill(WORK_ITEMS, '06');
  assert.equal(videoSkillItems.length, 2);
  const videoSkillIds = videoSkillItems.map((i) => i.id).sort();
  assert.deepEqual(videoSkillIds, ['juice-commercial', 'shampoo-commercial']);
});

test('i18n TRANSLATIONS contains complete and populated dictionaries for en and bn', async () => {
  const { TRANSLATIONS, WORK_ITEMS_I18N } = await import('../i18n/translations.ts');
  const { WORK_ITEMS } = await import('../data/portfolioData.ts');

  assert.ok(TRANSLATIONS.en);
  assert.ok(TRANSLATIONS.bn);

  // Check sections
  for (const lang of ['en', 'bn'] as const) {
    const dict = TRANSLATIONS[lang];
    assert.ok(dict.navbar.home);
    assert.ok(dict.navbar.about);
    assert.ok(dict.navbar.work);
    assert.ok(dict.navbar.skills);
    assert.ok(dict.navbar.contact);
    assert.ok(dict.navbar.contactBtn);

    assert.ok(dict.hero.role);
    assert.ok(dict.hero.tagline);
    assert.ok(dict.hero.viewWork);
    assert.ok(dict.hero.studioCard);
    assert.equal(dict.hero.whatIDesign.length, 5);
    assert.equal(dict.hero.tools.length, 4);

    assert.ok(dict.about.heading);
    assert.ok(dict.about.bio);

    assert.ok(dict.skills.heading);
    assert.ok(dict.skills.items['01']);
    assert.ok(dict.skills.items['02']);
    assert.ok(dict.skills.items['03']);
    assert.ok(dict.skills.items['04']);
    assert.ok(dict.skills.items['05']);
    assert.ok(dict.skills.items['06']);

    assert.ok(dict.work.heading);
    assert.ok(dict.work.filters.ALL);
    assert.ok(dict.work.filters.POSTERS);
    assert.ok(dict.work.filters.ADS);
    assert.ok(dict.work.filters.LOGOS);
    assert.ok(dict.work.filters.VIDEOS);

    assert.ok(dict.contact.heading);
    assert.ok(dict.contact.emailMe);

    assert.ok(dict.footer.copyright);
    assert.ok(dict.footer.tagline);

    // Check all 10 work items localized
    for (const item of WORK_ITEMS) {
      const meta = WORK_ITEMS_I18N[lang][item.id];
      assert.ok(meta, `Missing i18n meta for item ${item.id} in lang ${lang}`);
      assert.ok(meta.title, `Missing title for ${item.id} in ${lang}`);
      assert.ok(meta.tag, `Missing tag for ${item.id} in ${lang}`);
      assert.ok(meta.description, `Missing description for ${item.id} in ${lang}`);
    }
  }

  // Specifically verify Bengali translations
  assert.equal(TRANSLATIONS.bn.navbar.home, 'হোম');
  assert.equal(TRANSLATIONS.bn.skills.items['01'], 'পোস্টার ডিজাইন');
  assert.equal(TRANSLATIONS.bn.work.filters.ALL, 'সব');
  assert.equal(WORK_ITEMS_I18N.bn['fresh-sprite'].title, 'ফ্রেশ স্প্রাইট');
});






