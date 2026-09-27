import React from "react";
import { Composition } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { EveryDollarVideo, compositionConfig } from "./EveryDollarVideo";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const { fontFamily: caveat } = loadCaveat("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <style>{`:root { --font-inter: ${inter}; --font-caveat: ${caveat}; }`}</style>
      <Composition
        id={compositionConfig.id}
        component={EveryDollarVideo}
        durationInFrames={compositionConfig.durationInFrames}
        fps={compositionConfig.fps}
        width={compositionConfig.width}
        height={compositionConfig.height}
        defaultProps={{}}
      />
    </>
  );
};
