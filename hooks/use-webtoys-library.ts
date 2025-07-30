import { useContext } from "react"
import { WebtoysLibraryContext } from "@/contexts/WebtoysLibraryContext"

export function useWebtoysLibrary() {
  const { loadedWebtoys, isLoading } = useContext(WebtoysLibraryContext)
  return { loadedWebtoys, isLoading }
}
