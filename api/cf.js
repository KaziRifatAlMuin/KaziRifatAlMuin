import fetch from "node-fetch";

export async function getCF(handle) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}`,
    { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }
  );
  clearTimeout(timeout);
  
  if (!res.ok) throw new Error(`CF API responded with ${res.status}`);
  const json = await res.json();
  
  // Check if result exists and is an array
  if (!json.result || !Array.isArray(json.result)) {
    throw new Error('Invalid Codeforces API response');
  }

  const solved = new Set();
  for (const s of json.result) {
    if (s.verdict === "OK" && s.problem) {
      solved.add(`${s.problem.contestId}-${s.problem.index}`);
    }
  }
  return solved.size;
}