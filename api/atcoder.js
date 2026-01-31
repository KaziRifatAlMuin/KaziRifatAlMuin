import fetch from "node-fetch";

export async function getAtCoder(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  
  // Use AtCoder Problems API which provides submission data
  const res = await fetch(
    `https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_count?user=${username}`,
    {
      signal: controller.signal,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    }
  );
  
  clearTimeout(timeout);
  
  if (!res.ok) throw new Error(`AtCoder API responded with ${res.status}`);
  
  const count = await res.json();
  return typeof count === 'number' ? count : 0;
}