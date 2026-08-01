import express from "express";
import * as cheerio from "cheerio";

const app = express();

app.use(express.json());

// API Route to fetch Pinterest media
app.post("/api/extract", async (req, res) => {
  try {
    const { url } = req.body;

    const isPinterest = url.includes("pinterest.com") || url.includes("pin.it");
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

    if (!url || (!isPinterest && !isYouTube)) {
      return res.status(400).json({ error: "Invalid URL. Please provide a Pinterest or YouTube URL." });
    }

    if (isYouTube) {
      let videoId = "";
      try {
        if (url.includes("youtu.be")) {
          videoId = url.split("youtu.be/")[1]?.split("?")[0];
        } else {
          const urlObj = new URL(url);
          videoId = urlObj.searchParams.get("v") || "";
        }
      } catch (e) {}

      if (!videoId) {
         return res.status(400).json({ error: "Could not extract YouTube Video ID" });
      }

      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      return res.json({
        url: thumbnailUrl,
        type: "image",
        title: "YouTube Thumbnail",
        thumbnail: thumbnailUrl,
        originalUrl: url
      });
    }

    // Fetch the page content for Pinterest
    // Need to add User-Agent to avoid getting blocked
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Pinterest page");
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let mediaUrl = '';
    let mediaType = 'image';

    // 1. Try to find video in schema.org JSON-LD
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const content = $(el).html() || '{}';
        const json = JSON.parse(content);
        if (json['@type'] === 'VideoObject' && json.contentUrl) {
          mediaUrl = json.contentUrl;
          mediaType = 'video';
        }
      } catch (e) {}
    });

    // 2. If not found in JSON-LD, look for .mp4 URLs in the raw HTML (useful for some page structures)
    if (!mediaUrl) {
      const mp4Regex = /"([^"]*\.mp4[^"]*)"/g;
      let match;
      const mp4Urls = [];
      while ((match = mp4Regex.exec(html)) !== null) {
        let urlStr = match[1].replace(/\\/g, ''); // Unescape JSON string
        if (urlStr.startsWith('http')) {
          mp4Urls.push(urlStr);
        }
      }
      
      if (mp4Urls.length > 0) {
        // Pinterest typically hosts videos on v.pinimg.com
        // Try to find the highest quality (often has 1080P or 720P in the URL or is the first one)
        const bestUrl = mp4Urls.find(u => u.includes('v.pinimg.com')) || mp4Urls[0];
        mediaUrl = bestUrl;
        mediaType = 'video';
      }
    }

    // 3. Fallback to Open Graph tags
    if (!mediaUrl) {
      mediaUrl = $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:secure_url"]').attr('content');
      if (mediaUrl) {
        mediaType = 'video';
      }
    }
    
    if (!mediaUrl) {
      mediaUrl = $('meta[property="og:image"]').attr('content');
      mediaType = 'image';
    }

    // 4. Upgrade image quality
    if (mediaType === 'image' && mediaUrl) {
      // Replace something like /736x/ with /originals/ for full quality
      mediaUrl = mediaUrl.replace(/\/\d+x\//, '/originals/');
    }

    // 5. Detect GIFs
    if (mediaUrl && mediaUrl.includes('.gif')) {
      mediaType = 'gif';
    }
    
    const title = $('meta[property="og:title"]').attr('content') || 'Pinterest Media';
    const thumbnail = $('meta[property="og:image"]').attr('content');

    if (!mediaUrl) {
      // Fallback: look for data-relay-response or other embedded JSON, but this is a simple implementation
      return res.status(404).json({ error: "Could not find media on this page" });
    }

    res.json({
      url: mediaUrl,
      type: mediaType,
      title,
      thumbnail,
      originalUrl: url
    });
  } catch (error) {
    console.error("Extraction error:", error);
    res.status(500).json({ error: "Failed to extract media. Make sure the URL is public." });
  }
});

// Proxy to download the file directly to the client (to bypass CORS on the client side when saving)
app.get("/api/download", async (req, res) => {
  try {
    const { url, type } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).send("Invalid URL");
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch media");
    }

    const ext = type === 'video' ? 'mp4' : type === 'gif' ? 'gif' : 'jpg';
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const prefix = isYouTube ? 'youtube-thumbnail' : 'pinterest-download';
    const filename = `${prefix}-${Date.now()}.${ext}`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    
    if (response.body) {
       // @ts-ignore
       const reader = response.body.getReader();
       const push = async () => {
           while (true) {
               const { done, value } = await reader.read();
               if (done) break;
               res.write(value);
           }
           res.end();
       };
       await push();
    } else {
      res.end();
    }

  } catch (error) {
    console.error("Download proxy error:", error);
    res.status(500).send("Failed to download media");
  }
});

export default app;
