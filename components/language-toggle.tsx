"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title={language === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      <Globe className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">{language === "en" ? "Switch to Chinese" : "切换到英文"}</span>
    </Button>
  )
}
