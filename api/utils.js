export async function safe(fn, platformName = 'unknown') {
  try {
    const v = await fn();
    console.log(`[${platformName}] Successfully fetched: ${v}`);
    return Number.isFinite(v) ? v : 0;
  } catch (error) {
    console.error(`[${platformName}] Error: ${error.message}`);
    return 0;
  }
}