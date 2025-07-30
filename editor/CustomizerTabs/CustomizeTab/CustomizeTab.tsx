"use client"
import { useEffect, useState } from "react"
import type { WebtoyInstance, WebtoyDefinition } from "@/types/webtoy"
import { ColorPicker } from "@/components/ui/ColorPicker/ColorPicker"
import { TextInput } from "@/editor/CustomizerTabs/widgets/TextInput"
import { TextareaInput } from "@/editor/CustomizerTabs/widgets/TextareaInput"
import { NumberInput } from "@/editor/CustomizerTabs/widgets/NumberInput"
import { SelectInput } from "@/editor/CustomizerTabs/widgets/SelectInput"
import { RangeSlider } from "@/editor/CustomizerTabs/widgets/RangeSlider"
import { BooleanSwitch } from "@/editor/CustomizerTabs/widgets/BooleanSwitch"
import { DateTimeInput } from "@/editor/CustomizerTabs/widgets/DateTimeInput"
import { WebtoyConfigTypeEnum } from "@/enums/WebtoyConfigTypeEnum"
import * as S from "../styled"

interface CustomizerTabsProps {
  webtoyInstance: WebtoyInstance
  webtoyDefinition: WebtoyDefinition
  handleConfigChange: (key: string, value: any) => void
}

