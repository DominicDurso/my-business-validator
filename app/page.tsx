"use client";

import React, { useState, FormEvent, CSSProperties } from "react";

/** 
 * A helper type that maps string keys to valid React.CSSProperties. 
 */
type StyleMap = {
  [key: string]: CSSProperties;
};

const styles: StyleMap = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  hero: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    textAlign: "center" as const,
  },
  heroBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(closest-corner at 50% 50%, #1a1a1a, #000)",
    animation: "fadeGradient 10s infinite alternate",
    zIndex: 0,
  },
  heroContent: {
    zIndex: 1,
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
  },
  heroTitle: {
    fontSize: "3rem",
    margin: 0,
    marginBottom: "1rem",
    color: "#fff",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#aaa",
  },
  formContainer: {
    backgroundColor: "#111",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  textarea: {
    width: "100%",
    border: "none",
    borderRadius: "4px",
    padding: "1rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    resize: "vertical",
    backgroundColor: "#222",
    color: "#fff",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    background:
      "linear-gradient(90deg, rgba(218,0,255,1) 0%, rgba(119,0,255,1) 100%)",
    color: "#fff",
    transition: "opacity 0.2s ease",
  },
  responseSection: {
    width: "100%",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#111",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
  },
  responseContent: {
    whiteSpace: "pre-wrap" as const,
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  footer: {
    textAlign: "center" as const,
    padding: "1rem",
    borderTop: "1px solid #333",
  },
};

// Keyframe animation for subtle gradient fade
const fadeGradient = `
@keyframes fadeGradient {
  0% {
    background: radial-gradient(closest-corner at 50% 50%, #1a1a1a, #000);
  }
  100% {
    background: radial-gradient(closest-corner at 50% 50%, #2a2a2a, #000);
  }
}
`;

export default function Home() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse("Sorry, there are technical difficulties currently.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.main}>
      {/* Insert the keyframe animation globally */}
      <style>{fadeGradient}</style>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Grok-Inspired Validator</h1>
          <p style={styles.heroSubtitle}>
            Get bullet-pointed insights for your business ideas—fast.
          </p>

          {/* Form Container */}
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="idea" style={styles.label}>
                Enter your business idea:
              </label>
              <textarea
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={5}
                placeholder="Describe your business idea here..."
                style={styles.textarea}
              />
              <button type="submit" disabled={loading} style={styles.button}>
                {loading ? "Validating..." : "Validate Idea"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Response Section */}
      {response && (
        <section style={styles.responseSection}>
          <div
            style={styles.responseContent}
            dangerouslySetInnerHTML={{ __html: response }}
          />
        </section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Grok-Inspired Validator. All rights reserved.</p>
      </footer>
    </main>
  );
}