import { getCF } from "./cf.js";
import { getLeetCode } from "./leetcode.js";
import { getAtCoder } from "./atcoder.js";
import { getCodeChef } from "./codechef.js";
import { getLightOJ } from "./lightoj.js";
import { getToph } from "./toph.js";
import { icons } from "./icons.js";
import { safe } from "./utils.js";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const platforms = [
    ["Codeforces", "https://codeforces.com/profile/RifatALmuiN", () => getCF("RifatALmuiN")],
    ["CodeChef", "https://www.codechef.com/users/rifat_al_muin", () => getCodeChef("rifat_al_muin")],
    ["LightOJ", "https://lightoj.com/user/rifatalmuin", () => getLightOJ("rifatalmuin")],
    ["LeetCode", "https://leetcode.com/RifatALmuiN", () => getLeetCode("RifatALmuiN")],
    ["AtCoder", "https://atcoder.jp/users/RifatAlMuin", () => getAtCoder("RifatAlMuin")],
    ["Toph", "https://toph.co/u/rifat_246", () => getToph("rifat_246")]
  ];

  let total = 0;
  const now = new Date().toUTCString();

  const rows = await Promise.all(
    platforms.map(async ([name, url, fn], i) => {
      const value = await safe(fn);
      total += value;

      const x = i % 2 === 0 ? 24 : 220;
      const y = 80 + Math.floor(i / 2) * 40;
      const icon = icons[name];

      return `
<a xlink:href="${url}" target="_blank">
  <g transform="translate(${x} ${y - 14}) scale(0.9)" fill="${icon.color}">
    ${icon.path}
  </g>
  <text x="${x + 28}" y="${y}">${name}</text>
  <text x="${x + 160}" y="${y}" text-anchor="end">
    <tspan>0
      <animate attributeName="textContent" from="0" to="${value}" dur="1.2s" fill="freeze"/>
    </tspan>
  </text>
</a>`;
    })
  );

  res.send(`
<svg width="440" height="300" viewBox="0 0 440 300"
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink">

<style>
  :root { --bg:#fff; --text:#24292f; --line:#d0d7de; --accent:#0969da; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#0d1117; --text:#c9d1d9; --line:#30363d; --accent:#58a6ff; }
  }
  text { font-family: monospace; fill: var(--text); font-size:14px; }
  .title { font-size:16px; font-weight:600; }
</style>

<rect width="100%" height="100%" rx="14" fill="var(--bg)"/>
<text x="20" y="32" class="title">Competitive Programming — Solved</text>

${rows.join("")}

<line x1="20" y1="220" x2="420" y2="220" stroke="var(--line)"/>

<text x="20" y="248" fill="var(--accent)" font-weight="600">
Total:
<tspan>0
  <animate attributeName="textContent" from="0" to="${total}" dur="1.4s" fill="freeze"/>
</tspan>
</text>

<text x="420" y="248" text-anchor="end" font-size="12">${now}</text>
</svg>
`);
}