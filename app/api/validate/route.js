import { NextResponse } from "next/server";
import axios from "axios";
import { getTrendsData } from "./getTrends";

export async function POST(request) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return new NextResponse("Business idea is required", { status: 400 });
    }

    // Optionally fetch Google Trends data
    const trendsData = await getTrendsData(idea);

    // Updated system prompt:
    // GPT should use headings like "## Market Potential" and bullet points "- "
    // No other Markdown or HTML.
    const systemPrompt = `
You are a seasoned business consultant. Provide a thorough analysis of the user's business idea in five sections:
## Market Potential
## Competition
## Viability
## Risks
## Recommendations

Under each heading, use bullet points that begin with "- " to list key points. No other Markdown or symbols. 
Incorporate the following Google Trends data where relevant:
${JSON.stringify(trendsData, null, 2)}

Business Idea: ${idea}
`;

    // Call the OpenAI API
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Business Idea: ${idea}` },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Raw GPT output
    let rawText = openaiResponse.data.choices[0].message.content;

    // Remove leftover markdown symbols (#, *) just in case
    rawText = rawText.replace(/\*/g, "");

    // Convert the GPT "pseudo-Markdown" to HTML
    // We'll parse line-by-line, turning headings "## " into <h2> and bullet lines "- " into <li>.
    // We also wrap bullet lines in a <ul> block.

    const lines = rawText.split("\n");
    let html = "";
    let inList = false;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        // Close any open list
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        // Create an <h2> from the heading
        const headingText = trimmed.replace("## ", "").trim();
        html += `<h2 style="font-size:1.4rem; font-weight:bold; margin-top:1rem; color:#8A2BE2;">${headingText}</h2>`;
      } else if (trimmed.startsWith("- ")) {
        // Bullet point
        if (!inList) {
          // open a new list
          html += `<ul style="margin:0 0 1rem 1.5rem; padding:0;">`;
          inList = true;
        }
        const bulletText = trimmed.replace("- ", "").trim();
        html += `<li style="margin-bottom:0.5rem;">${bulletText}</li>`;
      } else if (trimmed.length > 0) {
        // Close any open list
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        // It's a normal paragraph
        html += `<p style="margin-top:0.5rem;">${trimmed}</p>`;
      }
      // if it's an empty line, we ignore or close the list if needed
    });

    // Close any final open list
    if (inList) {
      html += "</ul>";
      inList = false;
    }

    // Return as HTML
    return new NextResponse(html.trim(), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    return new NextResponse("Sorry, there are technical difficulties currently.", {
      status: 500,
    });
  }
}