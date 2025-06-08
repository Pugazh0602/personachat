import { NextRequest, NextResponse } from "next/server"

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

async function getGroqResponse(systemPrompt: string, message: string) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "qwen-qwq-32b",
      temperature: 0.6,
      max_tokens: 32768,
      top_p: 0.95,
      stream: false
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.statusText}`);
  }

  const data = await response.json();
  let content = data.choices[0].message.content;
  // Remove <think> and </think> tags
  content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  return content;
}

export async function POST(req: NextRequest) {
  const { message, personas, language } = await req.json()

  // Build a persona prompt
  const personaDescriptions = personas
    ?.map((p: any) => `${p.name} (${p.role})`)
    .join(", ") || "Bot"
  let systemPrompt = `You are acting as: ${personaDescriptions}. Respond in their style. Keep your response very concise and to the point. Only provide the direct response and do not include any internal thoughts, markdown, or other symbols.`

  // Add language instruction if Tamil or Thanglish is selected
  if (language === "ta") {
    systemPrompt += ` Respond only in Tamil. Do not use asterisks or any other symbols in your responses.`
  } else if (language === "thanglish") {
    systemPrompt += ` Respond in Tamil language, transliterated into English script, with very few English words mixed in. Do not use asterisks or any other symbols in your responses.`
  } else {
    systemPrompt += ` Do not use asterisks or any other symbols in your responses.`
  }

  try {
    const reply = await getGroqResponse(systemPrompt, message);
    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error("API error:", err)
    return NextResponse.json({ reply: `API error: ${err.message || err}` }, { status: 500 })
  }
} 