"use client"

import { Download, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import type { WebtoyInstance, WebtoyDefinition, WebtoyConfig } from "@/types/webtoy"
import { CustomizeTab } from "./CustomizeTab/CustomizeTab"
import { SettingsTab } from "./SettingsTab/SettingsTab"
import { ConfigModal } from "@/editor/ConfigModal/ConfigModal"

import * as S from "./styled"

interface CustomizerTabsProps {
  webtoyInstance?: WebtoyInstance | null
  webtoyDefinition?: WebtoyDefinition | null
  onConfigChange: (instanceId: string, config: WebtoyConfig) => void
}

type ConfigTab = "customize" | "settings"

export function CustomizerTabs({ webtoyInstance, webtoyDefinition, onConfigChange }: CustomizerTabsProps) {
  const [activeTab, setActiveTab] = useState<ConfigTab>("customize")
  const [isMounted, setIsMounted] = useState(false)
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean
    mode: "import" | "export"
  }>({ isOpen: false, mode: "export" })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle ESC to close modal
  useEffect(() => {
    if (!configModal.isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeModal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [configModal.isOpen])

  // Apply global background styles to the page
  useEffect(() => {
    if (!webtoyInstance || !isMounted) return

    const {
      backgroundColor,
      backgroundImage,
      showBackgroundImage,
      backgroundOpacity,
      backgroundBlur,
    } = webtoyInstance.config

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

    body.style.backgroundColor = backgroundColor as string

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
      const opacity = (backgroundOpacity as number) / 100
      const blur = backgroundBlur as number
      overlay.style.backgroundImage = `url(${backgroundImageUrl})`
      overlay.style.backgroundSize = "cover"
      overlay.style.backgroundPosition = "center"
      overlay.style.backgroundRepeat = "no-repeat"
      overlay.style.backgroundAttachment = "fixed"
      overlay.style.opacity = opacity.toString()
      overlay.style.filter = blur > 0 ? `blur(${blur}px)` : "none"
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
  }, [webtoyInstance, isMounted])

  if (!webtoyInstance || !webtoyDefinition) {
    return (
      <S.CustomizerContainer>
        <S.EmptyState>
          <p>Select a WebToy tab to customize its properties</p>
        </S.EmptyState>
      </S.CustomizerContainer>
    )
  }

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...webtoyInstance.config, [key]: value }
    onConfigChange(webtoyInstance.id, newConfig)
  }

  const handleConfigExport = () => {
    setConfigModal({ isOpen: true, mode: "export" })
  }

  const handleConfigImport = () => {
    setConfigModal({ isOpen: true, mode: "import" })
  }

  const handleConfigImportSubmit = (config: any) => {
    if (webtoyInstance) {
      onConfigChange(webtoyInstance.id, config)
    }
  }

  const closeModal = () => {
    setConfigModal({ isOpen: false, mode: "export" })
  }

  return (
    <S.CustomizerContainer>
      <S.Header>
        <S.TabsContainer>
          <S.Tab $active={activeTab === "customize"} onClick={() => setActiveTab("customize")}>
            Customize
          </S.Tab>
          <S.Tab $active={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
            Settings
          </S.Tab>
        </S.TabsContainer>
      </S.Header>

      <S.ConfigContainer>
        {activeTab === "customize" && <CustomizeTab webtoyInstance={webtoyInstance} webtoyDefinition={webtoyDefinition} handleConfigChange={handleConfigChange} />}

        {activeTab === "settings" && <SettingsTab webtoyInstance={webtoyInstance} webtoyDefinition={webtoyDefinition} handleConfigChange={handleConfigChange} />}
      </S.ConfigContainer>

      <S.Footer>
        <S.FooterButton $variant="warning" onClick={handleConfigExport}>
          <S.ButtonIcon>
            <Download size={16} />
          </S.ButtonIcon>
          <S.ButtonText>Export</S.ButtonText>
        </S.FooterButton>
        <S.FooterButton $variant="info" onClick={handleConfigImport}>
          <S.ButtonIcon>
            <Upload size={16} />
          </S.ButtonIcon>
          <S.ButtonText>Import</S.ButtonText>
        </S.FooterButton>
      </S.Footer>

      {/* Config Modal */}
      <ConfigModal
        isOpen={configModal.isOpen}
        mode={configModal.mode}
        webtoyId={webtoyInstance.definitionId}
        webtoyTitle={webtoyInstance.title}
        config={webtoyInstance.config}
        webtoyDefinition={webtoyDefinition}
        onClose={closeModal}
        onImport={handleConfigImportSubmit}
      />
    </S.CustomizerContainer>
  )
}
