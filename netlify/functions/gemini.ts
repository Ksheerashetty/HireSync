import { GoogleGenerativeAI } from "@google/generative-ai";

export default async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent("Hello from HireSync");

  return new Response(
    JSON.stringify({ text: result.response.text() }),
    { status: 200 }
  );
};
