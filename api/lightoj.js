import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getLightOJ(username) {
  const html = await fetch(`https://lightoj.com/user/${username}`)
    .then(r => r.text());

  const $ = cheerio.load(html);
  const val = $("td:contains('Solved')").next().text();
  return parseInt(val) || 0;
}