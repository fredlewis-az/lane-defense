import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { SceneShell } from "../components/SceneShell";
import { COLORS, ease } from "../theme";

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = ease(Math.min(1, frame / 45));
  const titleY = interpolate(t, [0, 1], [40, 0]);
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <SceneShell>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeOut,
        }}
      >
        <div
          style={{
            opacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            maxWidth: 1200,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.1,
            }}
          >
            Every Dollar Has a Job
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              color: COLORS.accent,
              fontWeight: 600,
            }}
          >
            visibility beats guesswork
          </div>
        </div>
      </AbsoluteFill>
      <Caption
        text="Most of us don't have a money problem — we have a visibility problem."
      />
    </SceneShell>
  );
};
