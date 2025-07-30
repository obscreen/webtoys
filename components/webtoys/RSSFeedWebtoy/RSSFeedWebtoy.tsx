"use client"

import { useState, useEffect } from "react"

import type { WebtoyConfig } from "@/types/webtoy"
import { ScrollDirectionButtons } from "@/editor/CustomizerTabs/widgets/ScrollDirectionButtons"
import { interpolateRange } from "@/utils/util-math"
import { nl2br } from "@/utils/util-string"

import * as S from "./styled"

interface RSSItem {
  title: string
  description: string
  pubDate: Date
  link: string
}

interface RSSFeedWebtoyProps {
  config: WebtoyConfig
}

// Mock RSS data as fallback
const MOCK_RSS_DATA: RSSItem[] = [
  {
    title: "Sample News Article 1",
    description: "This is a sample news article description to demonstrate the RSS feed functionality.",
    pubDate: new Date(),
    link: "#",
  },
  {
    title: "Technology Update",
    description: "Latest developments in web technology and modern frameworks for developers.",
    pubDate: new Date(Date.now() - 3600000),
    link: "#",
  },
  {
    title: "Breaking News",
    description: "Important updates from around the world in various sectors and industries.",
    pubDate: new Date(Date.now() - 7200000),
    link: "#",
  },
  {
    title: "Sports Headlines",
    description: "Latest sports news and updates from major leagues and tournaments.",
    pubDate: new Date(Date.now() - 10800000),
    link: "#",
  },
  {
    title: "Weather Report",
    description: "Current weather conditions and forecast for the upcoming week.",
    pubDate: new Date(Date.now() - 14400000),
    link: "#",
  },
]

// Helper function to create a timeout promise
const createTimeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), ms)
  })
}

// Helper function to fetch with timeout
const fetchWithTimeout = async (url: string, timeoutMs = 10000) => {
  return Promise.race([
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    }),
    createTimeoutPromise(timeoutMs),
  ]) as Promise<Response>
}

