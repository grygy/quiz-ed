"use client";

import { getTokens, OrbitProvider } from "@kiwicom/orbit-components";
import { PropsWithChildren, useId } from "react";

const customTokens = getTokens({
  palette: {
    product: {
      dark: "#d32f2f",
      darkHover: "#C62828",
      darkActive: "#B71C1C",
      darker: "#7F0000",
      light: "#ffebee",
      lightActive: "#ef9a9a",
      lightHover: "#ffcdd2",
      normal: "#ff5722",
      normalActive: "#e53935",
      normalHover: "#f44336",
    },
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <OrbitProvider useId={useId} theme={{ orbit: customTokens }}>
      {children}
    </OrbitProvider>
  );
};

export default ThemeProvider;
