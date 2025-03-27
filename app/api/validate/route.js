import { NextResponse } from "next/server";
import axios from "axios";
import { getTrendsData } from "./getTrends";

export async function POST(request) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return new NextResponse("Business idea is required", { status: 400 });
    }

    // Fetch Google Trends data (optional helper)
    const trendsData = await getTrendsData(idea);

    // Updated system prompt: force a consistent numbered structure
    const systemPrompt = `
You are a seasoned business consultant. Provide a comprehensive, data-driven analysis of the user's business idea. 
Use exactly the following numbered headings (in this order, with the exact numbering):

1. Market Potential
2. Competition
3. Viability
4. Risks
5. Recommendations

Write in paragraphs. Do not use bullet points or asterisks. If you need multiple points, separate them by line breaks(these are encouraged).
Incorporate this Google Trends data into your analysis:
Google Trends Data:
${JSON.stringify(trendsData, null, 2)}

Business Idea: ${idea}
`;

    // Call the OpenAI API
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // or "gpt-4" if you have access
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Business Idea: ${idea}` },
        ],
        max_tokens: 700,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Raw AI response text
    let result = openaiResponse.data.choices[0].message.content;

    // 1) Remove Markdown symbols (#, *) and any leading "- " if you want to remove leftover bullet points
    result = result
      .replace(/#/g, "")
      .replace(/\*/g, "")
      .replace(/^\s*-\s+/gm, ""); // remove lines starting with "- "

    // 2) Convert each numbered heading into <h2> with the same text
    //    We'll do a simple array for the headings we expect
    const headings = [
      "1. Market Potential",
      "2. Competition",
      "3. Viability",
      "4. Risks",
      "5. Recommendations",
    ];

    headings.forEach((heading) => {
      // Create a regex that finds lines matching "1. Market Potential" exactly (case-insensitive)
      const regex = new RegExp(heading.replace(".", "\\."), "gi");
      result = result.replace(regex, (match) => {
        // Insert the exact text as an <h2> with a subtle purple color
        return `<h2 style="font-size:1.4rem; font-weight:bold; margin-top:1rem; color:#8A2BE2;">${match}</h2>`;
      });
    });

    return new NextResponse(result.trim(), {
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