"use client"

import { useEffect } from "react"
import { WebtoyRenderer } from "@/components/common/WebtoyRenderer/WebtoyRenderer"
import * as S from "@/components/pages/WebtoyIdPage/styled"
import { WebtoyDefinition } from "@/types/webtoy"
import { getGlobalSettings } from "@/enums/WebtoySettingsEnum"
import { inflateConfig } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

interface WebtoyClientProps {
  webtoyDefinition: WebtoyDefinition
}

export default function WebtoyClient({ webtoyDefinition }: WebtoyClientProps) {
  if (!webtoyDefinition) {
    return <div>Webtoy not found</div>
  }

  const searchParams = useSearchParams()
  const config: any = { ...webtoyDefinition.defaultConfig }
  inflateConfig(config, webtoyDefinition.configFields, searchParams)
  inflateConfig(config, Object.values(getGlobalSettings()), searchParams)

  useEffect(() => {
    const {
      backgroundColor,
      backgroundImage,
      showBackgroundImage,
      backgroundOpacity,
      backgroundBlur,
    } = config

    const body = document.body
    const backgroundImageUrl = backgroundImage && showBackgroundImage ? backgroundImage : ""

    if (backgroundImageUrl) {
      body.style.backgroundImage = `url(${backgroundImageUrl})`
      body.style.backgroundSize = "cover"
      body.style.backgroundPosition = "center"
      body.style.backgroundRepeat = "no-repeat"
      body.style.backgroundAttachment = "fixed"
    } else {
      body.style.backgroundImage = ""
    }

    body.style.backgroundColor = backgroundColor

    // Apply overlay for opacity and blur
    let overlay = document.getElementById("background-overlay")
    if (!overlay) {
      overlay = document.createElement("div")
      overlay.id = "background-overlay"
      overlay.style.position = "fixed"
      overlay.style.top = "0"
      overlay.style.left = "0"
      overlay.style.width = "100%"
      overlay.style.height = "100%"
      overlay.style.pointerEvents = "none"
      overlay.style.zIndex = "-1"
      document.body.appendChild(overlay)
    }

    if (backgroundImageUrl) {
      const opacity = backgroundOpacity / 100
      overlay.style.backgroundImage = `url(${backgroundImageUrl})`
      overlay.style.backgroundSize = "cover"
      overlay.style.backgroundPosition = "center"
      overlay.style.backgroundRepeat = "no-repeat"
      overlay.style.backgroundAttachment = "fixed"
      overlay.style.opacity = opacity.toString()
      overlay.style.filter = backgroundBlur > 0 ? `blur(${backgroundBlur}px)` : "none"
      overlay.style.display = "block"
    } else {
      overlay.style.display = "none"
    }

    // Cleanup function
    return () => {
      const overlay = document.getElementById("background-overlay")
      if (overlay) {
        overlay.remove()
      }
      body.style.backgroundImage = ""
      body.style.backgroundColor = ""
    }
  }, [webtoyDefinition, searchParams])

  return (
    <S.StandaloneContainer>
      <S.WebtoyWrapper>
        <WebtoyRenderer definition={webtoyDefinition} config={config} />
      </S.WebtoyWrapper>
    </S.StandaloneContainer>
  )
}
