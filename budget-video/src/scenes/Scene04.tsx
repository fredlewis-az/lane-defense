import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { SceneShell } from "../components/SceneShell";
import { COLORS } from "../theme";

const MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6"];
const GOAL = 1200;
const PER_MONTH = 200;

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = interpolate(frame, [20, durationInFrames - 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const filled = Math.round(progress * GOAL);
  const monthIndex = Math.min(5, Math.floor(progress * 6));

  return (
    <SceneShell variant="light">
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 100,
        }}
      >
        <div style={{ width: 1100 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: COLORS.textDark }}>
            Trip to Denver, $1,200
          </div>
          <div
            style={{
              marginTop: 40,
              height: 48,
              background: "#e2e8f0",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(filled / GOAL) * 100}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark})`,
                borderRadius: 24,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            <span style={{ color: COLORS.accent }}>${filled}</span>
            <span style={{ color: COLORS.muted }}>$200 / month</span>
          </div>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {MONTHS.map((m, i) => (
              <div
                key={m}
                style={{
                  textAlign: "center",
                  opacity: i <= monthIndex ? 1 : 0.35,
                  transform: i === monthIndex ? "scale(1.15)" : "scale(1)",
                  color: i <= monthIndex ? COLORS.accentDark : COLORS.muted,
                  fontWeight: 700,
                  fontSize: 28,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <Caption light text="A wish becomes a line item you can track." />
    </SceneShell>
  );
};
