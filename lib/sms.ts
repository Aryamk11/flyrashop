export async function sendSMS(phone: string, code: string) {
  // CODE NEXUS: In production, replace this with an actual API call (e.g., KavehNegar)
  console.log('------------------------------------------------');
  console.log(`[FLYRASHOP SMS GATEWAY]`);
  console.log(`Target: ${phone}`);
  console.log(`Payload: ${code}`);
  console.log('------------------------------------------------');
  return true;
}