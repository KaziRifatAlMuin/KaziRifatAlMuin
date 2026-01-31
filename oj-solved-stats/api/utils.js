export async function safe(fn) {
  try {
    const v = await fn();
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}