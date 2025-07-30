// import { type NextRequest, NextResponse } from "next/server"
// import { generateStandaloneHTML } from "@/utils/html-export"
// import { useWebtoysLibrary } from "@/contexts/WebtoysLibraryContext"
// import { getGlobalSettings } from "@/enums/WebtoySettingsEnum"
// import { inflateConfig } from "@/lib/utils"

// // GET /api/download?webtoyId=countdown&targetDate=2024-12-25&...
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const webtoyId = searchParams.get("webtoyId")
//     const { loadedWebtoys } = useWebtoysLibrary()
//     if (!webtoyId) {
//       return NextResponse.json({ error: "Missing webtoyId parameter" }, { status: 400 })
//     }

//     // Find the webtoy definition
//     const webtoyDefinition = loadedWebtoys[webtoyId]
//     if (!webtoyDefinition) {
//       return NextResponse.json({ error: `Webtoy '${webtoyId}' not found` }, { status: 404 })
//     }

//     // Build config from URL parameters
//     const config: any = { ...webtoyDefinition.configFields.map((field) => field.defaultValue) }

//     // Process webtoy-specific fields
//     inflateConfig(config, webtoyDefinition.configFields, searchParams)

//     // Process global settings
//     inflateConfig(config, Object.values(getGlobalSettings()), searchParams)

//     // Generate HTML
//     const htmlContent = generateStandaloneHTML(webtoyId, config, webtoyDefinition.title)

//     // Create filename
//     const filename = `${webtoyDefinition.title.toLowerCase().replace(/\s+/g, "-")}.html`

//     // Return HTML file with download headers
//     return new NextResponse(htmlContent, {
//       status: 200,
//       headers: {
//         "Content-Type": "text/html",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//         "Cache-Control": "no-cache",
//       },
//     })
//   } catch (error) {
//     console.error("Download error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// // POST /api/download with JSON body
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { webtoyId, config, title } = body
//     const { loadedWebtoys } = useWebtoysLibrary()

//     if (!webtoyId) {
//       return NextResponse.json({ error: "Missing webtoyId in request body" }, { status: 400 })
//     }

//     if (!config) {
//       return NextResponse.json({ error: "Missing config in request body" }, { status: 400 })
//     }

//     // Find the webtoy definition for validation
//     const webtoyDefinition = loadedWebtoys[webtoyId]
//     if (!webtoyDefinition) {
//       return NextResponse.json({ error: `Webtoy '${webtoyId}' not found` }, { status: 404 })
//     }

//     // Use provided title or fallback to definition title
//     const webtoyTitle = title || webtoyDefinition.title

//     // Generate HTML
//     const htmlContent = generateStandaloneHTML(webtoyId, config, webtoyTitle)

//     // Create filename
//     const filename = `${webtoyTitle.toLowerCase().replace(/\s+/g, "-")}.html`

//     // Return HTML file with download headers
//     return new NextResponse(htmlContent, {
//       status: 200,
//       headers: {
//         "Content-Type": "text/html",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//         "Cache-Control": "no-cache",
//       },
//     })
//   } catch (error) {
//     console.error("Download error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
