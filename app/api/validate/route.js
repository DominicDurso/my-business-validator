import { NextResponse } from "next/server";
import axios from "axios";
import { getTrendsData } from "./getTrends";

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { idea } = await request.json();

    if (!idea) {
      return new NextResponse("Business idea is required", { status: 400 });
    }

    // Fetch Google Trends data for the given idea
    const trendsData = await getTrendsData(idea);

    // Prepare the system prompt with the trends data included
    const systemPrompt = `
You are a seasoned business consultant with decades of experience evaluating business ideas for a top-tier consulting firm. Your role is to provide a comprehensive, data-driven, and objective analysis of any business idea provided. Your evaluation must be structured, detailed, and direct, leaving no ambiguity for the entrepreneur. Avoid any sugarcoating; be clear, precise, and forthright in your assessments.

For each business idea, your response must address the following categories:

1. Market Potential:
   - Analyze the target market thoroughly, including its size, growth trends, and demand.
   - Identify key customer segments and geographic considerations.
   - Compare the idea with industry benchmarks and note whether the market is saturated, emerging, or niche.
   - Provide any relevant statistics or metrics that can substantiate your analysis.

2. Competition:
   - Identify major competitors, both direct and indirect, and assess their market share.
   - Examine the competitive landscape, noting strengths and weaknesses.
   - Evaluate whether the idea can effectively differentiate itself from competitors.
   - Discuss any barriers to entry that could hinder success.

3. Viability:
   - Evaluate the operational feasibility, including startup costs, potential revenue streams, and scalability.
   - Provide a financial perspective by discussing profitability margins, break-even points, and funding requirements.
   - Consider strategic partnerships or resource dependencies that are critical for success.
   - State any assumptions you are making if precise data is unavailable.

4. Risks:
   - Identify and outline the key risks associated with the business idea, such as market, operational, regulatory, and competitive risks.
   - Analyze the severity of these risks and discuss potential mitigation strategies.
   - Clearly state if the risks outweigh the potential benefits.

5. Recommendations:
   - Offer clear, actionable recommendations regarding whether the idea should be pursued.
   - If the idea is not feasible, be unequivocal in stating so, and provide detailed reasons why.
   - Suggest any modifications or additional research that could enhance the viability of the idea.
   - Present your conclusions in a direct, no-nonsense manner, ensuring that an entrepreneur would not need to ask multiple follow-up questions.

In addition, incorporate the following Google Trends data into your analysis:
Google Trends Data (Interest Over Time):
${JSON.stringify(trendsData, null, 2)}

Business Idea: ${idea}
    `;

    // Call OpenAI API with the system prompt including trends data
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // or "gpt-4" if available
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Business Idea: ${idea}`,
          },
        ],
        // Increase max_tokens if you need a longer output
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

    // Raw AI response
    const result = openaiResponse.data.choices[0].message.content;

    // POST-PROCESS: Remove Markdown symbols (# and *) to clean up the output
    let cleanedResult = result
      .replace(/#/g, "")   // remove all '#' characters
      .replace(/\*/g, ""); // remove all '*' characters

    // Return the cleaned output
    return new NextResponse(cleanedResult.trim(), {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    return new NextResponse("Error processing request", { status: 500 });
  }
}