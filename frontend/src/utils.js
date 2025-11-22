// simple helpers
export function cToF(c) {
  return (c * 9) / 5 + 32;
}
export function fToC(f) {
  return ((f - 32) * 5) / 9;
}

export function tempToGradient(tempC) {
  // choose a pleasant gradient depending on temperature in Celsius
  if (tempC <= 0) return "linear-gradient(135deg,#e6f0ff,#dbefff)";
  if (tempC <= 12) return "linear-gradient(135deg,#dff4ff,#cfefff)";
  if (tempC <= 22) return "linear-gradient(135deg,#fff7e6,#fff1d0)";
  if (tempC <= 30) return "linear-gradient(135deg,#ffe6e6,#ffdede)";
  return "linear-gradient(135deg,#ffdede,#ffdfdf)";
}

