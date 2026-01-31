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

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const json = await res.json();
  if (!json.data?.matchedUser) return 0;

  return json.data.matchedUser.submitStatsGlobal.acSubmissionNum
    .reduce((a, b) => a + b.count, 0);
}