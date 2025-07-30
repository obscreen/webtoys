"use client"
import { useState } from 'react'
import { ExternalLink, FileCode } from "lucide-react"
import { Save, RotateCcw, Trash2, AlertCircle } from 'lucide-react'
import { WebtoyInstance } from '@/types/webtoy'
import { generateStandaloneHTML } from "@/utils/html-export"
import * as S from './styled'

interface EditorStateIndicatorProps {
  webtoyInstance?: WebtoyInstance | null
  hasStoredState: boolean
  onClearState: () => void
  onRestoreState?: () => void
  isSaving?: boolean
  lastSaved?: Date | null
}

export function EditorStateIndicator({
  webtoyInstance,
  hasStoredState,
  onClearState,
  onRestoreState,
  isSaving = false,
  lastSaved
}: EditorStateIndicatorProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  const handleClearState = () => {
    if (showConfirmClear) {
      onClearState()
      setShowConfirmClear(false)
    } else {
      setShowConfirmClear(true)
      // Auto-hide après 3 secondes
      setTimeout(() => setShowConfirmClear(false), 3000)
    }
  }

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes === 1) return '1 minute ago'
    if (minutes < 60) return `${minutes} minutes ago`
    
    const hours = Math.floor(minutes / 60)
    if (hours === 1) return '1 hour ago'
    return `${hours} hours ago`
  }

  const handlePreview = () => {
    if (!webtoyInstance) return

    const params = new URLSearchParams()
    Object.entries(webtoyInstance.config).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        // Handle arrays (like worldTimezones) by joining with commas
        if (Array.isArray(value)) {
          params.set(key, value.join(","))
        } else {
          params.set(key, String(value))
        }
      }
    })

    const exportUrl = `${window.location.origin}/webtoy/${webtoyInstance.definitionId}?${params.toString()}`
    navigator.clipboard.writeText(exportUrl)
    window.open(exportUrl, "_blank")
  }

  const handleHTMLExport = () => {
    if (!webtoyInstance) return

    const htmlContent = generateStandaloneHTML(webtoyInstance.definitionId, webtoyInstance.config, webtoyInstance.title)

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${webtoyInstance.title.toLowerCase().replace(/\s+/g, "-")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <S.Container>
      {
        webtoyInstance && (
          <S.LeftSection>
            <S.TopLabel>
              Deployment
            </S.TopLabel>
            <S.TopButton $variant="primary" onClick={handlePreview}>
              <S.TopButtonIcon>
                <ExternalLink size={16} />
              </S.TopButtonIcon>
            </S.TopButton>
            {/* <S.TopButton $variant="success" onClick={handleHTMLExport}>
              <S.TopButtonIcon>
                <FileCode size={16} />
              </S.TopButtonIcon>
              <S.TopButtonText>Download HTML</S.TopButtonText>
            </S.TopButton> */}
          </S.LeftSection>
        )
      }

      <S.RightSection>
        <S.StatusSection>
          {isSaving ? (
            <S.StatusItem $status="saving">
              <S.StatusIcon>
                <Save size={14} />
              </S.StatusIcon>
              <S.StatusText>Saving...</S.StatusText>
            </S.StatusItem>
          ) : lastSaved ? (
            <S.StatusItem $status="saved">
              <S.StatusIcon>
                <Save size={14} />
              </S.StatusIcon>
              <S.StatusText>{formatLastSaved(lastSaved)}</S.StatusText>
            </S.StatusItem>
          ) : hasStoredState ? (
            <S.StatusItem $status="has-stored">
              <S.StatusIcon>
                <AlertCircle size={14} />
              </S.StatusIcon>
              <S.StatusText>Saved state available</S.StatusText>
            </S.StatusItem>
          ) : null}
        </S.StatusSection>

        {hasStoredState && (
          <S.ActionsSection>
            {onRestoreState && (
              <S.ActionButton
                onClick={onRestoreState}
                title="Restore saved state"
              >
                <RotateCcw size={14} />
              </S.ActionButton>
            )}
            
            <S.ActionButton
              onClick={handleClearState}
              title={showConfirmClear ? "Click to confirm" : "Clear saved state"}
              $danger={showConfirmClear}
            >
              <Trash2 size={14} />
            </S.ActionButton>
          </S.ActionsSection>
        )}
      </S.RightSection>
    </S.Container>
  )
} 