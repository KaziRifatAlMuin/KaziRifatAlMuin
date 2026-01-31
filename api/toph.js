import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getToph(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const html = await fetch(`https://toph.co/u/${username}`, {
    signal: controller.signal,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' }
  }).then(r => {
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`Toph responded with ${r.status}`);
    return r.text();
  });

  const $ = cheerio.load(html);
  const val = $("span:contains('Solved')").next().text();
  return parseInt(val) || 0;
}