export function CustomizeTab({ webtoyInstance, webtoyDefinition, handleConfigChange }: CustomizerTabsProps) {
  const [customRenderers, setCustomRenderers] = useState<Record<string, any>>({})
  const [isLoadingCustomRenderers, setIsLoadingCustomRenderers] = useState(false)

  useEffect(() => {
    const loadCustomRenderers = async () => {
      if (!webtoyDefinition || !webtoyDefinition.configFields.some(field => field.customRenderer)) {
        return
      }

      try {
        setIsLoadingCustomRenderers(true)
        const module = await import(`@/components/webtoys/${webtoyDefinition.className}/${webtoyDefinition.className}.tsx`)
        setCustomRenderers(module)
      } catch (err) {
        console.error(`Failed to load custom renderers for ${webtoyDefinition.className}:`, err)
      } finally {
        setIsLoadingCustomRenderers(false)
      }
    }

    loadCustomRenderers()
  }, [webtoyDefinition])

  const renderConfigField = (field: any) => {
    const value = webtoyInstance.config[field.key] ?? field.defaultValue

    if (field.customRenderer) {
      const CustomRenderer = customRenderers['renderConfigField']
      if (CustomRenderer) {
        return CustomRenderer(field, value, (newValue: any) => handleConfigChange(field.key, newValue), webtoyInstance.config)
      } else if (isLoadingCustomRenderers) {
        return <div>Loading custom renderer...</div>
      } else {
        return <div>Custom renderer not available</div>
      }
    }

    // Standard field types
    switch (field.type) {
      case WebtoyConfigTypeEnum.Text:
        return <TextInput value={value as string} onChange={(newValue) => handleConfigChange(field.key, newValue)} />

      case WebtoyConfigTypeEnum.Textarea:
        return <TextareaInput value={value as string} onChange={(newValue) => handleConfigChange(field.key, newValue)} placeholder={field.placeholder} />

      case WebtoyConfigTypeEnum.Number:
        return (
          <NumberInput
            value={value as number}
            onChange={(newValue) => handleConfigChange(field.key, newValue)}
            min={field.min}
            max={field.max}
          />
        )

      case WebtoyConfigTypeEnum.Color:
        return <ColorPicker value={value as string} supportAlpha={true} alphaAsHex={true} onChange={(newValue) => handleConfigChange(field.key, newValue)} />

      case WebtoyConfigTypeEnum.Date:
        return (
          <DateTimeInput value={value as string} onChange={(newValue) => handleConfigChange(field.key, newValue)} type="date" />
        )

      case WebtoyConfigTypeEnum.Time:
        return (
          <DateTimeInput
            value={value as string}
            onChange={(newValue) => handleConfigChange(field.key, newValue)}
            type="time"
            step="1"
          />
        )

      case WebtoyConfigTypeEnum.Select:
        return (
          <SelectInput
            value={value as string}
            onChange={(newValue) => handleConfigChange(field.key, newValue)}
            options={field.options}
          />
        )

      case WebtoyConfigTypeEnum.Range:
        return (
          <RangeSlider
            value={value as number}
            onChange={(newValue) => handleConfigChange(field.key, newValue)}
            min={field.min}
            max={field.max}
            step={field.step}
            unit={field.unit}
          />
        )

      case WebtoyConfigTypeEnum.Boolean:
        return (
          <BooleanSwitch
            value={value as boolean}
            onChange={(newValue) => handleConfigChange(field.key, newValue)}
            id={`switch-${field.key}`}
          />
        )

      default:
        return null
    }
  }

  const groupFields = (fields: any[]) => {
    const grouped: any[][] = []
    let currentGroup: any[] = []

    fields.forEach((field) => {
      const isSlider = field.type === WebtoyConfigTypeEnum.Range
      const isButtonGroup = ["textAlign", "scrollDirection"].includes(field.key)
      const isSmallControl = [WebtoyConfigTypeEnum.Color, WebtoyConfigTypeEnum.Boolean].includes(field.type)
      const isDateTime = [WebtoyConfigTypeEnum.Date, WebtoyConfigTypeEnum.Time].includes(field.type)

      if (isSlider) {
        if (currentGroup.length > 0 && !currentGroup.every((f) => f.type === WebtoyConfigTypeEnum.Range)) {
          grouped.push(currentGroup)
          currentGroup = []
        }

        if (currentGroup.length < 2 && currentGroup.every((f) => f.type === WebtoyConfigTypeEnum.Range)) {
          currentGroup.push(field)
        } else {
          if (currentGroup.length > 0) {
            grouped.push(currentGroup)
          }
          currentGroup = [field]
        }
      } else if (isButtonGroup) {
        if (currentGroup.length > 0) {
          grouped.push(currentGroup)
          currentGroup = []
        }
        grouped.push([field])
      } else if (isDateTime) {
        if (currentGroup.length > 0 && !currentGroup.every((f) => [WebtoyConfigTypeEnum.Date, WebtoyConfigTypeEnum.Time].includes(f.type))) {
          grouped.push(currentGroup)
          currentGroup = []
        }

        if (currentGroup.length < 2 && currentGroup.every((f) => [WebtoyConfigTypeEnum.Date, WebtoyConfigTypeEnum.Time].includes(f.type))) {
          currentGroup.push(field)
        } else {
          if (currentGroup.length > 0) {
            grouped.push(currentGroup)
          }
          currentGroup = [field]
        }
      } else if (isSmallControl) {
        if (currentGroup.length > 0 && currentGroup.some((f) => f.type === WebtoyConfigTypeEnum.Range)) {
          grouped.push(currentGroup)
          currentGroup = []
        }

        if (currentGroup.length < 2 && currentGroup.every((f) => [WebtoyConfigTypeEnum.Color, WebtoyConfigTypeEnum.Boolean].includes(f.type))) {
          currentGroup.push(field)
        } else {
          if (currentGroup.length > 0) {
            grouped.push(currentGroup)
          }
          currentGroup = [field]
        }
      } else {
        if (currentGroup.length > 0) {
          grouped.push(currentGroup)
          currentGroup = []
        }
        grouped.push([field])
      }
    })

    if (currentGroup.length > 0) {
      grouped.push(currentGroup)
    }

    return grouped
  }

  return (
    <>
      {groupFields(webtoyDefinition.configFields).map((fieldGroup, groupIndex) => (
        <S.ConfigGroup key={groupIndex}>
          {fieldGroup.length === 1 ? (
            (() => {
              const rendered = renderConfigField(fieldGroup[0]);
              if (rendered == null) return null;
              return (
                <div>
                  <S.ConfigLabel>{fieldGroup[0].label}</S.ConfigLabel>
                  {rendered}
                </div>
              );
            })()
          ) : (
            <S.ConfigRow>
              {fieldGroup.map((field) => {
                const rendered = renderConfigField(field);
                if (rendered == null) return null;
                return (
                  <S.ConfigColumn key={field.key}>
                    <S.ConfigLabel>{field.label}</S.ConfigLabel>
                    {rendered}
                  </S.ConfigColumn>
                );
              })}
            </S.ConfigRow>
          )}
        </S.ConfigGroup>
      ))}
    </>
  )
}
