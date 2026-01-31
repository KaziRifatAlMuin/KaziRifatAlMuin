import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getAtCoder(username) {
  const html = await fetch(`https://atcoder.jp/users/${username}`)
    .then(r => r.text());

  const $ = cheerio.load(html);
  const val = $("th:contains('Accepted')").next().text();
  return parseInt(val) || 0;
}