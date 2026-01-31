import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getCodeChef(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const html = await fetch(`https://www.codechef.com/users/${username}`, {
    signal: controller.signal,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' }
  }).then(r => {
    clearTimeout(timeout);
    if (!r.ok) throw new Error(`CodeChef responded with ${r.status}`);
    return r.text();
  });

  const $ = cheerio.load(html);
  const text = $("section.rating-data h3").first().text();
  const m = text.match(/\d+/);
  return m ? parseInt(m[0]) : 0;
}