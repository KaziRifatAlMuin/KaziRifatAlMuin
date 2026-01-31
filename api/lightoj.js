import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getLightOJ(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const html = await fetch(`https://lightoj.com/user/${username}`, {
    signal: controller.signal,
    headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }).then(r => {
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`LightOJ responded with ${r.status}`);
    return r.text();
  });

  const $ = cheerio.load(html);
  
  // Look for "49SOLVED" or "49 SOLVED" pattern in the page
  const bodyText = $.text();
  
  // Match pattern like "49SOLVED" or "49 SOLVED"
  let match = bodyText.match(/(\d+)\s*SOLVED/i);
  if (match) return parseInt(match[1]);
  
  // Alternative: look for solved in stats
  match = bodyText.match(/Solved\s*[:\s]*(\d+)/i);
  if (match) return parseInt(match[1]);
  
  return 0;
}