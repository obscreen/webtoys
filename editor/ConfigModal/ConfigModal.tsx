"use client"
import { useState } from "react"
import type React from "react"

import { X, Download, Upload, Copy, Check } from "lucide-react"
import type { WebtoyConfig, WebtoyDefinition } from "@/types/webtoy"
import * as S from "./styled"

interface ConfigModalProps {
  isOpen: boolean
  mode: "import" | "export"
  webtoyId: string
  webtoyTitle: string
  config: WebtoyConfig
  webtoyDefinition?: WebtoyDefinition | null
  onClose: () => void
  onImport: (config: WebtoyConfig) => void
}

export function ConfigModal({
  isOpen,
  mode,
  webtoyId,
  webtoyTitle,
  config,
  webtoyDefinition,
  onClose,
  onImport,
}: ConfigModalProps) {
  const [importMethod, setImportMethod] = useState<"paste" | "file">("paste")
  const [jsonInput, setJsonInput] = useState("")
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const separateConfig = () => {
    const customConfig: any = {}
    const settingsConfig: any = {}

    if (webtoyDefinition) {
      // Separate based on config fields
      webtoyDefinition.configFields.forEach((field) => {
        if (config[field.key] !== undefined) {
          customConfig[field.key] = config[field.key]
        }
      })
    }

    // Settings are global properties
    const settingsKeys = ["backgroundColor", "backgroundImage", "padding", "margin"]
    settingsKeys.forEach((key) => {
      if (config[key] !== undefined) {
        settingsConfig[key] = config[key]
      }
    })

    return { customConfig, settingsConfig }
  }

  const generateExportData = () => {
    const { customConfig, settingsConfig } = separateConfig()

    return {
      webtoyId,
      webtoyTitle,
      exportDate: new Date().toISOString(),
      custom: customConfig,
      settings: settingsConfig,
    }
  }

  const handleCopy = async () => {
    const exportData = generateExportData()
    const jsonString = JSON.stringify(exportData, null, 2)

    try {
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = () => {
    const exportData = generateExportData()
    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${webtoyTitle.toLowerCase().replace(/\s+/g, "-")}-config.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setJsonInput(content)
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const handleImportSubmit = () => {
    try {
      const data = JSON.parse(jsonInput)

      if (!data.custom && !data.settings) {
        alert("Invalid configuration format! Expected 'custom' and 'settings' sections.")
        return
      }

      // Merge custom and settings back together
      const mergedConfig = {
        ...data.custom,
        ...data.settings,
      }

      onImport(mergedConfig)
      onClose()
      setJsonInput("")
    } catch (error) {
      alert("Invalid JSON format! Please check your configuration.")
    }
  }

  const exportData = mode === "export" ? generateExportData() : null
  const exportJson = exportData ? JSON.stringify(exportData, null, 2) : ""

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{mode === "export" ? "Export Configuration" : "Import Configuration"}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          {mode === "export" ? (
            <>
              <S.SectionTitle>Configuration JSON</S.SectionTitle>
              <S.JsonTextarea value={exportJson} readOnly />

              <S.ButtonGroup>
                <S.ActionButton $variant="success" onClick={handleCopy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </S.ActionButton>
                <S.ActionButton $variant="info" onClick={handleDownload}>
                  <Download size={16} />
                  Download File
                </S.ActionButton>
              </S.ButtonGroup>
            </>
          ) : (
            <>
              <S.ImportMethodTabs>
                <S.ImportTab $active={importMethod === "paste"} onClick={() => setImportMethod("paste")}>
                  Paste JSON
                </S.ImportTab>
                <S.ImportTab $active={importMethod === "file"} onClick={() => setImportMethod("file")}>
                  Upload File
                </S.ImportTab>
              </S.ImportMethodTabs>

              {importMethod === "paste" ? (
                <>
                  <S.SectionTitle>Paste Configuration JSON</S.SectionTitle>
                  <S.JsonTextarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your configuration JSON here..."
                  />
                </>
              ) : (
                <>
                  <S.SectionTitle>Upload Configuration File</S.SectionTitle>
                  <S.FileUploadArea>
                    <S.FileInput type="file" accept=".json" onChange={handleFileUpload} id="config-file-input" />
                    <S.FileUploadLabel htmlFor="config-file-input">
                      <Upload size={24} />
                      <span>Click to select a JSON file</span>
                    </S.FileUploadLabel>
                  </S.FileUploadArea>
                  {jsonInput && (
                    <S.FilePreview>
                      <S.PreviewLabel>File content preview:</S.PreviewLabel>
                      <S.JsonTextarea value={jsonInput} readOnly />
                    </S.FilePreview>
                  )}
                </>
              )}

              <S.ButtonGroup>
                <S.ActionButton $variant="danger" onClick={onClose}>
                  Cancel
                </S.ActionButton>
                <S.ActionButton $variant="info" onClick={handleImportSubmit} disabled={!jsonInput.trim()}>
                  Import Configuration
                </S.ActionButton>
              </S.ButtonGroup>
            </>
          )}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}
