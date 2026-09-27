import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import {
  SCENE_ORDER,
  SceneKey,
  sceneDurationSec,
  totalDurationSec,
} from "./loadDurations";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";

const SCENE_COMPONENTS: Record<SceneKey, React.FC> = {
  scene01: Scene01,
  scene02: Scene02,
  scene03: Scene03,
  scene04: Scene04,
  scene05: Scene05,
  scene06: Scene06,
  scene07: Scene07,
  scene08: Scene08,
};

const sceneFrames = (key: SceneKey): number =>
  Math.ceil(sceneDurationSec(key) * FPS);

export const everyDollarDurationInFrames = (): number =>
  Math.ceil(totalDurationSec() * FPS);

export const EveryDollarVideo: React.FC = () => {
  let from = 0;
  return (
    <>
      {SCENE_ORDER.map((key) => {
        const durationInFrames = sceneFrames(key);
        const Comp = SCENE_COMPONENTS[key];
        const seq = (
          <Sequence key={key} from={from} durationInFrames={durationInFrames}>
            <Comp />
            {key !== "scene08" && (
              <Audio src={staticFile(`audio/${key}.mp3`)} />
            )}
          </Sequence>
        );
        from += durationInFrames;
        return seq;
      })}
    </>
  );
};

export const compositionConfig = {
  id: "EveryDollar",
  width: WIDTH,
  height: HEIGHT,
  fps: FPS,
  durationInFrames: everyDollarDurationInFrames(),
};
