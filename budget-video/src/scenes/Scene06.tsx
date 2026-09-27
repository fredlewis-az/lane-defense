import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { SceneShell } from "../components/SceneShell";
import { COLORS } from "../theme";

const ITEMS = [
  "Download YNAB",
  "Connect bank",
  "Create jars",
  "Set one goal",
];

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell variant="light">
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: 720 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              marginBottom: 48,
              color: COLORS.textDark,
            }}
          >
            Setup checklist
          </div>
          {ITEMS.map((item, i) => {
            const p = spring({
              frame: frame - 15 - i * 18,
              fps,
              config: { damping: 14 },
            });
            const check = spring({
              frame: frame - 35 - i * 18,
              fps,
              config: { damping: 16 },
            });
            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  marginBottom: 28,
                  opacity: p,
                  transform: `translateX(${interpolate(p, [0, 1], [-40, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: check > 0.5 ? COLORS.accent : "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 24,
                  }}
                >
                  {check > 0.5 ? "✓" : ""}
                </div>
                <div style={{ fontSize: 36, fontWeight: 600 }}>{item}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Caption light text="An afternoon to get the basics in place." />
    </SceneShell>
  );
};
