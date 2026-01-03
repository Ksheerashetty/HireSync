
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Role: Senior AI Recruitment Engineer & Talent Auditor.
Task: Deep-dive analysis of a candidate's Resume against a specific Job Description (JD).

OBJECTIVES:
1. QUANTIFY: Provide a total matchScore (0-100) based on weighted alignment.
2. REASON: Use "Chain of Thought" processing to justify the score.
3. EXTRACT: Isolate verified matching skills, clear missing gaps, and estimate total years of relevant experience.
4. SUMMARIZE: Write a concise verdict mentioning strengths and weaknesses.

OUTPUT SCHEMA:
{
  "candidateName": "String",
  "matchScore": Integer (0-100),
  "experienceYears": Integer,
  "thoughtProcess": "Detailed reasoning.",
  "radarData": [
    {"subject": "Technical", "score": 0-100, "fullMark": 100},
    {"subject": "Soft Skills", "score": 0-100, "fullMark": 100},
    {"subject": "Experience", "score": 0-100, "fullMark": 100},
    {"subject": "Education", "score": 0-100, "fullMark": 100},
    {"subject": "Certifications", "score": 0-100, "fullMark": 100}
  ],
  "matchingSkills": ["Array"],
  "missingSkills": ["Array"],
  "explanation": "Summary verdict."
}
`;

export async function analyzeResume(resumeText: string, jobDescription: string): Promise<AnalysisResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
    [JD]
    ${jobDescription}
    [RESUME]
    ${resumeText}
    `,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          candidateName: { type: Type.STRING },
          matchScore: { type: Type.NUMBER },
          experienceYears: { type: Type.NUMBER },
          thoughtProcess: { type: Type.STRING },
          radarData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                score: { type: Type.NUMBER },
                fullMark: { type: Type.NUMBER }
              },
              required: ["subject", "score", "fullMark"]
            }
          },
          matchingSkills: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          missingSkills: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          explanation: { type: Type.STRING }
        },
        required: ["candidateName", "matchScore", "thoughtProcess", "radarData", "matchingSkills", "missingSkills", "explanation"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Analysis failed.");
  
  try {
    return JSON.parse(text) as AnalysisResponse;
  } catch (e) {
    throw new Error("Malformed analysis data.");
  }
}
