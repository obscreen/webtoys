"use client"
import { X } from "lucide-react"
import type { WebtoyInstance } from "@/types/webtoy"
import { WebtoyRenderer } from "@/components/common/WebtoyRenderer/WebtoyRenderer"
import { useWebtoysLibrary } from "@/contexts/WebtoysLibraryContext"
import * as S from "./styled"

interface ActiveEditorProps {
  activeWebtoys: WebtoyInstance[]
  activeTabId: string | null
  onTabSelect: (id: string) => void
  onTabClose: (id: string) => void
}

export function ActiveEditor({
  activeWebtoys,
  activeTabId,
  onTabSelect,
  onTabClose,
}: ActiveEditorProps) {
  const activeWebtoy = activeWebtoys.find((w) => w.id === activeTabId)
  const { loadedWebtoys } = useWebtoysLibrary()
  const activeDefinition = activeWebtoy ? loadedWebtoys[activeWebtoy.definitionId] : null

  if (activeWebtoys.length === 0) {
    return (
      <S.EditorContainer>
        <S.EmptyState>
          <S.EmptyTitle>No WebToy Open</S.EmptyTitle>
          <S.EmptyDescription>Select one from the catalog to start building</S.EmptyDescription>
        </S.EmptyState>
      </S.EditorContainer>
    )
  }

  return (
    <S.EditorContainer>
      <S.TabsContainer>
        {activeWebtoys.map((webtoy) => (
          <S.Tab key={webtoy.id} $active={webtoy.id === activeTabId} onClick={() => onTabSelect(webtoy.id)}>
            <S.TabTitle>{webtoy.title}</S.TabTitle>
            <S.CloseButton
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(webtoy.id)
              }}
            >
              <X size={14} />
            </S.CloseButton>
          </S.Tab>
        ))}
      </S.TabsContainer>

      {activeWebtoy && (
        <S.PreviewContainer>
          {activeDefinition && <WebtoyRenderer definition={activeDefinition} config={activeWebtoy.config} />}
        </S.PreviewContainer>
      )}
    </S.EditorContainer>
  )
}
