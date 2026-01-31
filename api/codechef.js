import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getCodeChef(username) {
  const html = await fetch(`https://www.codechef.com/users/${username}`)
    .then(r => r.text());

  const $ = cheerio.load(html);
  const text = $("section.rating-data h3").first().text();
  const m = text.match(/\d+/);
  return m ? parseInt(m[0]) : 0;
}