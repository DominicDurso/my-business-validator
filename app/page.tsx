"use client";

import React, { useState, FormEvent } from "react";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse("Error processing request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header Section */}
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Business Idea Validator
      </h1>
      <p
        style={{
          maxWidth: "600px",
          textAlign: "center",
          fontSize: "1.1rem",
          lineHeight: 1.5,
          marginBottom: "2rem",
        }}
      >
        Validate your business idea instantly with our AI-powered tool. Enter
        your concept below and get a direct, data-driven analysis.
      </p>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#111",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
        }}
      >
        <label
          htmlFor="idea"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Enter your business idea:
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={5}
          placeholder="Describe your business idea here..."
          style={{
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
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            background:
              "linear-gradient(90deg, rgba(218,0,255,1) 0%, rgba(119,0,255,1) 100%)",
            color: "#fff",
            transition: "opacity 0.2s ease",
          }}
        >
          {loading ? "Validating..." : "Validate Idea"}
        </button>
      </form>

      {/* Response Section */}
      {response && (
        <div
          style={{
            marginTop: "2rem",
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#111",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </div>
      )}
    </main>
  );
}



