const axios = require("axios");

function buildPrompt(files) {
  let text = `
Review the following source code for:

1. Readability
2. Modularity and code organization
3. Potential bugs or edge cases
4. Adherence to common best practices for the given language
5. Overall time and space complexity of the main functions / algorithms

Respond ONLY with a valid JSON object of this exact structure:

{
  "summary": "string",
  "scores": {
    "readability": 0-10,
    "modularity": 0-10,
    "potentialBugs": 0-10,
    "bestPractices": 0-10
  },
  "complexity": {
    "overallTime": "Big-O notation string, e.g. O(n log n)",
    "overallSpace": "Big-O notation string, e.g. O(n)",
    "notes": "Short explanation of the time/space complexity and any trade-offs"
  },
  "fileReviews": [
    {
      "filename": "string",
      "comments": [
        {
          "line": number or null,
          "type": "bug" | "style" | "refactor" | "best_practice",
          "severity": "low" | "medium" | "high",
          "message": "string",
          "suggestion": "string"
        }
      ]
    }
  ],
  "globalSuggestions": ["string"]
}

Do not include any text outside the JSON.
`;

  text += "\n\nHere are the files:\n\n";

  files.forEach((f, idx) => {
    text += `--- FILE ${idx + 1}: ${f.filename} (language: ${f.language}) ---\n`;
    text += f.content;
    text += `\n--- END FILE ---\n\n`;
  });

  return text;
}

async function getCodeReview(files) {
  const prompt = buildPrompt(files);

  const apiKey = process.env.LLM_API_KEY;

  console.log(
    "LLM_API_KEY loaded?",
    apiKey ? "yes" : "no",
    apiKey ? `(prefix: ${apiKey.slice(0, 4)}, length: ${apiKey.length})` : ""
  );

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // Current Groq model (previous llama3-8b-8192 is decommissioned)
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a senior software engineer doing strict code reviews.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonText = response.data.choices[0].message.content;
    const result = JSON.parse(jsonText);

    return result;
  } catch (err) {
    console.error("LLM API error status:", err.response?.status);
    console.error("LLM API error data:", err.response?.data);
    throw err;
  }
}

module.exports = { getCodeReview };


