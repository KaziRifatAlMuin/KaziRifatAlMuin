import fetch from "node-fetch";

export async function getCF(handle) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}`,
    { signal: controller.signal }
  );
  clearTimeout(timeout);
  
  if (!res.ok) throw new Error(`CF API responded with ${res.status}`);
  const json = await res.json();

  const solved = new Set();
  for (const s of json.result) {
    if (s.verdict === "OK") {
      solved.add(`${s.problem.contestId}-${s.problem.index}`);
    }
  }
  return solved.size;
}