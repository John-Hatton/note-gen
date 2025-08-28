import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { SettingRow } from "../components/setting-base";
import { HardDriveDownload, HardDriveUpload } from "lucide-react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { useToast } from "@/hooks/use-toast";
import { BaseDirectory, copyFile, readTextFile } from "@tauri-apps/plugin-fs";
import { Store } from "@tauri-apps/plugin-store";
import { isMobileDevice } from "@/lib/check";
import { relaunch } from "@tauri-apps/plugin-process";

export default function SetConfig() {
    const t = useTranslations();
    const { toast } = useToast()
    async function handleImport() {
      const file = await open({
        title: t('settings.importConfigTitle'),
      })
      if (file) {
        const content = await readTextFile(file, { baseDir: BaseDirectory.AppData })
        const jsonContent = JSON.parse(content)
        const store = await Store.load('store.json');
        Object.keys(jsonContent).forEach((key: string) => {
          store.set(key, jsonContent[key])
        })
        if (isMobileDevice()) {
          toast({
            description: t('settings.dev.importSuccessDesc'),
          })
        } else {
          relaunch()
        }
      }
    }
    async function handleExport() {
      const file = await save({
        title: t('settings.dev.exportConfig'),
        defaultPath: 'store.json',
      })
      if (file) {
        await copyFile('store.json', file, { fromPathBaseDir: BaseDirectory.AppData })
        toast({ title: t('settings.dev.exportSuccess') })
      }
    }
    return (
    <SettingRow border className="gap-4 flex-col md:flex-row items-start md:items-center">
      <span>{t('settings.dev.configImportExportDesc')}</span>
      <div className="flex gap-2">
        <Button onClick={handleImport}><HardDriveDownload />{t('settings.dev.importButton')}</Button>
        <Button onClick={handleExport}><HardDriveUpload />{t('settings.dev.exportButton')}</Button>
      </div>
    </SettingRow>
  )
}
