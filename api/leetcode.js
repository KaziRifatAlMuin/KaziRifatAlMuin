import fetch from "node-fetch";

export async function getLeetCode(username) {
  const body = {
    query: `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `,
    variables: { username }
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Origin": "https://leetcode.com",
      "Referer": "https://leetcode.com/"
    },
    body: JSON.stringify(body),
    signal: controller.signal
  });
  
  clearTimeout(timeout);
  if (!res.ok) throw new Error(`LeetCode responded with ${res.status}`);

  const json = await res.json();
  if (!json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum) return 0;

  // The first element with difficulty "All" contains total count
  const stats = json.data.matchedUser.submitStatsGlobal.acSubmissionNum;
  const allStats = stats.find(s => s.difficulty === "All");
  if (allStats) return allStats.count;
  
  // Fallback: sum all difficulties
  return stats.reduce((a, b) => a + b.count, 0);
}