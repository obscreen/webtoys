"use client"
import type { WebtoyInstance, WebtoyDefinition } from "@/types/webtoy"
import { ColorPicker } from "@/components/ui/ColorPicker/ColorPicker"
import { TextInput } from "@/editor/CustomizerTabs/widgets/TextInput"
import { RangeSlider } from "@/editor/CustomizerTabs/widgets/RangeSlider"
import { BooleanSwitch } from "@/editor/CustomizerTabs/widgets/BooleanSwitch"

import * as S from "../styled"

interface CustomizerTabsProps {
  webtoyInstance: WebtoyInstance
  webtoyDefinition: WebtoyDefinition
  handleConfigChange: (key: string, value: any) => void
}

export function SettingsTab({ webtoyInstance, webtoyDefinition, handleConfigChange }: CustomizerTabsProps) {
  return (
    <>
        <S.ConfigGroup>
            <S.ConfigRow>
            <S.ConfigColumn>
                <S.ConfigLabel>Background Color</S.ConfigLabel>
                <ColorPicker
                value={webtoyInstance.config.backgroundColor as string || "#ffffff"}
                onChange={(color) => handleConfigChange("backgroundColor", color)}
                />
            </S.ConfigColumn>
            </S.ConfigRow>
        </S.ConfigGroup>

        <S.ConfigGroup>
            <S.ConfigLabel>Background Image URL</S.ConfigLabel>
            <TextInput
            value={webtoyInstance.config.backgroundImage as string || ""}
            onChange={(value) => handleConfigChange("backgroundImage", value)}
            placeholder="https://example.com/image.jpg"
            type="url"
            />
        </S.ConfigGroup>

        <S.ConfigGroup>
            <S.ConfigRow>
            <S.ConfigColumn>
                <S.ConfigLabel>Show Background Image</S.ConfigLabel>
                <BooleanSwitch
                value={webtoyInstance.config.showBackgroundImage !== false}
                onChange={(value) => handleConfigChange("showBackgroundImage", value)}
                id="switch-show-bg"
                />
            </S.ConfigColumn>
            <S.ConfigColumn>
                <S.ConfigLabel>Margin</S.ConfigLabel>
                <RangeSlider
                value={webtoyInstance.config.margin as number || 0}
                onChange={(value) => handleConfigChange("margin", value)}
                min={0}
                max={100}
                step={5}
                unit="px"
                />
            </S.ConfigColumn>
            </S.ConfigRow>
        </S.ConfigGroup>

        <S.ConfigGroup>
            <S.ConfigRow>
            <S.ConfigColumn>
                <S.ConfigLabel>Background Opacity</S.ConfigLabel>
                <RangeSlider
                value={webtoyInstance.config.backgroundOpacity as number || 100}
                onChange={(value) => handleConfigChange("backgroundOpacity", value)}
                min={0}
                max={100}
                step={5}
                unit="%"
                />
            </S.ConfigColumn>
            <S.ConfigColumn>
                <S.ConfigLabel>Background Blur</S.ConfigLabel>
                <RangeSlider
                value={webtoyInstance.config.backgroundBlur as number || 0}
                onChange={(value) => handleConfigChange("backgroundBlur", value)}
                min={0}
                max={20}
                step={1}
                unit="px"
                />
            </S.ConfigColumn>
            </S.ConfigRow>
        </S.ConfigGroup>
    </>
  )
}
