"use client"

import { useState } from "react"
import { Cloud, Sun, CloudRain, MapPin } from "lucide-react"
import type { WebtoyConfig } from "@/types/webtoy"
import { WeatherThemes } from "./themes"
import * as S from "./styled"

interface WeatherScreenWebtoyProps {
  config: WebtoyConfig
}

export function WeatherScreenWebtoy({ config }: WeatherScreenWebtoyProps) {
  const {
    location = "Paris, France",
    template = "modern",
    backgroundImage = "",
    margin = 0,
    padding = true,
    enableAnimations = true,
  } = config

  // Mock weather data
  const [weatherData] = useState({
    temperature: 22,
    description: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
  })

  const getWeatherIcon = () => {
    const iconProps = { size: 64 }
    switch (weatherData.description.toLowerCase()) {
      case "sunny":
        return <Sun {...iconProps} />
      case "rainy":
        return <CloudRain {...iconProps} />
      default:
        return <Cloud {...iconProps} />
    }
  }

  const theme = WeatherThemes[template as keyof typeof WeatherThemes] || WeatherThemes.modern

  return (
    <S.WeatherContainer
      $theme={theme}
      $backgroundImage={backgroundImage as string}
      $margin={margin as number}
      $padding={padding as boolean}
    >
      <S.LocationHeader $enableAnimations={enableAnimations as boolean} $delay={0}>
        <MapPin size={16} />
        {location as string}
      </S.LocationHeader>

      <S.MainWeather>
        <S.TemperatureSection>
          <S.Temperature $enableAnimations={enableAnimations as boolean} $delay={0.2}>
            {weatherData.temperature}°C
          </S.Temperature>
          <S.Description $enableAnimations={enableAnimations as boolean} $delay={0.3}>
            {weatherData.description}
          </S.Description>
        </S.TemperatureSection>

        <S.WeatherIcon $enableAnimations={enableAnimations as boolean} $delay={0.4}>
          {getWeatherIcon()}
        </S.WeatherIcon>
      </S.MainWeather>

      <S.WeatherDetails>
        {[
          { label: "Humidity", value: `${weatherData.humidity}%` },
          { label: "Wind", value: `${weatherData.windSpeed} km/h` },
          { label: "Pressure", value: `${weatherData.pressure} hPa` },
          { label: "Visibility", value: `${weatherData.visibility} km` },
        ].map((detail, index) => (
          <S.DetailItem key={detail.label} $enableAnimations={enableAnimations as boolean} $delay={0.5 + index * 0.1}>
            <S.DetailLabel>{detail.label}</S.DetailLabel>
            <S.DetailValue>{detail.value}</S.DetailValue>
          </S.DetailItem>
        ))}
      </S.WeatherDetails>
    </S.WeatherContainer>
  )
}
