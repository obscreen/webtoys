"use client"
import { Github, Plus } from "lucide-react"
import type { WebtoyDefinition } from "@/types/webtoy"
import * as S from "./styled"

interface CatalogProps {
  webtoys: WebtoyDefinition[]
  searchTerm: string
  onSearchChange: (term: string) => void
  onWebtoySelect: (webtoy: WebtoyDefinition) => void
}

export function Catalog({ webtoys, searchTerm, onSearchChange, onWebtoySelect }: CatalogProps) {
  return (
    <S.CatalogContainer>
      <S.Header>
        <S.TitleSection>
          <S.Logo>🎨</S.Logo>
          <S.Title>WebToys</S.Title>
        </S.TitleSection>
        <S.SearchContainer>
          <S.SearchIcon />
          <S.SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </S.SearchContainer>
      </S.Header>

      <S.WebtoysList>
        {webtoys.map((webtoy) => (
          <S.WebtoyCard key={webtoy.id}>
            <S.WebtoyHeader>
              <S.WebtoyIcon>{webtoy.icon}</S.WebtoyIcon>
              <S.WebtoyInfo>
                <S.WebtoyTitle>{webtoy.title}</S.WebtoyTitle>
                <S.WebtoyAuthor>by {webtoy.author}</S.WebtoyAuthor>
              </S.WebtoyInfo>
              <S.AddButton onClick={() => onWebtoySelect(webtoy)}>
                <Plus size={16} />
              </S.AddButton>
            </S.WebtoyHeader>

            <S.WebtoyDescription>{webtoy.description}</S.WebtoyDescription>

            <S.GithubLink href={webtoy.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={12} />
              View on GitHub
            </S.GithubLink>
          </S.WebtoyCard>
        ))}
      </S.WebtoysList>
    </S.CatalogContainer>
  )
}
