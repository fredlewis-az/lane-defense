export const COLORS = {
  navy: "#0f1729",
  offWhite: "#f5f0e8",
  accent: "#22c55e",
  accentDark: "#16a34a",
  muted: "#94a3b8",
  card: "#1e293b",
  text: "#f8fafc",
  textDark: "#1e293b",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const ease = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
