import { getCF } from "./cf.js";
import { getLeetCode } from "./leetcode.js";
import { getAtCoder } from "./atcoder.js";
import { getCodeChef } from "./codechef.js";
import { getLightOJ } from "./lightoj.js";
import { getToph } from "./toph.js";
import { safe } from "./utils.js";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=21600");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const platforms = [
    { name: "Codeforces", color: "#1f8acb", url: "https://codeforces.com/profile/RifatALmuiN", fn: () => getCF("RifatALmuiN") },
    { name: "CodeChef", color: "#5b4638", url: "https://www.codechef.com/users/rifat_al_muin", fn: () => getCodeChef("rifat_al_muin") },
    { name: "LightOJ", color: "#d63c3c", url: "https://lightoj.com/user/rifatalmuin", fn: () => getLightOJ("rifatalmuin") },
    { name: "LeetCode", color: "#f89f1b", url: "https://leetcode.com/RifatALmuiN", fn: () => getLeetCode("RifatALmuiN") },
    { name: "AtCoder", color: "#2f7fff", url: "https://atcoder.jp/users/RifatAlMuin", fn: () => getAtCoder("RifatAlMuin") },
    { name: "Toph", color: "#7e3af2", url: "https://toph.co/u/rifat_246", fn: () => getToph("rifat_246") }
  ];

  let total = 0;
  const platformData = [];

  const results = await Promise.all(
    platforms.map(async (platform) => {
      const count = await safe(platform.fn);
      total += count;
      return {
        name: platform.name,
        color: platform.color,
        url: platform.url,
        count: count,
        percentage: 0 // Will calculate after getting total
      };
    })
  );

  // Calculate percentages
  results.forEach(platform => {
    platform.percentage = total > 0 ? Math.round((platform.count / total) * 100) : 0;
  });

  const response = {
    platforms: results,
    total: total,
    lastUpdated: new Date().toISOString(),
    summary: {
      topPlatform: results.reduce((prev, current) => (prev.count > current.count) ? prev : current),
      averagePerPlatform: Math.round(total / platforms.length),
      activePlatforms: results.filter(p => p.count > 0).length
    }
  };

  res.json(response);
}