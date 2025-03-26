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
        headers: { "Content-Type": "application/json" },
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
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h1>Business Idea Validator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="idea">Enter your business idea:</label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={5}
          style={{ width: "100%", marginTop: "0.5rem" }}
          placeholder="Describe your business idea here..."
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          {loading ? "Validating..." : "Validate Idea"}
        </button>
      </form>
      {response && (
        <div
          style={{
            whiteSpace: "pre-wrap",
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          {response}
        </div>
      )}
    </div>
  );
}