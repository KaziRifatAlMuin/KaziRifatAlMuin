import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getCodeChef(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const html = await fetch(`https://www.codechef.com/users/${username}`, {
    signal: controller.signal,
    headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }).then(r => {
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`CodeChef responded with ${r.status}`);
    return r.text();
  });

  const $ = cheerio.load(html);
  
  // Look for "Total Problems Solved: 39" pattern
  const bodyText = $.text();
  
  // Match "Total Problems Solved: 39"
  let match = bodyText.match(/Total\s*Problems\s*Solved[:\s]*(\d+)/i);
  if (match) return parseInt(match[1]);
  
  // Alternative patterns
  match = bodyText.match(/(\d+)\s*problems?\s*solved/i);
  if (match) return parseInt(match[1]);
  
  // Try the old selector as fallback
  const text = $("section.rating-data h3").first().text();
  const m = text.match(/\d+/);
  return m ? parseInt(m[0]) : 0;
}