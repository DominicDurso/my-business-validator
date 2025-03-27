"use client";

import React, { useState, FormEvent, CSSProperties } from "react";

type StyleMap = { [key: string]: CSSProperties };

const styles: StyleMap = {
  hero: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center" as const,
    padding: "2rem 1rem",
    background: "linear-gradient(90deg, #0c0c0c, #1c1c1c)",
  },
  heroTitle: {
    fontSize: "3rem",
    margin: "0.5rem 0",
    color: "#da00ff",
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
    maxWidth: "600px",
    margin: "2rem auto",
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
    <>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Instant, Data-Driven Insights</h1>
        <p style={styles.heroSubtitle}>
          Validate your business ideas with real-world data and AI analysis.
        </p>
      </section>
      <section style={styles.formContainer}>
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
      </section>
      {response && (
        <section style={styles.responseSection}>
          <div
            style={styles.responseContent}
            dangerouslySetInnerHTML={{ __html: response }}
          />
        </section>
      )}
    </>
  );
}