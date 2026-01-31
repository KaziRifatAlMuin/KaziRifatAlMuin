import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getLightOJ(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const html = await fetch(`https://lightoj.com/user/${username}`, {
    signal: controller.signal,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' }
  }).then(r => {
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`LightOJ responded with ${r.status}`);
    return r.text();
  });

  const $ = cheerio.load(html);
  const val = $("td:contains('Solved')").next().text();
  return parseInt(val) || 0;
}