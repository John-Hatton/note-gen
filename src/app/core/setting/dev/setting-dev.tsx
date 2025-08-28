import { SettingRow, SettingType } from "../components/setting-base";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { useToast } from "@/hooks/use-toast";
import { BaseDirectory, exists, remove } from "@tauri-apps/plugin-fs";
import { confirm, message } from '@tauri-apps/plugin-dialog';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Store } from "@tauri-apps/plugin-store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getLocalizedSetting, SettingKeys } from "@/lib/locales";
import SetConfig from "./set-config";

export function SettingDev({id, icon}: {id: string, icon?: React.ReactNode}) {
  const t = useTranslations();
  const [proxy, setProxy] = useState('');
  const { toast } = useToast()

  async function handleClearData() {
    const res = await confirm(t('settings.dev.clearDataConfirm'), {
      title: t('settings.dev.clearData'),
      kind: 'warning',
    })
    if (res) {
      const store = await Store.load('store.json');
      await store.clear()
      await remove('note.db', { baseDir: BaseDirectory.AppData })
      // EN: Inform user data cleared and app will restart
      message(t('settings.dev.dataClearedMessage') || '数据已清理，请重启应用', {
        title: t('settings.dev.restartTitle') || '重启应用',
        kind: 'info',
      }).then(async () => {
        await getCurrentWindow().close();
      })
    }
  }

  async function handleClearFile() {
    const res = await confirm('确定清理文件吗？清理后将无法恢复！', {
      title: '清理文件',
      kind: 'warning',
    })
  if (res) {
      const folders = ['screenshot', 'article', 'clipboard', 'image']
      for (const folder of folders) {
        const isFolderExists = await exists(folder, { baseDir: BaseDirectory.AppData})
        if (isFolderExists) {
          await remove(folder, { baseDir: BaseDirectory.AppData, recursive: true })
        }
      }
      toast({ title: '文件已清理' })
  toast({ title: t('settings.dev.filesCleared') || '文件已清理' })
    }
  }

  async function proxyChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setProxy(e.target.value)
    const store = await Store.load('store.json');
    await store.set('proxy', e.target.value)
  }

  useEffect(() => {
    async function init() {
      const store = await Store.load('store.json');
      const proxy = await store.get<string>('proxy')
      if (proxy) {
        setProxy(proxy)
      }
    }
    init()
  }, [])

  return (
    <SettingType id={id} icon={icon} title={getLocalizedSetting(SettingKeys.title, t)}>
      <SettingRow border className="gap-4 flex-col md:flex-row items-start md:items-center">
        <span>{getLocalizedSetting(SettingKeys.proxy, t)}</span>
        <Input className="max-w-[400px]" placeholder={getLocalizedSetting(SettingKeys.proxyPlaceholder, t)} value={proxy} onChange={proxyChangeHandler} />
      </SettingRow>
      <SettingRow border className="gap-4 flex-col md:flex-row items-start md:items-center">
        <span>{getLocalizedSetting(SettingKeys.clearDataDesc, t) || 'Clear persisted settings and database (including records).'} </span>
        <Button variant={"destructive"} onClick={handleClearData}>{getLocalizedSetting(SettingKeys.clearDataButton, t) || 'Clear'}</Button>
      </SettingRow>
      <SettingRow border className="gap-4 flex-col md:flex-row items-start md:items-center">
        <span>{getLocalizedSetting(SettingKeys.clearFilesDesc, t) || 'Clear persisted files, including images and articles.'}</span>
        <Button variant={"destructive"} onClick={handleClearFile}>{getLocalizedSetting(SettingKeys.clearFilesButton, t) || 'Clear'}</Button>
      </SettingRow>
      <SetConfig />
    </SettingType>
  )
}
