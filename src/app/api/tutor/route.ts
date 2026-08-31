import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const topic = body.topic ?? "selected topic";
  const subject = body.subject ?? "Science";

  return NextResponse.json({
    provider: process.env.AI_PROVIDER || "demo",
    subject,
    topic,
    answer: {
      simpleMeaning: `${topic} is explained using daily-life examples so the student understands before memorising.`,
      difficultWords: [
        { word: "Concept", meaning: "The main idea of a topic." },
        { word: "Example", meaning: "A real situation that helps us understand the concept." }
      ],
      examples: [
        `School-life example for ${topic}`,
        `Home/kitchen example for ${topic}`,
        `Exam-style example for ${topic}`
      ],
      examAnswer: `Write the definition of ${topic}, then explain it step-by-step with one example.`,
      quickCheck: `Give one real-life example of ${topic}.`
    }
  });
}
