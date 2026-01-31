import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getToph(username) {
  const html = await fetch(`https://toph.co/u/${username}`)
    .then(r => r.text());

  const $ = cheerio.load(html);
  const val = $("span:contains('Solved')").next().text();
  return parseInt(val) || 0;
}