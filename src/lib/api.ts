import { AnalysisResult } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function getScoreColor(score: number): string {
  if (score >= 9) return "#E8FF47";
  if (score >= 7) return "#22C55E";
  if (score >= 5) return "#EAB308";
  if (score >= 4) return "#F97316";
  return "#EF4444";
}

export { getScoreColor };

function generateMockResult(): AnalysisResult {
  const randomScore = (min: number, max: number) =>
    Math.round((min + Math.random() * (max - min)) * 10) / 10;

  const hookScore = randomScore(5, 9);
  const vpScore = randomScore(4, 8);
  const flowScore = randomScore(5, 9);
  const ctaScore = randomScore(3, 10);
  const fitScore = randomScore(4, 8);

  const scores = [hookScore, vpScore, flowScore, ctaScore, fitScore];
  const overall =
    Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;

  return {
    hook_strength: {
      score: hookScore,
      reasoning:
        "The opening line creates immediate tension by calling out a universal pain point. It reads as confrontational in a productive way — the reader feels seen.",
      suggestion:
        "Add a specific number or time frame to the hook to increase credibility. Instead of a general question, try: 'You've wasted $X on ads that didn't convert.'",
    },
    value_proposition: {
      score: vpScore,
      reasoning:
        "The core benefit is present but buried mid-copy. The reader has to work to understand what they're getting. Features are leading where outcomes should be.",
      suggestion:
        "Move the primary outcome to the second sentence. Lead with what changes for the reader, not what the product does.",
    },
    copy_flow: {
      score: flowScore,
      reasoning:
        "Good rhythm in the first half — short punchy sentences that build momentum. The transition to the CTA feels slightly abrupt, breaking the narrative arc.",
      suggestion:
        "Add a one-sentence bridge before the CTA that connects the proof to the action. Something like: 'Your next ad could be your best one.'",
    },
    cta_effectiveness: {
      score: ctaScore,
      reasoning:
        "The CTA is specific and action-oriented, which is strong. However, it lacks urgency — there's no reason to act now versus next week.",
      suggestion:
        "Add a time-bound element or scarcity signal. 'Start your free trial — 3 spots left this month' outperforms generic CTAs by 2-3x.",
    },
    audience_fit: {
      score: fitScore,
      reasoning:
        "The tone is conversational and modern, which works well for digital-first audiences. Some jargon assumptions may alienate newer marketers.",
      suggestion:
        "Replace industry shorthand with plain language equivalents. 'Conversion rate' → 'the percentage of people who buy.' You'll widen the audience without losing sophisticates.",
    },
    overall_score: overall,
    top_improvement:
      "Your biggest lever is the value proposition. Move the core benefit — what changes for the reader — to the second sentence. Right now it's buried behind features. This single change typically lifts engagement by 20-30%.",
  };
}

export async function analyzeCopy(adCopy: string): Promise<AnalysisResult> {
  if (!API_BASE) {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return generateMockResult();
  }

  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ad_copy: adCopy }),
  });

  if (!response.ok) {
    throw new Error("Analysis failed. Please try again.");
  }

  return response.json();
}
