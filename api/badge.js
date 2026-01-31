import { getCF } from "./cf.js";
import { getLeetCode } from "./leetcode.js";
import { getAtCoder } from "./atcoder.js";
import { getCodeChef } from "./codechef.js";
import { getLightOJ } from "./lightoj.js";
import { getToph } from "./toph.js";
import { safe } from "./utils.js";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { platform } = req.query;
  
  const platforms = {
    'codeforces': { fn: () => getCF("RifatALmuiN"), color: "#1f8acb", name: "Codeforces" },
    'leetcode': { fn: () => getLeetCode("RifatALmuiN"), color: "#f89f1b", name: "LeetCode" },
    'atcoder': { fn: () => getAtCoder("RifatAlMuin"), color: "#2f7fff", name: "AtCoder" },
    'codechef': { fn: () => getCodeChef("rifat_al_muin"), color: "#5b4638", name: "CodeChef" },
    'lightoj': { fn: () => getLightOJ("rifatalmuin"), color: "#d63c3c", name: "LightOJ" },
    'toph': { fn: () => getToph("rifat_246"), color: "#7e3af2", name: "Toph" }
  };

  if (!platform || !platforms[platform.toLowerCase()]) {
    res.status(400).send("Invalid platform");
    return;
  }

  const platformData = platforms[platform.toLowerCase()];
  const count = await safe(platformData.fn, platformData.name);
  const timestamp = new Date().toLocaleString();

  const svg = `
<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --bg:#fff; --text:#24292f; --accent:${platformData.color}; }
    @media (prefers-color-scheme: dark) {
      :root { --bg:#0d1117; --text:#c9d1d9; }
    }
    text { font-family: monospace; fill: var(--text); }
    .platform { font-size:14px; font-weight:600; fill: var(--accent); }
    .count { font-size:18px; font-weight:700; fill: var(--accent); }
    .label { font-size:10px; fill: var(--text); opacity: 0.7; }
  </style>
  
  <rect width="100%" height="100%" rx="8" fill="var(--bg)" stroke="var(--accent)" stroke-width="1"/>
  
  <text x="10" y="18" class="platform">${platformData.name}</text>
  <text x="10" y="35" class="count">${count.toLocaleString()}</text>
  <text x="10" y="50" class="label">problems solved</text>
  
  <text x="190" y="50" class="label" text-anchor="end">Live ⚡</text>
</svg>`;

  res.send(svg);
}