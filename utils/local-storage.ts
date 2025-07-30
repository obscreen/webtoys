export interface ActiveEditorState {
  activeWebtoys: Array<{
    id: string
    definitionId: string
    title: string
    config: Record<string, any>
  }>
  activeTabId: string | null
  searchTerm: string
}

const STORAGE_KEY = 'webtoy-editor-state'

export class LocalStorageManager {
  static saveState(state: ActiveEditorState): void {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem(STORAGE_KEY, serializedState)
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error)
    }
  }

  static loadState(): ActiveEditorState | null {
    try {
      const serializedState = localStorage.getItem(STORAGE_KEY)
      if (!serializedState) return null
      
      const state = JSON.parse(serializedState)
      
      // Validation basique de la structure
      if (!state || typeof state !== 'object') return null
      if (!Array.isArray(state.activeWebtoys)) return null
      
      return state
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error)
      return null
    }
  }

  static clearState(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear state from localStorage:', error)
    }
  }

  static hasStoredState(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null
    } catch (error) {
      return false
    }
  }
} 