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

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const notif1 = spring({ frame: frame - 35, fps, config: { damping: 12 } });
  const notif2 = spring({ frame: frame - 90, fps, config: { damping: 12 } });

  return (
    <SceneShell>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 380,
            height: 760,
            borderRadius: 48,
            border: `4px solid ${COLORS.muted}`,
            background: "#0b1220",
            transform: `scale(${interpolate(phoneIn, [0, 1], [0.85, 1])})`,
            opacity: phoneIn,
            padding: 24,
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ fontSize: 18, color: COLORS.muted, textAlign: "center" }}>
            YNAB + AI
          </div>
          <div
            style={{
              marginTop: 40,
              background: COLORS.card,
              borderRadius: 16,
              padding: 16,
              transform: `translateY(${interpolate(notif1, [0, 1], [30, 0])}px)`,
              opacity: notif1,
              borderLeft: `4px solid ${COLORS.accent}`,
            }}
          >
            <div style={{ fontSize: 16, color: COLORS.muted }}>Now</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>
              Coffee, $6.50 — filed to Fun
            </div>
            <div style={{ fontSize: 18, color: COLORS.accent, marginTop: 8 }}>
              $38 left this week
            </div>
          </div>
          <div
            style={{
              marginTop: 16,
              background: COLORS.card,
              borderRadius: 16,
              padding: 16,
              transform: `translateY(${interpolate(notif2, [0, 1], [30, 0])}px)`,
              opacity: notif2,
              borderLeft: "4px solid #f59e0b",
            }}
          >
            <div style={{ fontSize: 16, color: COLORS.muted }}>Alert</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>
              You&apos;ve used 80% of groceries — it&apos;s the 20th
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <Caption text="Plain-English updates catch problems early." />
    </SceneShell>
  );
};
