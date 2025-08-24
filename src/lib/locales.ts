// Structured list of supported locales. Use `id` (language code) for storage
// and program logic, and `label` for UI display.
export const locales = [
  { id: 'zh', label: '简体中文' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'fr', label: 'Français' },
  { id: 'ko', label: '한국어' },
  { id: 'pt', label: 'Português' },
  { id: 'bn', label: 'বাংলা' },
  { id: 'it', label: 'Italiano' },
  { id: 'fa', label: 'فارسی' },
  { id: 'ru', label: 'Русский' },
  { id: 'cs', label: 'Čeština' },
]

export const localeCodes = locales.map(l => l.id)
export const localeLabels = locales.map(l => l.label)