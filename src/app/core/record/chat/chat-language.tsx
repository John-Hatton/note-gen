import * as React from "react"
import { useEffect, useState } from "react"
import { Store } from "@tauri-apps/plugin-store"
import { Globe } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { TooltipButton } from "@/components/tooltip-button"
import useChatStore from "@/stores/chat"

const languageOptions = [
  { id: 'en', label: 'English' },
  { id: 'zh', label: '中文' },
  { id: 'ja', label: '日本語' },
  { id: 'ko', label: '한국어' },
  { id: 'fr', label: 'Français' },
  { id: 'de', label: 'Deutsch' },
  { id: 'es', label: 'Español' },
  { id: 'ru', label: 'Русский' },
]

export function ChatLanguage() {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('record.chat.input')
  const [chatLanguage, setChatLanguage] = useState<string>('en')
  const { setLocale } = useChatStore()
  
  function getCurrentLanguageName() {
    const lang = languageOptions.find(l => l.id === chatLanguage)
    return lang ? lang.label : 'English'
  }

  async function initChatLanguage() {
    try {
      const store = await Store.load('store.json')
      const savedLanguage = await store.get<string>('chatLanguage')
      if (savedLanguage) {
        setChatLanguage(savedLanguage)
        setLocale(savedLanguage)
      } else {
        const appLocale = await store.get<string>('locale') || 'en'
        setChatLanguage(appLocale)
        setLocale(appLocale)
        await store.set('chatLanguage', appLocale)
        await store.save()
      }
    } catch (error) {
      console.error('Failed to initialize chat language:', error)
      setChatLanguage('en') // Default fallback
    }
  }

  // Save language selection to local storage
  async function languageSelectChangeHandler(langId: string) {
    setChatLanguage(langId)
    try {
      const store = await Store.load('store.json')
      await store.set('chatLanguage', langId)
      await store.save()
    } catch (error) {
      console.error('Failed to save chat language:', error)
    }
    setLocale(langId)
  }

  useEffect(() => {
    initChatLanguage()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="hidden md:block">
          <TooltipButton
            icon={<Globe className={`size-4 ${chatLanguage ? "text-primary" : ""}`} />}
            tooltipText={`${t('chatLanguage.tooltip') || "Select chat language"} (${getCurrentLanguageName()})`}
            size="icon"
            variant="ghost"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput 
            placeholder={t('chatLanguage.placeholder') || "Search language..."} 
            className="h-9" 
          />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languageOptions.map((lang) => (
                <CommandItem
                  key={lang.id}
                  value={lang.id}
                  onSelect={(currentValue) => {
                    languageSelectChangeHandler(currentValue)
                    setOpen(false)
                  }}
                >
                  {lang.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      chatLanguage === lang.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}