import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

type Props = {
  variant?: "dark" | "light";
  children: React.ReactNode;
};

export const SceneShell: React.FC<Props> = ({ variant = "dark", children }) => {
  const bg = variant === "dark" ? COLORS.navy : COLORS.offWhite;
  const fg = variant === "dark" ? COLORS.text : COLORS.textDark;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        color: fg,
        fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
