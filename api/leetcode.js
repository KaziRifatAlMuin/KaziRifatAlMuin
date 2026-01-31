import fetch from "node-fetch";

export async function getLeetCode(username) {
  const body = {
    query: `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
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
      "User-Agent": "Mozilla/5.0 (compatible)"
    },
    body: JSON.stringify(body),
    signal: controller.signal
  });
  
  clearTimeout(timeout);
  if (!res.ok) throw new Error(`LeetCode responded with ${res.status}`);

  const json = await res.json();
  if (!json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum) return 0;

  return json.data.matchedUser.submitStatsGlobal.acSubmissionNum
    .reduce((a, b) => a + b.count, 0);
}