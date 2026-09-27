import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { SceneShell } from "../components/SceneShell";
import { COLORS } from "../theme";

const BENEFITS = [
  { icon: "◎", label: "Visibility" },
  { icon: "↔", label: "Intentional spending" },
  { icon: "▲", label: "Goals you can track" },
  { icon: "!", label: "Early warnings" },
];

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const big = spring({
    frame: frame - durationInFrames + 45,
    fps,
    config: { damping: 14 },
  });

  return (
    <SceneShell>
      <AbsoluteFill style={{ padding: 100, justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginBottom: 80,
          }}
        >
          {BENEFITS.map((b, i) => {
            const p = spring({ frame: frame - 10 - i * 12, fps, config: { damping: 14 } });
            return (
              <div
                key={b.label}
                style={{
                  background: COLORS.card,
                  borderRadius: 20,
                  padding: 32,
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 48, color: COLORS.accent }}>{b.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 700, marginTop: 12 }}>{b.label}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.accent,
            opacity: big,
            transform: `scale(${interpolate(big, [0, 1], [0.92, 1])})`,
          }}
        >
          Give every dollar a job.
        </div>
      </AbsoluteFill>
      <Caption text="Visibility · Intention · Goals · Early warnings" />
    </SceneShell>
  );
};
