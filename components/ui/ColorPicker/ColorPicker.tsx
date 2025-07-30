"use client"
import React, { useState, useRef, useEffect, useCallback } from "react"

import * as S from "./styled"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  supportAlpha?: boolean
  forceOpen?: boolean
  embedded?: boolean
  alphaAsHex?: boolean
}

interface HSVColor {
  h: number // 0-360
  s: number // 0-100
  v: number // 0-100
  a: number // 0-1
}

interface RGBAColor {
  r: number
  g: number
  b: number
  a: number
}

export function ColorPicker({ value, onChange, label, supportAlpha = false, forceOpen = false, embedded = false, alphaAsHex = false }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(forceOpen || embedded)
  const [currentColor, setCurrentColor] = useState<HSVColor>({ h: 0, s: 100, v: 100, a: 1 })
  const [isDragging, setIsDragging] = useState<"saturation" | "hue" | "alpha" | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const saturationRef = useRef<HTMLDivElement>(null)
  const hueRef = useRef<HTMLDivElement>(null)
  const alphaRef = useRef<HTMLDivElement>(null)

  // Convert hex/rgba to HSV
  const parseColor = useCallback((colorStr: string): HSVColor => {
    let r = 0,
      g = 0,
      b = 0,
      a = 1

    if (colorStr.startsWith("#")) {
      const hex = colorStr.slice(1)
      if (hex.length === 6) {
        r = Number.parseInt(hex.slice(0, 2), 16)
        g = Number.parseInt(hex.slice(2, 4), 16)
        b = Number.parseInt(hex.slice(4, 6), 16)
      } else if (hex.length === 8) {
        r = Number.parseInt(hex.slice(0, 2), 16)
        g = Number.parseInt(hex.slice(2, 4), 16)
        b = Number.parseInt(hex.slice(4, 6), 16)
        a = Number.parseInt(hex.slice(6, 8), 16) / 255
      }
    } else if (colorStr.startsWith("rgba")) {
      const match = colorStr.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?$$/)
      if (match) {
        r = Number.parseInt(match[1])
        g = Number.parseInt(match[2])
        b = Number.parseInt(match[3])
        a = match[4] ? Number.parseFloat(match[4]) : 1
      }
    }

    return rgbToHsv({ r, g, b, a })
  }, [])

  // Convert RGB to HSV
  const rgbToHsv = (rgb: RGBAColor): HSVColor => {
    const { r, g, b, a } = rgb
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const diff = max - min

    let h = 0
    if (diff !== 0) {
      if (max === rNorm) h = ((gNorm - bNorm) / diff) % 6
      else if (max === gNorm) h = (bNorm - rNorm) / diff + 2
      else h = (rNorm - gNorm) / diff + 4
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360

    const s = max === 0 ? 0 : Math.round((diff / max) * 100)
    const v = Math.round(max * 100)

    return { h, s, v, a }
  }

  // Convert HSV to RGB
  const hsvToRgb = (hsv: HSVColor): RGBAColor => {
    const { h, s, v, a } = hsv
    const sNorm = s / 100
    const vNorm = v / 100

    const c = vNorm * sNorm
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = vNorm - c

    let r = 0,
      g = 0,
      b = 0

    if (h >= 0 && h < 60) {
      r = c
      g = x
      b = 0
    } else if (h >= 60 && h < 120) {
      r = x
      g = c
      b = 0
    } else if (h >= 120 && h < 180) {
      r = 0
      g = c
      b = x
    } else if (h >= 180 && h < 240) {
      r = 0
      g = x
      b = c
    } else if (h >= 240 && h < 300) {
      r = x
      g = 0
      b = c
    } else if (h >= 300 && h < 360) {
      r = c
      g = 0
      b = x
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
      a,
    }
  }

  // Format color as string
  const formatColor = (hsv: HSVColor): string => {
    const rgb = hsvToRgb(hsv)
    
    // Format HEX with alpha if alphaAsHex is true
    if (alphaAsHex && supportAlpha) {
      if (rgb.a == null || rgb.a === 1) {
        return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`
      }
      const alphaHex = Math.round(rgb.a * 255).toString(16).padStart(2, "0")
      return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}${alphaHex}`
    }
    
    // Format RGBA if alpha is supported and less than 1
    if (supportAlpha && rgb.a < 1) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`
    }
    
    // Default HEX format
    return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`
  }

  // Initialize color from value
  useEffect(() => {
    setCurrentColor(parseColor(value))
  }, [value, parseColor])

  // Handle clicks outside
  useEffect(() => {
    // Ne pas gérer les clics outside si forceOpen ou embedded est activé
    if (forceOpen || embedded) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, forceOpen, embedded])

  // Handle mouse events
  const handleMouseDown = (type: "saturation" | "hue" | "alpha") => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
    handleMouseMove(type)(e)
  }

  const handleMouseMove = (type: "saturation" | "hue" | "alpha") => (e: React.MouseEvent | MouseEvent) => {
    if (type === "saturation" && saturationRef.current) {
      const rect = saturationRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

      const newColor = {
        ...currentColor,
        s: Math.round(x * 100),
        v: Math.round((1 - y) * 100),
      }
      setCurrentColor(newColor)
      onChange(formatColor(newColor))
    } else if (type === "hue" && hueRef.current) {
      const rect = hueRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

      const newColor = {
        ...currentColor,
        h: Math.round(x * 360),
      }
      setCurrentColor(newColor)
      onChange(formatColor(newColor))
    } else if (type === "alpha" && alphaRef.current && supportAlpha) {
      const rect = alphaRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

      const newColor = {
        ...currentColor,
        a: Math.round(x * 100) / 100,
      }
      setCurrentColor(newColor)
      onChange(formatColor(newColor))
    }
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(isDragging)(e)
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(null)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging])

  const currentRgb = hsvToRgb(currentColor)
  const previewColor = formatColor(currentColor)

  return (
    <S.ColorPickerContainer ref={containerRef}>
      {label && <S.ColorPickerLabel>{label}</S.ColorPickerLabel>}

      {!forceOpen && (
        <S.ColorPickerTrigger 
          onClick={embedded ? undefined : () => setIsOpen(!isOpen)}
          $disabled={embedded}
        >
          <S.ColorPreview $color={previewColor} />
          <S.ColorValue>{previewColor}</S.ColorValue>
          {!embedded && <S.DropdownIcon $isOpen={isOpen}>▼</S.DropdownIcon>}
        </S.ColorPickerTrigger>
      )}

      {(isOpen || forceOpen) && (
        embedded ? (
          <S.ColorPickerEmbedded>
            {/* Saturation/Value Picker */}
            <S.SaturationPicker ref={saturationRef} $hue={currentColor.h} onMouseDown={handleMouseDown("saturation")}>
              <S.SaturationCursor $x={currentColor.s} $y={100 - currentColor.v} />
            </S.SaturationPicker>

            {/* Hue Slider */}
            <S.HueSlider ref={hueRef} onMouseDown={handleMouseDown("hue")}>
              <S.HueCursor $position={(currentColor.h / 360) * 100} />
            </S.HueSlider>

            {/* Alpha Slider */}
            {supportAlpha && (
              <S.AlphaSlider
                ref={alphaRef}
                $color={`rgb(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b})`}
                onMouseDown={handleMouseDown("alpha")}
              >
                <S.AlphaCursor $position={currentColor.a * 100} />
              </S.AlphaSlider>
            )}

            {/* Color Preview */}
            <S.ColorPreviewLarge $color={previewColor} />

            {/* RGB Values */}
            <S.ColorValues>
              <S.ColorValueGroup>
                <S.ColorValueLabel>R</S.ColorValueLabel>
                <S.ColorValueInput
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.r}
                  onChange={(e) => {
                    const r = Math.max(0, Math.min(255, Number.parseInt(e.target.value) || 0))
                    const newColor = rgbToHsv({ ...currentRgb, r })
                    setCurrentColor(newColor)
                    onChange(formatColor(newColor))
                  }}
                />
              </S.ColorValueGroup>

              <S.ColorValueGroup>
                <S.ColorValueLabel>G</S.ColorValueLabel>
                <S.ColorValueInput
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.g}
                  onChange={(e) => {
                    const g = Math.max(0, Math.min(255, Number.parseInt(e.target.value) || 0))
                    const newColor = rgbToHsv({ ...currentRgb, g })
                    setCurrentColor(newColor)
                    onChange(formatColor(newColor))
                  }}
                />
              </S.ColorValueGroup>

              <S.ColorValueGroup>
                <S.ColorValueLabel>B</S.ColorValueLabel>
                <S.ColorValueInput
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.b}
                  onChange={(e) => {
                    const b = Math.max(0, Math.min(255, Number.parseInt(e.target.value) || 0))
                    const newColor = rgbToHsv({ ...currentRgb, b })
                    setCurrentColor(newColor)
                    onChange(formatColor(newColor))
                  }}
                />
              </S.ColorValueGroup>

              {supportAlpha && (
                <S.ColorValueGroup>
                  <S.ColorValueLabel>A</S.ColorValueLabel>
                  <S.ColorValueInput
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentRgb.a.toFixed(2)}
                    onChange={(e) => {
                      const a = Math.max(0, Math.min(1, Number.parseFloat(e.target.value) || 0))
                      const newColor = { ...currentColor, a }
                      setCurrentColor(newColor)
                      onChange(formatColor(newColor))
                    }}
                  />
                </S.ColorValueGroup>
              )}
            </S.ColorValues>
          </S.ColorPickerEmbedded>
        ) : (
          <S.ColorPickerDropdown>
            {/* Saturation/Value Picker */}
            <S.SaturationPicker ref={saturationRef} $hue={currentColor.h} onMouseDown={handleMouseDown("saturation")}>
              <S.SaturationCursor $x={currentColor.s} $y={100 - currentColor.v} />
            </S.SaturationPicker>

            {/* Hue Slider */}
            <S.HueSlider ref={hueRef} onMouseDown={handleMouseDown("hue")}>
              <S.HueCursor $position={(currentColor.h / 360) * 100} />
            </S.HueSlider>

            {/* Alpha Slider */}
            {supportAlpha && (
              <S.AlphaSlider
                ref={alphaRef}
                $color={`rgb(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b})`}
                onMouseDown={handleMouseDown("alpha")}
              >
                <S.AlphaCursor $position={currentColor.a * 100} />
              </S.AlphaSlider>
            )}

            {/* Color Preview */}
            <S.ColorPreviewLarge $color={previewColor} />

            {/* RGB Values */}
            <S.ColorValues>
              <S.ColorValueGroup>
                <S.ColorValueLabel>R</S.ColorValueLabel>
                <S.ColorValueInput
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.r}
                  onChange={(e) => {
                    const r = Math.max(0, Math.min(255, Number.parseInt(e.target.value) || 0))
                    const newColor = rgbToHsv({ ...currentRgb, r })
                    setCurrentColor(newColor)
                    onChange(formatColor(newColor))
                  }}
                />
              </S.ColorValueGroup>

              <S.ColorValueGroup>
                <S.ColorValueLabel>G</S.ColorValueLabel>
                <S.ColorValueInput
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.g}
                  onChange={(e) => {
                    const g = Math.max(0, Math.min(255, Number.parseInt(e.target.value) || 0))
                    const newColor = rgbToHsv({ ...currentRgb, g })
                    setCurrentColor(newColor)
                    onChange(formatColor(newColor))
                  }}
                />
              </S.ColorValueGroup>

              <S.ColorValueGroup>
                <S.ColorValueLabel>B</S.ColorValueLabel>
                <S.ColorValueInput
                  type="number"
                  min="0"
                  max="255"
                  value={currentRgb.b}
                  onChange={(e) => {
                    const b = Math.max(0, Math.min(255, Number.parseInt(e.target.value) || 0))
                    const newColor = rgbToHsv({ ...currentRgb, b })
                    setCurrentColor(newColor)
                    onChange(formatColor(newColor))
                  }}
                />
              </S.ColorValueGroup>

              {supportAlpha && (
                <S.ColorValueGroup>
                  <S.ColorValueLabel>A</S.ColorValueLabel>
                  <S.ColorValueInput
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentRgb.a.toFixed(2)}
                    onChange={(e) => {
                      const a = Math.max(0, Math.min(1, Number.parseFloat(e.target.value) || 0))
                      const newColor = { ...currentColor, a }
                      setCurrentColor(newColor)
                      onChange(formatColor(newColor))
                    }}
                  />
                </S.ColorValueGroup>
              )}
            </S.ColorValues>
          </S.ColorPickerDropdown>
        )
      )}
    </S.ColorPickerContainer>
  )
}