export function RSSFeedWebtoy({ config }: RSSFeedWebtoyProps) {
  const {
    rssUrl = "https://feeds.bbci.co.uk/news/rss.xml",
    template = "{{ title }} - {{ description }}",
    maxItems = 5,
    scrollDirection = "vertical",
    scrollSpeed = 15,
    refreshInterval = 300,
    textColor = "#333333",
    backgroundColor = "#ffffff",
    fontSize = 16,
    fontFamily = "Arial, sans-serif",
    padding = true,
    backgroundImage = "",
    margin = 0,
  } = config

  const [items, setItems] = useState<RSSItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  const fetchRSSFeed = async () => {
    try {
      setLoading(true)
      setError(null)
      setUsingMockData(false)

      // Try multiple CORS proxy services
      const proxyServices = [
        `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl as string)}`,
        `https://corsproxy.io/?${encodeURIComponent(rssUrl as string)}`,
        `https://cors-anywhere.herokuapp.com/${rssUrl}`,
      ]

      let response: Response | null = null
      let lastError: Error | null = null

      // Try each proxy service
      for (const proxyUrl of proxyServices) {
        try {
          console.log(`Trying to fetch RSS from: ${proxyUrl}`)
          response = await fetchWithTimeout(proxyUrl, 10000) // 10 second timeout

          if (response.ok) {
            break // Success, exit the loop
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
        } catch (err) {
          lastError = err as Error
          console.warn(`Failed to fetch from ${proxyUrl}:`, err)
          response = null
          continue // Try next proxy
        }
      }

      if (!response || !response.ok) {
        throw lastError || new Error("All proxy services failed")
      }

      const data = await response.json()

      // Handle different proxy response formats
      let xmlContent = ""
      if (data.contents) {
        // allorigins format
        xmlContent = data.contents
      } else if (typeof data === "string") {
        // Direct XML response
        xmlContent = data
      } else {
        throw new Error("Unexpected response format")
      }

      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml")

      // Check for XML parsing errors
      const parserError = xmlDoc.querySelector("parsererror")
      if (parserError) {
        throw new Error("Invalid XML format")
      }

      const rssItems = xmlDoc.querySelectorAll("item")

      if (rssItems.length === 0) {
        throw new Error("No RSS items found in feed")
      }

      const parsedItems: RSSItem[] = Array.from(rssItems)
        .slice(0, maxItems as number)
        .map((item) => ({
          title: item.querySelector("title")?.textContent || "No title",
          description: item.querySelector("description")?.textContent?.replace(/<[^>]*>/g, "") || "No description",
          pubDate: new Date(item.querySelector("pubDate")?.textContent || Date.now()),
          link: item.querySelector("link")?.textContent || "#",
        }))

      setItems(parsedItems)
      console.log(`Successfully loaded ${parsedItems.length} RSS items`)
    } catch (err) {
      console.error("RSS fetch error:", err)

      // Use mock data as fallback
      console.log("Using mock RSS data as fallback")
      setItems(MOCK_RSS_DATA.slice(0, maxItems as number))
      setUsingMockData(true)
      setError(`Unable to load RSS feed. Using sample data. Error: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRSSFeed()
    const interval = setInterval(fetchRSSFeed, (refreshInterval as number) * 1000)
    return () => clearInterval(interval)
  }, [rssUrl, maxItems, refreshInterval])

  const formatTemplate = (item: RSSItem, template: string) => {
    return template
      .replace(/\{\{\s*title\s*\}\}/g, item.title)
      .replace(/\{\{\s*description\s*\}\}/g, item.description)
      .replace(/\{\{\s*pubDate\.month\s*\}\}/g, (item.pubDate.getMonth() + 1).toString())
      .replace(/\{\{\s*pubDate\.year\s*\}\}/g, item.pubDate.getFullYear().toString())
      .replace(/\{\{\s*pubDate\.day\s*\}\}/g, item.pubDate.getDate().toString())
  }

  const scrollSpeedSeconds = interpolateRange(scrollSpeed as number, 0, 100, 0.2, 20, true)

  if (loading) {
    return (
      <S.FeedContainer
        $backgroundColor={backgroundColor as string}
        $padding={padding as boolean}
        $scrollDirection="none"
        $scrollSpeed={scrollSpeedSeconds as number}
        $backgroundImage={backgroundImage as string}
        $margin={margin as number}
      >
        <S.LoadingMessage>
          <S.LoadingSpinner />
          Loading RSS feed...
        </S.LoadingMessage>
      </S.FeedContainer>
    )
  }

  return (
    <S.FeedContainer
      $backgroundColor={backgroundColor as string}
      $padding={padding as boolean}
      $scrollDirection={scrollDirection as string}
      $scrollSpeed={scrollSpeedSeconds as number}
      $backgroundImage={backgroundImage as string}
      $margin={margin as number}
    >
      {error && (
        <S.ErrorBanner $usingMockData={usingMockData}>
          {usingMockData ? "📡 Using sample data - RSS feed unavailable" : `❌ ${error}`}
        </S.ErrorBanner>
      )}

      <S.FeedContent $scrollDirection={scrollDirection as string} $scrollSpeed={scrollSpeedSeconds as number}>
        {items.map((item, index) => (
          <S.FeedItem
            key={`${item.title}-${index}`}
            $scrollDirection={scrollDirection as string}
            $textColor={textColor as string}
            $fontSize={fontSize as number}
            $fontFamily={fontFamily as string}
          >
            {nl2br(formatTemplate(item, template as string))}
          </S.FeedItem>
        ))}
      </S.FeedContent>
    </S.FeedContainer>
  )
}

export function renderConfigField(field: any, value: any, onChange: (value: any) => void, config: any) {
  if (field.key === "scrollDirection") {
    return <ScrollDirectionButtons value={value} onChange={onChange} />
  }

  return null
}
