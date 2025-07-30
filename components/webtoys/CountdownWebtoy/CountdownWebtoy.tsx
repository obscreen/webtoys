"use client"

import { useState, useEffect } from "react"
import type { WebtoyConfig } from "@/types/webtoy"
import { nl2br } from "@/utils/util-string"
import { CountdownThemes } from "./themes"
import * as S from "./styled"

interface CountdownWebtoyProps {
  config: WebtoyConfig
}

export function CountdownWebtoy({ config }: CountdownWebtoyProps) {
  const {
    message = "",
    pictureUrl = "",
    targetDate = null,
    targetTime = null,
    template = "modern",
    padding = true,
    showFormat = true,
    showTargetInfo = true,
    backgroundColor = "#ffffff",
    backgroundImage = "",
    margin = 0,
  } = config

  const [timeLeft, setTimeLeft] = useState(0)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Combine date and time into a single Date object
      const targetDateTime = new Date(`${targetDate}T${targetTime}`)
      const now = new Date()
      const difference = targetDateTime.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000))
        setIsExpired(false)
      } else {
        setTimeLeft(0)
        setIsExpired(true)
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, targetTime])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) {
      return showFormat ? { days: 0, hours: 0, minutes: 0, seconds: 0 } : "00:00:00"
    }

    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (showFormat) {
      return { days, hours, minutes, seconds: secs }
    } else {
      const h = String(hours + days * 24).padStart(2, "0")
      const m = String(minutes).padStart(2, "0")
      const s = String(secs).padStart(2, "0")
      return `${h}:${m}:${s}`
    }
  }

  const formattedTime = formatTime(timeLeft)
  const theme = CountdownThemes[template as keyof typeof CountdownThemes] || CountdownThemes.modern

  return (
    <S.CountdownContainer
      $theme={theme}
      $padding={padding as boolean}
      $backgroundColor={backgroundColor as string}
      $backgroundImage={backgroundImage as string}
      $margin={margin as number}
      $isExpired={isExpired}
    >
      {isExpired ? (
        <S.ExpiredMessage>
          <S.ExpiredIcon>🎉</S.ExpiredIcon>
          <S.ExpiredText>Time's Up!</S.ExpiredText>
        </S.ExpiredMessage>
      ) : (
        <>
          {(message || pictureUrl) && (
            <S.EventHeader>
              {pictureUrl && (
                <S.EventPicture
                  src={pictureUrl as string}
                  alt="Event"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
              {message && <S.EventMessage>{nl2br(message as string)}</S.EventMessage>}
            </S.EventHeader>
          )}

          {showTargetInfo && (
            <S.TargetInfo>
                Counting down to{" "}
                {new Date(`${targetDate}T${targetTime}`).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </S.TargetInfo>
          )}

          {showFormat && typeof formattedTime === "object" ? (
            <S.TimeUnit>
              <S.UnitBox>
                <S.UnitValue>{formattedTime.days}</S.UnitValue>
                <S.UnitLabel>Days</S.UnitLabel>
              </S.UnitBox>
              <S.UnitBox>
                <S.UnitValue>{formattedTime.hours}</S.UnitValue>
                <S.UnitLabel>Hours</S.UnitLabel>
              </S.UnitBox>
              <S.UnitBox>
                <S.UnitValue>{formattedTime.minutes}</S.UnitValue>
                <S.UnitLabel>Minutes</S.UnitLabel>
              </S.UnitBox>
              <S.UnitBox>
                <S.UnitValue>{formattedTime.seconds}</S.UnitValue>
                <S.UnitLabel>Seconds</S.UnitLabel>
              </S.UnitBox>
            </S.TimeUnit>
          ) : (
            <S.TimeDisplay $showFormat={showFormat as boolean}>{formattedTime as string}</S.TimeDisplay>
          )}
        </>
      )}
    </S.CountdownContainer>
  )
}
