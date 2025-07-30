"use client"
import { Plus, X } from "lucide-react"
import * as S from "../styled"

interface WorldTimezonesProps {
  value: string[]
  onChange: (value: string[]) => void
}

const AVAILABLE_TIMEZONES = [
  { value: "America/New_York", label: "New York" },
  { value: "America/Los_Angeles", label: "Los Angeles" },
  { value: "America/Chicago", label: "Chicago" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Berlin", label: "Berlin" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Asia/Shanghai", label: "Shanghai" },
  { value: "Asia/Dubai", label: "Dubai" },
  { value: "Australia/Sydney", label: "Sydney" },
  { value: "America/Sao_Paulo", label: "São Paulo" },
  { value: "Africa/Cairo", label: "Cairo" },
  { value: "Europe/Moscow", label: "Moscow" },
  { value: "Asia/Mumbai", label: "Mumbai" },
  { value: "Pacific/Auckland", label: "Auckland" },
]

export function WorldTimezones({ value: currentTimezones, onChange }: WorldTimezonesProps) {
  const addTimezone = () => {
    const unusedTimezones = AVAILABLE_TIMEZONES.filter((tz) => !currentTimezones.includes(tz.value))
    if (unusedTimezones.length > 0 && currentTimezones.length < 10) {
      const newTimezones = [...currentTimezones, unusedTimezones[0].value]
      onChange(newTimezones)
    }
  }

  const removeTimezone = (timezoneToRemove: string) => {
    const newTimezones = currentTimezones.filter((tz) => tz !== timezoneToRemove)
    onChange(newTimezones)
  }

  const updateTimezone = (index: number, newTimezone: string) => {
    const newTimezones = [...currentTimezones]
    newTimezones[index] = newTimezone
    onChange(newTimezones)
  }

  return (
    <S.WorldTimezonesContainer>
      <S.WorldTimezonesHeader>
        <span>Current Timezones</span>
        <S.AddTimezoneButton onClick={addTimezone} disabled={currentTimezones.length >= 10}>
          <Plus size={14} />
        </S.AddTimezoneButton>
      </S.WorldTimezonesHeader>

      {currentTimezones.length === 0 ? (
        <S.EmptyTimezones>Click + to add world timezones</S.EmptyTimezones>
      ) : (
        <S.TimezonesList>
          {currentTimezones.map((timezone, index) => (
            <S.TimezoneItem key={index}>
              <S.TimezoneSelect value={timezone} onChange={(e) => updateTimezone(index, e.target.value)}>
                {AVAILABLE_TIMEZONES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.TimezoneSelect>
              <S.RemoveTimezoneButton onClick={() => removeTimezone(timezone)}>
                <X size={14} />
              </S.RemoveTimezoneButton>
            </S.TimezoneItem>
          ))}
        </S.TimezonesList>
      )}
    </S.WorldTimezonesContainer>
  )
}
