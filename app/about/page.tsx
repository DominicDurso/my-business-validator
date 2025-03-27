"use client";

import React, { CSSProperties } from "react";

type StyleMap = { [key: string]: CSSProperties };

const styles: StyleMap = {
  contentSection: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    color: "#da00ff",
    marginBottom: "1rem",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
  },
};

export default function About() {
  return (
    <main>
      <section style={styles.contentSection}>
        <h2 style={styles.heading}>Our Mission</h2>
        <p style={styles.paragraph}>
          AI Business Validator is designed to empower entrepreneurs by providing fast,
          data-driven insights into the viability of their business ideas. Our goal is to
          save time, reduce risk, and help innovators bring their concepts to life with confidence.
        </p>

        <h2 style={styles.heading}>How It Works</h2>
        <p style={styles.paragraph}>
          By leveraging advanced AI and real-world data sources like Google Trends, our platform
          analyzes key aspects of your business idea – from market potential to competitive challenges.
          The result is a clear, actionable evaluation that helps you understand the strengths and
          potential pitfalls of your concept.
        </p>

        <h2 style={styles.heading}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li>Fast, automated, and reliable business idea validation</li>
          <li>Data-driven insights backed by real-time trends</li>
          <li>Clear, bullet-pointed analysis for quick decision-making</li>
          <li>User-friendly interface with a modern, minimalistic design</li>
        </ul>
      </section>
    </main>
  );
}