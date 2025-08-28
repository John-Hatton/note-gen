// Structured list of supported locales. Use `id` (language code) for storage
// and program logic, and `label` for UI display.
export const locales = [
  { id: 'bn', label: 'বাংলা' },
  { id: 'cs', label: 'Čeština' },
  { id: 'de', label: 'Deutsch' },
  { id: 'en', label: 'English' },
  { id: 'fa', label: 'فارسی' },
  { id: 'fr', label: 'Français' },
  { id: 'it', label: 'Italiano' },
  { id: 'ja', label: '日本語' },
  { id: 'ko', label: '한국어' },
  { id: 'pt', label: 'Português' },
  { id: 'ru', label: 'Русский' },
  { id: 'zh', label: '简体中文' },
]

export const localeCodes = locales.map(l => l.id)
export const localeLabels = locales.map(l => l.label)

import { useTranslations } from 'next-intl';
import { SyncStateEnum } from './github.types';

export enum SettingKeys {
  clearDataDesc = 'settings.dev.clearDataDesc',
  clearDataButton = 'settings.dev.clearDataButton',
  clearFilesDesc = 'settings.dev.clearFilesDesc',
  clearFilesButton = 'settings.dev.clearFilesButton',
  proxy = 'settings.dev.proxy',
  proxyPlaceholder = 'settings.dev.proxyPlaceholder',
  title = 'settings.dev.title',
}

export function getLocalizedSetting(key: SettingKeys, t: ReturnType<typeof useTranslations>) {
  return t(key);
}

export function getLocalizedSyncState(state: SyncStateEnum, t: ReturnType<typeof useTranslations>) {
  const keyMap: Record<SyncStateEnum, string> = {
    [SyncStateEnum.checking]: t('sync.checking'),
    [SyncStateEnum.success]: t('common.success'),
    [SyncStateEnum.creating]: t('sync.creating'),
    [SyncStateEnum.fail]: t('common.error'),
  };
  return keyMap[state];
}
