import { DimensionMeta } from "@/types";

export const DIMENSIONS: DimensionMeta[] = [
  {
    key: "hook_strength",
    label: "Hook Strength",
    description:
      "Does the first line stop the scroll? We measure opening impact, curiosity triggers, and emotional activation.",
  },
  {
    key: "value_proposition",
    label: "Value Proposition",
    description:
      "Is it obvious what the product does and why the reader should care? We check for clear benefits over features.",
  },
  {
    key: "copy_flow",
    label: "Copy Flow",
    description:
      "Does each sentence earn the next? We analyze rhythm, transitions, and whether the structure holds attention.",
  },
  {
    key: "cta_effectiveness",
    label: "CTA Effectiveness",
    description:
      "Does the call to action create urgency and reduce friction? We evaluate specificity, positioning, and commitment level.",
  },
  {
    key: "audience_fit",
    label: "Audience Fit",
    description:
      "Does the tone match the target? We assess language register, cultural signals, and trust-building alignment.",
  },
];

export const EXAMPLE_COPIES = [
  {
    label: "E-commerce",
    copy: `Tired of skincare that promises everything and delivers nothing?

Our vitamin C serum was tested on 2,000+ real people (not lab conditions) and 94% saw visible results in 14 days.

No fragrance. No filler. No BS.

Grab yours for 30% off this week only — your skin will thank you.

→ Shop Now`,
  },
  {
    label: "SaaS",
    copy: `Your team wastes 5 hours a week searching for files.

Dropzone indexes every document, message, and link across all your tools — Slack, Drive, Notion, you name it — and makes it searchable in under 200ms.

No more "where did I see that?" moments.

Start free. No credit card required.

→ Try Dropzone Free`,
  },
  {
    label: "Personal Brand",
    copy: `I spent 8 years in corporate marketing before building a $2M solo business.

Here's what I learned: The best marketing strategy is one you actually enjoy doing.

Every week, I break down what's working in my business — the ads, the funnels, the copy — with real numbers.

Join 12,000+ marketers getting my Saturday breakdown.

→ Subscribe Free`,
  },
];

