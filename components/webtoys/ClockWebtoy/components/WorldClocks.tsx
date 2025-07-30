import type { ClockTheme } from "@/components/webtoys/ClockWebtoy/themes"
import { AnalogClock } from "./AnalogClock"
import * as S from "./styled"

interface WorldClocksProps {
  time: Date
  timezones: string[]
  theme: ClockTheme
  format24h: boolean
  showSeconds: boolean
  enableAnimations: boolean
  displayMode: string
}

export function WorldClocks({
  time,
  timezones,
  theme,
  format24h,
  showSeconds,
  enableAnimations,
  displayMode,
}: WorldClocksProps) {
  return (
    <S.WorldContainer>
      {timezones.slice(0, 10).map((timezone, index) => {
        const cityName = timezone.split("/").pop()?.replace("_", " ") || timezone

        return (
          <S.WorldClockItem key={timezone} $theme={theme} $enableAnimations={enableAnimations} $delay={index * 0.1}>
            <S.CityName $theme={theme}>{cityName}</S.CityName>

            {displayMode === "analog" ? (
              <div style={{ transform: "scale(0.6)", transformOrigin: "center" }}>
                <AnalogClock
                  time={time}
                  timezone={timezone}
                  theme={theme}
                  enableAnimations={enableAnimations}
                  compact={true}
                />
              </div>
            ) : (
              <S.CityTime $theme={theme}>
                {time.toLocaleTimeString("en-US", {
                  timeZone: timezone,
                  hour: "2-digit",
                  minute: "2-digit",
                  ...(showSeconds && { second: "2-digit" }),
                  hour12: !format24h,
                })}
              </S.CityTime>
            )}
          </S.WorldClockItem>
        )
      })}
    </S.WorldContainer>
  )
}
