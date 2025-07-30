import type { ClockTheme } from "@/components/webtoys/ClockWebtoy/themes"
import * as S from "./styled"

interface DigitalClockProps {
  time: Date
  timezone: string
  theme: ClockTheme
  showSeconds: boolean
  format24h: boolean
  enableAnimations: boolean
}

export function DigitalClock({ time, timezone, theme, showSeconds, format24h, enableAnimations }: DigitalClockProps) {
  // Simple time formatting without date-fns-tz for now
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
      hour12: !format24h,
    }
    return date.toLocaleTimeString("en-US", options)
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  const formattedTime = formatTime(time)
  const formattedDate = formatDate(time)

  return (
    <S.DigitalContainer>
      <S.TimeDisplay $theme={theme} $enableAnimations={enableAnimations}>
        {formattedTime}
      </S.TimeDisplay>
      <S.DateDisplay $theme={theme} $enableAnimations={enableAnimations}>
        {formattedDate}
      </S.DateDisplay>
      <S.TimezoneDisplay $theme={theme}>{timezone.replace("_", " ")}</S.TimezoneDisplay>
    </S.DigitalContainer>
  )
}
