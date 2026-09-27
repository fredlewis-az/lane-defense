import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { SceneShell } from "../components/SceneShell";
import { COLORS } from "../theme";

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const land = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  const scale = interpolate(land, [0, 1], [0.6, 1]);
  const y = interpolate(land, [0, 1], [-120, 0]);

  return (
    <SceneShell variant="light">
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `translateY(${y}px) scale(${scale})`,
            background: COLORS.navy,
            color: COLORS.text,
            borderRadius: 24,
            padding: "48px 72px",
            boxShadow: "0 24px 80px rgba(15,23,41,0.25)",
          }}
        >
          <div style={{ fontSize: 28, opacity: 0.75, marginBottom: 8 }}>Paycheck</div>
          <div style={{ fontSize: 96, fontWeight: 800, color: COLORS.accent }}>
            $2,400
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 120,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.textDark,
          }}
        >
          A budget is a plan — not a punishment
        </div>
      </AbsoluteFill>
      <Caption
        light
        text="See where everything stands at a glance."
      />
    </SceneShell>
  );
};
