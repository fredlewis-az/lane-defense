import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { COLORS } from "../theme";

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <SceneShell variant="light">
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeIn * fadeOut,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-caveat), "Caveat", "Segoe Script", cursive',
            fontSize: 72,
            lineHeight: 1.4,
            textAlign: "center",
            color: COLORS.textDark,
            maxWidth: 900,
          }}
        >
          Happy to help you set it up.
          <br />
          <span style={{ color: COLORS.accentDark }}>Love, Dad.</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
