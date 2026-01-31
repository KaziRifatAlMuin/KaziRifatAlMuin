import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getToph(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const html = await fetch(`https://toph.co/u/${username}`, {
    signal: controller.signal,
    headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }).then(r => {
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`Toph responded with ${r.status}`);
    return r.text();
  });

  const $ = cheerio.load(html);
  
  // Look for "X Solutions" text or "X / Y Problems Solved"
  const bodyText = $.text();
  
  // Try to match "94 Solutions" pattern
  let match = bodyText.match(/(\d+)\s*Solutions/i);
  if (match) return parseInt(match[1]);
  
  // Try to match "94 / 2116 Problems Solved" pattern
  match = bodyText.match(/(\d+)\s*\/\s*\d+\s*Problems\s*Solved/i);
  if (match) return parseInt(match[1]);
  
  return 0;
}