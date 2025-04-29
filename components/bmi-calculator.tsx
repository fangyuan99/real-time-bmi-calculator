"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { InfoIcon } from "lucide-react"

export function BMICalculator() {
  const [height, setHeight] = useState<number>(170)
  const [weight, setWeight] = useState<number>(65)
  const [bmi, setBmi] = useState<number>(0)
  const [category, setCategory] = useState<string>("")
  const [categoryColor, setCategoryColor] = useState<string>("text-gray-500")
  const [progressColor, setProgressColor] = useState<string>("bg-gray-500")
  const [progressPercentage, setProgressPercentage] = useState<number>(0)
  const { language, translations } = useLanguage()

  useEffect(() => {
    if (height > 0 && weight > 0) {
      // Calculate BMI: weight (kg) / (height (m))²
      const heightInMeters = height / 100
      const calculatedBmi = weight / (heightInMeters * heightInMeters)
      setBmi(calculatedBmi)

      // Calculate progress percentage (0-100) based on BMI range
      // Chinese BMI scale typically goes from 15 to 35
      let percentage = ((calculatedBmi - 15) / 20) * 100
      percentage = Math.max(0, Math.min(100, percentage))
      setProgressPercentage(percentage)

      // Determine category based on Chinese BMI standards
      if (calculatedBmi < 18.5) {
        setCategory(translations.underweight)
        setCategoryColor("text-blue-500")
        setProgressColor("bg-blue-500")
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 24) {
        setCategory(translations.normal)
        setCategoryColor("text-green-500")
        setProgressColor("bg-green-500")
      } else if (calculatedBmi >= 24 && calculatedBmi < 28) {
        setCategory(translations.overweight)
        setCategoryColor("text-yellow-500")
        setProgressColor("bg-yellow-500")
      } else {
        setCategory(translations.obese)
        setCategoryColor("text-red-500")
        setProgressColor("bg-red-500")
      }
    } else {
      setBmi(0)
      setCategory("")
      setCategoryColor("text-gray-500")
      setProgressColor("bg-gray-500")
      setProgressPercentage(0)
    }
  }, [height, weight, translations])

  const handleHeightChange = (value: number) => {
    setHeight(value)
  }

  const handleWeightChange = (value: number) => {
    setWeight(value)
  }

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setHeight(value)
    } else if (e.target.value === "") {
      setHeight(0)
    }
  }

  const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setWeight(value)
    } else if (e.target.value === "") {
      setWeight(0)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.bmiCalculator}</CardTitle>
        <CardDescription>{translations.bmiDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="height">{translations.height}</Label>
              <span className="text-sm text-muted-foreground">{height} cm</span>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="height-slider"
                min={100}
                max={250}
                step={1}
                value={[height]}
                onValueChange={(values) => handleHeightChange(values[0])}
                className="flex-1"
              />
              <Input
                id="height"
                type="number"
                value={height}
                onChange={handleHeightInputChange}
                className="w-20"
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="weight">{translations.weight}</Label>
              <span className="text-sm text-muted-foreground">{weight} kg</span>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="weight-slider"
                min={30}
                max={150}
                step={1}
                value={[weight]}
                onValueChange={(values) => handleWeightChange(values[0])}
                className="flex-1"
              />
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={handleWeightInputChange}
                className="w-20"
                min={0}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{translations.yourBmi}</div>
              <div className="text-4xl font-bold">{bmi.toFixed(1)}</div>
              <div className={cn("text-lg font-medium mt-1", categoryColor)}>{category}</div>
            </div>

            {/* BMI Progress Bar */}
            <div className="w-full mt-4">
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                {/* Category Markers */}
                <div className="absolute inset-0 flex">
                  <div className="w-[23.125%] h-full border-r border-background/30"></div>
                  <div className="w-[30%] h-full border-r border-background/30"></div>
                  <div className="w-[22.5%] h-full border-r border-background/30"></div>
                  <div className="w-[24.375%] h-full"></div>
                </div>

                {/* Progress Fill */}
                <div
                  className={`h-full ${progressColor} transition-all duration-300 ease-in-out`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>

                {/* BMI Value Indicator */}
                <div
                  className={`absolute top-0 h-full w-2 bg-white border-2 ${categoryColor.replace("text-", "border-")} transition-all duration-300 ease-in-out`}
                  style={{
                    left: `calc(${progressPercentage}% - 4px)`,
                    display: progressPercentage > 0 ? "block" : "none",
                  }}
                ></div>
              </div>

              {/* Category Labels */}
              <div className="flex text-xs mt-1 text-muted-foreground">
                <div className="w-[23.125%] text-blue-500 text-center">&lt;18.5</div>
                <div className="w-[30%] text-green-500 text-center">18.5-24</div>
                <div className="w-[22.5%] text-yellow-500 text-center">24-28</div>
                <div className="w-[24.375%] text-red-500 text-center">&gt;28</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-4 text-center text-sm">
          <div className="flex flex-col items-center p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
            <span className="font-medium text-blue-500">{translations.underweight}</span>
            <span className="text-xs text-muted-foreground">&lt; 18.5</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-green-100 dark:bg-green-950">
            <span className="font-medium text-green-500">{translations.normal}</span>
            <span className="text-xs text-muted-foreground">18.5 - 23.9</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-yellow-100 dark:bg-yellow-950">
            <span className="font-medium text-yellow-500">{translations.overweight}</span>
            <span className="text-xs text-muted-foreground">24 - 27.9</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-red-100 dark:bg-red-950">
            <span className="font-medium text-red-500">{translations.obese}</span>
            <span className="text-xs text-muted-foreground">≥ 28</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="explanation">
            <AccordionTrigger className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              {translations.bmiExplanation}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">{translations.whatIsBmi}</h4>
                  <p>{translations.bmiDefinition}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{translations.howCalculated}</h4>
                  <p>{translations.bmiFormula}</p>
                  <div className="bg-muted p-2 rounded mt-2 text-center">
                    <span className="font-medium">
                      BMI = {translations.weight} (kg) / [{translations.height} (m)]²
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{translations.chineseStandards}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <span className="text-blue-500 font-medium">{translations.underweight}</span>: BMI &lt; 18.5
                    </li>
                    <li>
                      <span className="text-green-500 font-medium">{translations.normal}</span>: 18.5 ≤ BMI &lt; 24
                    </li>
                    <li>
                      <span className="text-yellow-500 font-medium">{translations.overweight}</span>: 24 ≤ BMI &lt; 28
                    </li>
                    <li>
                      <span className="text-red-500 font-medium">{translations.obese}</span>: BMI ≥ 28
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{translations.limitations}</h4>
                  <p>{translations.bmiLimitations}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  )
}
