import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "../components/Caption";
import { SceneShell } from "../components/SceneShell";
import { COLORS } from "../theme";

const JARS = [
  { label: "Rent", amount: 1100 },
  { label: "Groceries", amount: 350 },
  { label: "Gas", amount: 150 },
  { label: "Phone", amount: 60 },
  { label: "Fun", amount: 200 },
  { label: "Savings", amount: 540 },
];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const wordmark = spring({ frame, fps, config: { damping: 16 } });
  const flyStart = 40;

  return (
    <SceneShell>
      <AbsoluteFill style={{ padding: 80 }}>
        <div
          style={{
            textAlign: "center",
            opacity: interpolate(wordmark, [0, 1], [0, 1]),
            transform: `scale(${interpolate(wordmark, [0, 1], [0.9, 1])})`,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: 8,
              color: COLORS.accent,
            }}
          >
            YNAB
          </span>
          <div style={{ fontSize: 28, marginTop: 8, color: COLORS.muted }}>
            You Need A Budget
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            padding: "0 60px",
          }}
        >
          {JARS.map((jar, i) => {
            const delay = flyStart + i * 12;
            const p = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, stiffness: 120 },
            });
            const fromTop = interpolate(p, [0, 1], [-80, 0]);
            return (
              <div
                key={jar.label}
                style={{
                  width: 260,
                  background: COLORS.card,
                  borderRadius: 16,
                  padding: 20,
                  border: `2px solid ${COLORS.accent}44`,
                  transform: `translateY(${fromTop}px)`,
                  opacity: p,
                }}
              >
                <div style={{ fontSize: 22, color: COLORS.muted }}>{jar.label}</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.accent }}>
                  ${jar.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 120,
            fontSize: 36,
            fontWeight: 700,
            opacity: interpolate(
              frame,
              [flyStart, flyStart + 30],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          $2,400
        </div>
      </AbsoluteFill>
      <Caption text="Give every dollar a job before you spend it." />
    </SceneShell>
  );
};
