import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const topic = body.topic ?? "topic";
  const subject = body.subject ?? "subject";

  return NextResponse.json({
    status: "storyboard-created",
    storagePath: `topics/${subject}/${topic}/video-storyboard.json`,
    script: `A student sees a daily-life example of ${topic}. The narrator explains the concept in simple words, shows difficult-word meanings, connects it to CBSE exam answer, and ends with one quick check question.`,
    storyboard: [
      "Scene 1: Real-life situation",
      "Scene 2: Highlight concept visually",
      "Scene 3: Difficult word meaning on screen",
      "Scene 4: Exam connection",
      "Scene 5: Quick check question"
    ],
    futureProviders: ["Veo", "Runway", "Luma"]
  });
}
