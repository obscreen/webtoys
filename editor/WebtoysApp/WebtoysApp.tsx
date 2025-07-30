"use client"

import { useCallback } from "react"
import { Catalog } from "@/editor/Catalog/Catalog"
import { ActiveEditor } from "@/editor/ActiveEditor/ActiveEditor"
import { CustomizerTabs } from "@/editor/CustomizerTabs/CustomizerTabs"
import { Footer } from "@/components/common/Footer/Footer"
import { EditorStateIndicator } from "@/components/common/EditorStateIndicator/EditorStateIndicator"
import type { WebtoyDefinition } from "@/types/webtoy"
import { useWebtoysLibrary } from "@/contexts/WebtoysLibraryContext"
import { useActiveEditorPersistence } from "@/hooks/use-webtoy-editor-persistence"
import { loadDefaultValues } from "@/lib/webtoy-loader"
import * as S from "./styled"

export function WebtoysApp() {
  const { loadedWebtoys, isLoading } = useWebtoysLibrary()
  const {
    activeWebtoys,
    activeTabId,
    searchTerm,
    setSearchTerm,
    setActiveTabId,
    addWebtoy: addWebtoyToState,
    removeWebtoy,
    updateWebtoyConfig,
    clearStoredState,
    hasStoredState,
    isSaving,
    lastSaved
  } = useActiveEditorPersistence()

  const addWebtoy = useCallback((definition: WebtoyDefinition) => {
    const newInstance = {
      id: `${definition.id}-${Date.now()}`,
      definitionId: definition.id,
      title: definition.title,
      config: loadDefaultValues(definition.defaultConfig)
    }

    addWebtoyToState(newInstance)
  }, [addWebtoyToState])

  const activeWebtoy = activeWebtoys.find((w) => w.id === activeTabId)
  const activeDefinition = activeWebtoy ? loadedWebtoys[activeWebtoy.definitionId] : null

  const filteredWebtoys = Object.values(loadedWebtoys).filter(
    (webtoy: WebtoyDefinition) => {
      return (
        webtoy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webtoy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webtoy.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  )

  if (isLoading) {
    return null;
  }

  return (
    <S.AppContainer>
      <S.MainContent>
        <S.LeftPanel>
          <Catalog
            webtoys={filteredWebtoys}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onWebtoySelect={addWebtoy}
          />
        </S.LeftPanel>

        <S.CenterPanel>
          <EditorStateIndicator
            webtoyInstance={activeWebtoy}
            hasStoredState={hasStoredState}
            onClearState={clearStoredState}
            isSaving={isSaving}
            lastSaved={lastSaved}
          />
          <ActiveEditor
            activeWebtoys={activeWebtoys}
            activeTabId={activeTabId}
            onTabSelect={setActiveTabId}
            onTabClose={removeWebtoy}
          />
        </S.CenterPanel>

        <S.RightPanel>
          <CustomizerTabs
            webtoyInstance={activeWebtoy}
            webtoyDefinition={activeDefinition}
            onConfigChange={updateWebtoyConfig}
          />
        </S.RightPanel>
      </S.MainContent>

      <Footer />
    </S.AppContainer>
  )
}
