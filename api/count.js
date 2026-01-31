import { getCF } from "./cf.js";
import { getLeetCode } from "./leetcode.js";
import { getAtCoder } from "./atcoder.js";
import { getCodeChef } from "./codechef.js";
import { getLightOJ } from "./lightoj.js";
import { getToph } from "./toph.js";
import { safe } from "./utils.js";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { platform } = req.query;

  const platforms = {
    'codeforces': () => getCF("RifatALmuiN"),
    'leetcode': () => getLeetCode("RifatALmuiN"), 
    'atcoder': () => getAtCoder("RifatAlMuin"),
    'codechef': () => getCodeChef("rifat_al_muin"),
    'lightoj': () => getLightOJ("rifatalmuin"),
    'toph': () => getToph("rifat_246")
  };

  if (platform && platforms[platform.toLowerCase()]) {
    const count = await safe(platforms[platform.toLowerCase()], platform);
    res.json({ platform, count, timestamp: new Date().toISOString() });
  } else {
    // Return all platforms
    const results = {};
    for (const [name, fn] of Object.entries(platforms)) {
      results[name] = await safe(fn, name);
    }
    results.total = Object.values(results).reduce((a, b) => a + b, 0);
    results.timestamp = new Date().toISOString();
    res.json(results);
  }
}