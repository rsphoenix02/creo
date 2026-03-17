import { DimensionMeta, PricingTier } from "@/types";

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

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Explore the framework",
    price: "$0",
    priceSuffix: "forever",
    recommended: false,
    ctaText: "Start Analyzing",
    ctaVariant: "outline",
    features: [
      { text: "5 analyses per month", included: true },
      { text: "All 5 dimension scores", included: true },
      { text: "Overall composite score", included: true },
      { text: "Top improvement summary", included: true },
      { text: "Detailed per-dimension reasoning", included: false },
      { text: "Actionable rewrite suggestions", included: false },
      { text: "Analysis history & export", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For serious marketers",
    price: "$29",
    priceSuffix: "/ month",
    recommended: true,
    ctaText: "Upgrade to Pro",
    ctaVariant: "accent",
    features: [
      { text: "Unlimited analyses", included: true, highlight: true },
      { text: "All 5 dimensions with reasoning", included: true },
      { text: "Actionable rewrite suggestions", included: true, highlight: true },
      { text: "Full analysis history & export", included: true },
      { text: "Priority analysis queue", included: true },
      { text: "Competitor copy comparison", included: true },
      { text: "Tone & audience presets", included: true },
      { text: "Email support", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Scale your creative team",
    price: "Custom",
    priceSuffix: "per team",
    recommended: false,
    ctaText: "Contact Sales",
    ctaVariant: "glass",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited team seats", included: true, highlight: true },
      { text: "REST API with webhooks", included: true, highlight: true },
      { text: "Custom scoring dimensions", included: true, highlight: true },
      { text: "Brand voice calibration", included: true },
      { text: "Bulk analysis (CSV upload)", included: true },
      { text: "SSO & role-based access", included: true },
      { text: "Dedicated account manager", included: true },
    ],
  },
];
