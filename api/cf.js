import fetch from "node-fetch";

export async function getCF(handle) {
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}`
  );
  const json = await res.json();

  const solved = new Set();
  for (const s of json.result) {
    if (s.verdict === "OK") {
      solved.add(`${s.problem.contestId}-${s.problem.index}`);
    }
  }
  return solved.size;
}