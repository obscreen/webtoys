import WebtoyClient from "./WebtoyClient"
import { loadAllWebtoys } from "@/lib/webtoy-loader"

interface WebtoyPageProps {
  params: { id: string }
}

export default async function WebtoyPage({ params }: WebtoyPageProps) {
  const loadedWebtoys = await loadAllWebtoys()
  const { id } = await params
  const webtoyDefinition = loadedWebtoys[id]
  return <WebtoyClient webtoyDefinition={webtoyDefinition} />
}
