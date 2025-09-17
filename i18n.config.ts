export const i18n = {
  defaultLocale: 'fr',
  locales: ['fr', 'en'] as const // <-- ça devient readonly tuple
} as const;

export type Locale = (typeof i18n)['locales'][number];
