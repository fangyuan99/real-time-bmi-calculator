"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "zh"

type Translations = {
  bmiCalculator: string
  bmiDescription: string
  height: string
  weight: string
  yourBmi: string
  underweight: string
  normal: string
  overweight: string
  obese: string
  bmiExplanation: string
  whatIsBmi: string
  bmiDefinition: string
  howCalculated: string
  bmiFormula: string
  chineseStandards: string
  limitations: string
  bmiLimitations: string
}

const translations: Record<Language, Translations> = {
  en: {
    bmiCalculator: "BMI Calculator",
    bmiDescription: "Calculate your Body Mass Index based on Chinese standards",
    height: "Height (cm)",
    weight: "Weight (kg)",
    yourBmi: "Your BMI",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
    bmiExplanation: "BMI Explanation & Interpretation",
    whatIsBmi: "What is BMI?",
    bmiDefinition:
      "Body Mass Index (BMI) is a numerical value of your weight in relation to your height. It is used to categorize individuals as underweight, normal weight, overweight, or obese.",
    howCalculated: "How is BMI calculated?",
    bmiFormula: "BMI is calculated by dividing your weight in kilograms by the square of your height in meters:",
    chineseStandards: "Chinese BMI Standards",
    limitations: "Limitations of BMI",
    bmiLimitations:
      "BMI does not directly measure body fat and doesn't account for factors like muscle mass, bone density, and overall body composition. Athletes may have a high BMI due to muscle mass rather than body fat. BMI should be used as one of several tools to assess health.",
  },
  zh: {
    bmiCalculator: "BMI 计算器",
    bmiDescription: "根据中国标准计算您的身体质量指数",
    height: "身高 (厘米)",
    weight: "体重 (公斤)",
    yourBmi: "您的 BMI",
    underweight: "体重过轻",
    normal: "正常",
    overweight: "超重",
    obese: "肥胖",
    bmiExplanation: "BMI 解释与解读",
    whatIsBmi: "什么是 BMI？",
    bmiDefinition: "身体质量指数 (BMI) 是您的体重与身高关系的数值。它用于将个体分类为体重过轻、正常体重、超重或肥胖。",
    howCalculated: "BMI 如何计算？",
    bmiFormula: "BMI 的计算方法是用您的体重（公斤）除以身高（米）的平方：",
    chineseStandards: "中国 BMI 标准",
    limitations: "BMI 的局限性",
    bmiLimitations:
      "BMI 不直接测量体脂，也不考虑肌肉质量、骨密度和整体身体成分等因素。运动员可能由于肌肉质量而非体脂而具有较高的 BMI。BMI 应作为评估健康的多种工具之一。",
  },
}

type LanguageContextType = {
  language: Language
  translations: Translations
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Initialize language from localStorage or browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith("zh")) {
        setLanguage("zh")
        localStorage.setItem("language", "zh")
      } else {
        setLanguage("en")
        localStorage.setItem("language", "en")
      }
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "zh" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, translations: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
