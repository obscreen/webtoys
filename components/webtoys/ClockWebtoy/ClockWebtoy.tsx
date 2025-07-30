"use client"

import { useState, useEffect } from "react"
import type { WebtoyConfig } from "@/types/webtoy"
import { ClockThemes } from "./themes"
import { AnalogClock } from "./components/AnalogClock"
import { DigitalClock } from "./components/DigitalClock"
import { WorldClocks } from "./components/WorldClocks"
import { WorldTimezones } from "@/editor/CustomizerTabs/widgets/WorldTimezones"
import * as S from "./styled"

interface ClockWebtoyProps {
  config: WebtoyConfig
}

export function ClockWebtoy({ config }: ClockWebtoyProps) {
  const {
    timezone = "Europe/Paris",
    displayMode = "digital",
    showWorldClocks = false,
    worldTimezones = ["America/New_York", "Asia/Tokyo", "Europe/London"],
    theme = "modern",
    showSeconds = true,
    format24h = true,
    enableAnimations = true,
    margin = 0,
    padding = true,
    backgroundColor = "#ffffff",
    backgroundImage = "",
  } = config

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const selectedTheme = ClockThemes[theme as keyof typeof ClockThemes] || ClockThemes.modern

  const renderMainClock = () => {
    switch (displayMode) {
      case "analog":
        return (
          <AnalogClock
            time={currentTime}
            timezone={timezone as string}
            theme={selectedTheme}
            enableAnimations={enableAnimations as boolean}
          />
        )
      default:
        return (
          <DigitalClock
            time={currentTime}
            timezone={timezone as string}
            theme={selectedTheme}
            showSeconds={showSeconds as boolean}
            format24h={format24h as boolean}
            enableAnimations={enableAnimations as boolean}
          />
        )
    }
  }

  return (
    <S.ClockContainer
      $theme={selectedTheme}
      $backgroundColor={backgroundColor as string}
      $backgroundImage={backgroundImage as string}
      $margin={margin as number}
      $padding={padding as boolean}
    >
      <S.ClockContent $showWorldClocks={showWorldClocks as boolean}>
        {/* Main Clock */}
        <S.MainClockSection $showWorldClocks={showWorldClocks as boolean}>{renderMainClock()}</S.MainClockSection>

        {/* World Clocks */}
        {showWorldClocks && (
          <S.WorldClocksSection>
            <WorldClocks
              time={currentTime}
              timezones={worldTimezones as string[]}
              theme={selectedTheme}
              format24h={format24h as boolean}
              showSeconds={showSeconds as boolean}
              enableAnimations={enableAnimations as boolean}
              displayMode={displayMode as string}
            />
          </S.WorldClocksSection>
        )}
      </S.ClockContent>
    </S.ClockContainer>
  )
}

export function renderConfigField(field: any, value: any, onChange: (value: any) => void, config: any) {
  if (field.key === "worldTimezones" && config.showWorldClocks) {
    return <WorldTimezones value={value as string[]} onChange={onChange} />
  }

  return null
}