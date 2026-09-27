import React from "react";
import { COLORS } from "../theme";

export const Caption: React.FC<{ text: string; light?: boolean }> = ({
  text,
  light,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 48,
      left: 80,
      right: 80,
      textAlign: "center",
      fontSize: 34,
      fontWeight: 500,
      lineHeight: 1.35,
      color: light ? COLORS.textDark : COLORS.text,
      textShadow: light ? "none" : "0 2px 24px rgba(0,0,0,0.5)",
      opacity: 0.92,
    }}
  >
    {text}
  </div>
);
