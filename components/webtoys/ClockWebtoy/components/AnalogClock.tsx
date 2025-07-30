import type { ClockTheme } from "@/components/webtoys/ClockWebtoy/themes"
import * as S from "./styled"

interface AnalogClockProps {
  time: Date
  timezone: string
  theme: ClockTheme
  enableAnimations: boolean
  compact?: boolean
}

export function AnalogClock({ time, timezone, theme, enableAnimations, compact = false }: AnalogClockProps) {
  // Convert time to timezone (simplified)
  const timeInZone = new Date(time.toLocaleString("en-US", { timeZone: timezone }))

  const hours = timeInZone.getHours() % 12
  const minutes = timeInZone.getMinutes()
  const seconds = timeInZone.getSeconds()

  const hourAngle = hours * 30 + minutes * 0.5
  const minuteAngle = minutes * 6
  const secondAngle = seconds * 6

  return (
    <S.AnalogContainer>
      <S.ClockFace $theme={theme} $compact={compact}>
        {Array.from({ length: 12 }, (_, i) => (
          <S.HourMarker key={i} $angle={i * 30} $theme={theme} $compact={compact} />
        ))}

        <S.HourHand $angle={hourAngle} $theme={theme} $enableAnimations={enableAnimations} $compact={compact} />
        <S.MinuteHand $angle={minuteAngle} $theme={theme} $enableAnimations={enableAnimations} $compact={compact} />
        <S.SecondHand $angle={secondAngle} $theme={theme} $enableAnimations={enableAnimations} $compact={compact} />

        <S.CenterDot $theme={theme} $compact={compact} />
      </S.ClockFace>

      {!compact && <S.TimezoneDisplay $theme={theme}>{timezone.replace("_", " ")}</S.TimezoneDisplay>}
    </S.AnalogContainer>
  )
}
