export function normalizeLanguageForModel(rawLang?: string): string {
  const val = (rawLang || '').trim()
  const langMap: Record<string, string> = {
    '中文': 'Chinese',
    'Chinese': 'Chinese',
    'English': 'English',
    '日本語': 'Japanese',
    '日本語(JP)': 'Japanese',
    '日本語 (JP)': 'Japanese',
    '日本語 (ja)': 'Japanese',
    '日本語 (ja-JP)': 'Japanese',
    '한국어': 'Korean',
    'Français': 'French',
    'Deutsch': 'German',
    'Español': 'Spanish',
    'Русский': 'Russian',
    // common codes
    'en': 'English',
    'zh': 'Chinese',
    'zh-CN': 'Chinese',
    'zh_TW': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'fr': 'French',
    'de': 'German',
    'es': 'Spanish',
    'ru': 'Russian'
  }

  return langMap[val] || (val || 'English')
}

export default normalizeLanguageForModel
