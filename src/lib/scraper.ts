import axios from 'axios';
import * as cheerio from 'cheerio';

export interface BookmarkMetadata {
  title: string;
  description: string;
  favicon: string;
  image?: string;
}

export async function fetchMetadata(url: string): Promise<BookmarkMetadata> {
  try {
    
    const urlObj = new URL(url);
    
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    
    let title = 
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      urlObj.hostname;

    
    let description = 
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '';

    
    let favicon = 
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      $('link[rel="apple-touch-icon"]').attr('href') ||
      '/favicon.ico';

    
    if (favicon && !favicon.startsWith('http')) {
      favicon = new URL(favicon, urlObj.origin).href;
    }

    
    let image = 
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      '';

    if (image && !image.startsWith('http')) {
      image = new URL(image, urlObj.origin).href;
    }

    
    title = title.trim().substring(0, 200);
    description = description.trim().substring(0, 500);

    return {
      title,
      description,
      favicon,
      image,
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    
    
    try {
      const urlObj = new URL(url);
      return {
        title: urlObj.hostname,
        description: '',
        favicon: `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`,
        image: '',
      };
    } catch {
      return {
        title: 'Bookmark',
        description: '',
        favicon: '',
        image: '',
      };
    }
  }
}

export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
