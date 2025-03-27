"use client";

import React, { useState, FormEvent, CSSProperties } from "react";

/** 
 * A helper type that maps string keys to valid React.CSSProperties. 
 * This tells TypeScript that each style object is a valid set of inline styles.
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
    transition: "color 0.2s ease",
  },
  // Darker hero background
  hero: {
    textAlign: "center" as const,
    padding: "2rem 1rem",
    // Darker gradient
    background: "linear-gradient(90deg, #0c0c0c, #1c1c1c)",
  },
  heroTitle: {
    fontSize: "2rem",
    margin: "0.5rem 0",
    color: "#da00ff",
  },
  heroText: {
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
  metricsSection: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "1rem",
  },
  metricCard: {
    backgroundColor: "#111",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.05)",
    textAlign: "center" as const,
  },
  metricValue: {
    fontSize: "1.8rem",
    margin: 0,
    color: "#da00ff",
  },
  metricLabel: {
    fontSize: "0.9rem",
    margin: "0.5rem 0 0",
    color: "#aaa",
  },
  formContainer: {
    width: "100%",
    maxWidth: "600px",
    padding: "2rem",
    margin: "2rem auto",
    backgroundColor: "#111",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "1rem",
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
    lineHeight: 1.5,
  },
  footer: {
    width: "100%",
    textAlign: "center" as const,
    padding: "1rem",
    borderTop: "1px solid #333",
  },
};

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
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Business Idea Validator</h1>
        <nav style={styles.nav}>
          <a style={styles.navLink} href="/">Home</a>
          <a style={styles.navLink} href="/about">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h2 style={styles.heroTitle}>Instant, Data-Driven Insights</h2>
        <p style={styles.heroText}>
          Our AI-powered tool validates your business ideas using real-world data and trends.
        </p>
      </section>

      {/* Metrics Section */}
      <section style={styles.metricsSection}>
        <div style={styles.metricCard}>
          <h3 style={styles.metricValue}>1,250+</h3>
          <p style={styles.metricLabel}>Ideas Validated</p>
        </div>
        <div style={styles.metricCard}>
          <h3 style={styles.metricValue}>95%</h3>
          <p style={styles.metricLabel}>User Satisfaction</p>
        </div>
      </section>

      {/* Form Section */}
      <section style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
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
      </section>

      {/* Response Section */}
      {response && (
        <section style={styles.responseSection}>
          <div
            style={styles.responseContent}
            // We return HTML from the API, so we render it directly
            dangerouslySetInnerHTML={{ __html: response }}
          />
        </section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Business Idea Validator. All rights reserved.</p>
      </footer>
    </main>
  );
}