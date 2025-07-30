export function generateStandaloneHTML(definitionId: string, config: any, title: string): string {
  const configJson = JSON.stringify(config, null, 2)

  const getWebtoyComponent = (id: string) => {
    switch (id) {
      case "simple-text":
        return `
function SimpleTextWebtoy({ config }) {
  const {
    text = "Hello World!",
    fontSize = 24,
    textColor = "#333333",
    backgroundColor = "#ffffff",
    textAlign = "center",
    padding = true,
    scrollDirection = "none",
    scrollSpeed = 10,
    fontFamily = "Arial, sans-serif",
    backgroundImage = "",
  } = config;

  const scrollKeyframes = scrollDirection === "horizontal" 
    ? "@keyframes scrollHorizontal { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }"
    : "@keyframes scrollVertical { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }";

  const animationStyle = scrollDirection !== "none" 
    ? \`animation: scroll\${scrollDirection === "horizontal" ? "Horizontal" : "Vertical"} \${scrollSpeed}s linear infinite;\`
    : "";

  return \`
    <style>
      \${scrollDirection !== "none" ? scrollKeyframes : ""}
      .text-container {
        text-align: \${textAlign};
        background: \${backgroundImage ? \`url(\${backgroundImage}) center/cover, \${backgroundColor}\` : backgroundColor};
        padding: \${padding ? "20px" : "0"};
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: \${textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center"};
        border-radius: 8px;
        overflow: hidden;
      }
      .text {
        font-size: \${fontSize}px;
        color: \${textColor};
        font-weight: 500;
        line-height: 1.4;
        font-family: \${fontFamily};
        white-space: \${scrollDirection === "horizontal" ? "nowrap" : "normal"};
        \${animationStyle}
      }
    </style>
    <div class="text-container">
      <div class="text">\${text}</div>
    </div>
  \`;
}`

      case "countdown":
        return `
function CountdownWebtoy({ config }) {
  const { duration = 300, padding = true, showFormat = true } = config;
  let timeLeft = duration;

  function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (showFormat) {
      return { days, hours, minutes, seconds: secs };
    } else {
      const h = String(hours + days * 24).padStart(2, "0");
      const m = String(minutes).padStart(2, "0");
      const s = String(secs).padStart(2, "0");
      return \`\${h}:\${m}:\${s}\`;
    }
  }

  function updateDisplay() {
    const formattedTime = formatTime(timeLeft);
    const container = document.getElementById('countdown-container');
    
    if (showFormat && typeof formattedTime === "object") {
      container.innerHTML = \`
        <div class="time-unit">
          <div class="unit-box">
            <div class="unit-value">\${formattedTime.days}</div>
            <div class="unit-label">Days</div>
          </div>
          <div class="unit-box">
            <div class="unit-value">\${formattedTime.hours}</div>
            <div class="unit-label">Hours</div>
          </div>
          <div class="unit-box">
            <div class="unit-value">\${formattedTime.minutes}</div>
            <div class="unit-label">Minutes</div>
          </div>
          <div class="unit-box">
            <div class="unit-value">\${formattedTime.seconds}</div>
            <div class="unit-label">Seconds</div>
          </div>
        </div>
      \`;
    } else {
      container.innerHTML = \`<div class="time-display">\${formattedTime}</div>\`;
    }
  }

  setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);

  return \`
    <style>
      .countdown-container {
        padding: \${padding ? "20px" : "0"};
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: white;
        text-align: center;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .time-display {
        font-size: \${showFormat ? "32px" : "48px"};
        font-weight: bold;
        margin-bottom: 16px;
        font-family: 'Courier New', monospace;
      }
      .time-unit {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .unit-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 60px;
      }
      .unit-value {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 4px;
      }
      .unit-label {
        font-size: 12px;
        opacity: 0.8;
        text-transform: uppercase;
      }
    </style>
    <div class="countdown-container" id="countdown-container"></div>
    <script>
      \${updateDisplay.toString()}
      updateDisplay();
    </script>
  \`;
}`

      case "rss-feed":
        return `
function RSSFeedWebtoy({ config }) {
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
  } = config;

  async function fetchRSSFeed() {
    try {
      const proxyUrl = \`https://api.allorigins.win/get?url=\${encodeURIComponent(rssUrl)}\`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      const rssItems = xmlDoc.querySelectorAll("item");

      const parsedItems = Array.from(rssItems)
        .slice(0, maxItems)
        .map((item) => ({
          title: item.querySelector("title")?.textContent || "No title",
          description: item.querySelector("description")?.textContent?.replace(/<[^>]*>/g, "") || "No description",
          pubDate: new Date(item.querySelector("pubDate")?.textContent || Date.now()),
          link: item.querySelector("link")?.textContent || "#",
        }));

      return parsedItems;
    } catch (err) {
      console.error("RSS fetch error:", err);
      return [];
    }
  }

  function formatTemplate(item, template) {
    return template
      .replace(/\\{\\{\\s*title\\s*\\}\\}/g, item.title)
      .replace(/\\{\\{\\s*description\\s*\\}\\}/g, item.description)
      .replace(/\\{\\{\\s*pubDate\\.month\\s*\\}\\}/g, (item.pubDate.getMonth() + 1).toString())
      .replace(/\\{\\{\\s*pubDate\\.year\\s*\\}\\}/g, item.pubDate.getFullYear().toString())
      .replace(/\\{\\{\\s*pubDate\\.day\\s*\\}\\}/g, item.pubDate.getDate().toString());
  }

  async function updateFeed() {
    const items = await fetchRSSFeed();
    const container = document.getElementById('rss-container');
    
    const itemsHTML = items.map(item => 
      \`<div class="feed-item">\${formatTemplate(item, template)}</div>\`
    ).join('');
    
    container.innerHTML = \`<div class="feed-content">\${itemsHTML}</div>\`;
  }

  const scrollKeyframes = scrollDirection === "horizontal" 
    ? "@keyframes scrollHorizontal { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }"
    : "@keyframes scrollVertical { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }";

  return \`
    <style>
      \${scrollDirection !== "none" ? scrollKeyframes : ""}
      .feed-container {
        background: \${backgroundImage ? \`url(\${backgroundImage}) center/cover, \${backgroundColor}\` : backgroundColor};
        padding: \${padding ? "20px" : "0"};
        border-radius: 8px;
        overflow: hidden;
        min-height: 200px;
        position: relative;
      }
      .feed-content {
        \${scrollDirection === "horizontal" ? \`
          display: flex;
          white-space: nowrap;
          animation: scrollHorizontal \${scrollSpeed}s linear infinite;
        \` : scrollDirection === "vertical" ? \`
          animation: scrollVertical \${scrollSpeed}s linear infinite;
        \` : \`
          display: flex;
          flex-direction: column;
          gap: 12px;
        \`}
      }
      .feed-item {
        color: \${textColor};
        font-size: \${fontSize}px;
        font-family: \${fontFamily};
        line-height: 1.4;
        \${scrollDirection === "horizontal" ? "margin-right: 40px; white-space: nowrap;" : ""}
        \${scrollDirection === "vertical" ? "margin-bottom: 20px;" : ""}
        \${scrollDirection === "none" ? "padding: 12px; background: rgba(255, 255, 255, 0.1); border-radius: 6px;" : ""}
      }
    </style>
    <div class="feed-container" id="rss-container">
      <div>Loading RSS feed...</div>
    </div>
    <script>
      \${formatTemplate.toString()}
      \${updateFeed.toString()}
      updateFeed();
      setInterval(updateFeed, \${refreshInterval * 1000});
    </script>
  \`;
}`

      case "clock":
        return `
function ClockWebtoy({ config }) {
  const {
    timezone = "Europe/Paris",
    displayMode = "digital",
    showWorldClocks = false,
    worldTimezones = ["America/New_York", "Asia/Tokyo", "Europe/London"],
    theme = "modern",
    showSeconds = true,
    format24h = true,
    enableAnimations = true,
    margin = 0,
    padding = true,
    backgroundColor = "#ffffff",
    backgroundImage = "",
  } = config;

  // Ensure worldTimezones is an array
  const timezones = Array.isArray(worldTimezones) ? worldTimezones : 
    (typeof worldTimezones === 'string' ? worldTimezones.split(',').filter(tz => tz.trim()) : []);

  function updateClock() {
    const now = new Date();
    const container = document.getElementById('clock-container');
    
    const formatTime = (date, tz) => {
      const options = {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' }),
        hour12: !format24h,
      };
      return date.toLocaleTimeString('en-US', options);
    };

    const formatDate = (date, tz) => {
      const options = {
        timeZone: tz,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString('en-US', options);
    };

    const mainTime = formatTime(now, timezone);
    const mainDate = formatDate(now, timezone);
    
    let worldClocksHTML = '';
    if (showWorldClocks && timezones.length > 0) {
      worldClocksHTML = \`
        <div class="world-clocks">
          \${timezones.map(tz => {
            const cityName = tz.split('/').pop().replace('_', ' ');
            const cityTime = formatTime(now, tz);
            return \`
              <div class="world-clock-item">
                <div class="city-name">\${cityName}</div>
                <div class="city-time">\${cityTime}</div>
              </div>
            \`;
          }).join('')}
        </div>
      \`;
    }

    container.innerHTML = \`
      <div class="main-clock">
        <div class="time-display">\${mainTime}</div>
        <div class="date-display">\${mainDate}</div>
        <div class="timezone-display">\${timezone.replace('_', ' ')}</div>
      </div>
      \${worldClocksHTML}
    \`;
  }

  setInterval(updateClock, 1000);

  return \`
    <style>
      .clock-container {
        padding: \${padding ? "24px" : "0"};
        margin: \${margin}px;
        border-radius: 16px;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        gap: 2rem;
      }
      .main-clock {
        text-align: center;
        \${showWorldClocks ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 1.5rem; width: 100%;' : ''}
      }
      .time-display {
        font-size: 3rem;
        font-weight: bold;
        font-family: 'Courier New', monospace;
        margin-bottom: 0.5rem;
      }
      .date-display {
        font-size: 1.1rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
      }
      .timezone-display {
        font-size: 0.9rem;
        opacity: 0.7;
      }
      .world-clocks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        width: 100%;
        max-width: 1000px;
      }
      .world-clock-item {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 1rem;
        text-align: center;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .city-name {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        font-weight: 500;
      }
      .city-time {
        font-size: 1.3rem;
        font-weight: bold;
        font-family: 'Courier New', monospace;
      }
    </style>
    <div class="clock-container" id="clock-container"></div>
    <script>
      \${updateClock.toString()}
      updateClock();
    </script>
  \`;
}`

      default:
        return `function UnknownWebtoy() { return '<div>Unknown webtoy</div>'; }`
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Webtoy</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .webtoy-container {
            max-width: 800px;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="webtoy-container" id="webtoy-root"></div>
    
    <script>
        const config = ${configJson};
        
        ${getWebtoyComponent(definitionId)}
        
        function renderWebtoy() {
            const root = document.getElementById('webtoy-root');
            const webtoyHTML = ${definitionId
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("")}Webtoy({ config });
            root.innerHTML = webtoyHTML;
        }
        
        renderWebtoy();
    </script>
</body>
</html>`
}
