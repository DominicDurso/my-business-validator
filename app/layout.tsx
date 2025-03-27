// app/layout.tsx
import React, { CSSProperties } from "react";

export const metadata = {
  title: "AI Business Validator",
  description: "Validate your business ideas with AI-driven insights.",
};

type StyleMap = { [key: string]: CSSProperties };

const layoutStyles: StyleMap = {
  body: {
    margin: 0,
    padding: 0,
  },
  main: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  title: {
    fontSize: "1.8rem",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "transform 0.2s ease, color 0.2s ease",
  },
  footer: {
    width: "100%",
    textAlign: "center" as const,
    padding: "1rem",
    borderTop: "1px solid #333",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={layoutStyles.body}>
        <div style={layoutStyles.main}>
          <header style={layoutStyles.header}>
            <h1 style={layoutStyles.title}>AI Business Validator</h1>
            <nav style={layoutStyles.nav}>
              <a className="navLink" style={layoutStyles.navLink} href="/">
                Home
              </a>
              <a className="navLink" style={layoutStyles.navLink} href="/about">
                About
              </a>
            </nav>
          </header>
          {children}
          <footer style={layoutStyles.footer}>
            <p>
              © {new Date().getFullYear()} AI Business Validator. All rights
              reserved.
            </p>
          </footer>
          <style jsx>{`
            .navLink:hover {
              transform: scale(1.05);
              color: #da00ff;
            }
          `}</style>
        </div>
      </body>
    </html>
  );
}