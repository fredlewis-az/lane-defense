import durations from "../public/audio/durations.json";

export type SceneKey =
  | "scene01"
  | "scene02"
  | "scene03"
  | "scene04"
  | "scene05"
  | "scene06"
  | "scene07"
  | "scene08";

export const SCENE_ORDER: SceneKey[] = [
  "scene01",
  "scene02",
  "scene03",
  "scene04",
  "scene05",
  "scene06",
  "scene07",
  "scene08",
];

export const sceneDurationSec = (key: SceneKey): number =>
  durations.scenes[key].sceneSec;

export const totalDurationSec = (): number =>
  SCENE_ORDER.reduce((sum, k) => sum + sceneDurationSec(k), 0);

export const VOICE = durations.voice;
