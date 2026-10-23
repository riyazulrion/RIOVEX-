import { WorkItem, SkillRow } from '../types/portfolio.ts';

export const HERO_DATA = {
  brand: 'RIOVEX',
  year: '2026',
  label: '[ RIYAZUL HASAN RION // RIOVEX ]',
  role: 'GRAPHIC DESIGNER • BANGLADESH',
  name: 'RIYAZUL HASAN RION',
  bio: 'I design bold posters and ads that stop the scroll.',
  status: 'AVAILABLE FOR PROJECTS',
  location: 'BANGLADESH // REMOTE WORLDWIDE',
  contactEmail: 'riovex818@gmail.com',
  whatIDesign: [
    'Product Ads',
    'Movie-Style Posters',
    'Sports Posters',
    'Brand Posters',
  ],
  tools: [
    'Canva',
    'Affinity',
    'AI Video Tools',
  ],
};

export const ABOUT_DATA = {
  label: '// ABOUT',
  heading: 'DESIGN WITH INTENT.',
  bio: "I'm Riyazul Hasan Rion from Bangladesh, founder of RIOVEX. I'm a graphic designer creating product ads, cinematic posters and sports posters with clean, bold and modern visuals.",
  studioDetails: [
    { label: 'ROLE', value: 'GRAPHIC DESIGNER' },
    { label: 'STUDIO', value: 'RIOVEX' },
    { label: 'LOCATION', value: 'BANGLADESH' },
    { label: 'FOCUS', value: 'POSTERS & COMMERCIAL ADS' },
  ],
};

export const SKILL_ROWS: SkillRow[] = [
  { num: '01', title: 'Poster Design' },
  { num: '02', title: 'Ad Creatives' },
  { num: '03', title: 'Brand Visuals' },
  { num: '04', title: 'Product Graphic Design' },
  { num: '05', title: 'Canva Design' },
  { num: '06', title: 'AI Video Creation' },
];

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'jordan-4-sneaker-ad',
    num: '01',
    title: 'JORDAN 4 SNEAKER AD',
    category: 'AD DESIGN',
    tag: '[AD DESIGN]',
    description: 'sneaker ad poster with clean product focus and matched colors.',
    defaultImage: '/assets/aistudio/Screenshot_2026-10-23_184533_57bee128.png',
  },
  {
    id: 'fresh-sprite',
    num: '05',
    title: 'FRESH SPRITE',
    category: 'PRODUCT AD',
    tag: '[PRODUCT AD]',
    description: 'Canva poster with Sprite can, lime slices, mint leaves, cream background and bold green type.',
    defaultImage: '/assets/aistudio/sprite_542fdec8.png',
  },
  {
    id: 'cane-man',
    num: '03',
    title: 'CANE MAN',
    category: 'MOVIE POSTER',
    tag: '[MOVIE POSTER]',
    description: 'cinematic movie-style poster.',
    defaultImage: '/assets/aistudio/Screenshot_2026-10-23_184925_16edabec.png',
  },
  {
    id: 'street-grunge-poster',
    num: '02',
    title: 'STREET GRUNGE POSTER',
    category: 'POSTER',
    tag: '[POSTER]',
    description: 'red and black grunge-style poster.',
    defaultImage: '/assets/aistudio/Screenshot_2026-10-23_184559_9da7f040.png',
  },
  {
    id: 'cricketer-poster',
    num: '06',
    title: 'CRICKETER POSTER',
    category: 'SPORTS POSTER',
    tag: '[SPORTS POSTER]',
    description: 'sports player poster with bold typography.',
    defaultImage: '/assets/aistudio/shakib_2104dabc.png',
  },
];

export const CONTACT_DATA = {
  label: '// CONTACT',
  heading: "LET'S WORK TOGETHER.",
  email: 'riovex818@gmail.com',
  instagram: {
    handle: '@riove_x',
    url: 'https://www.instagram.com/riove_x',
    label: 'FOLLOW →',
  },
  qrCodePath: '/assets/aistudio/riove_x_qr_74d76c59.png',
  qrCaption: '[ SCAN TO FOLLOW @RIOVE_X ]',
};
