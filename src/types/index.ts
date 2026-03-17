export interface DimensionScore {
  score: number;
  reasoning: string;
  suggestion: string;
}

export interface AnalysisResult {
  hook_strength: DimensionScore;
  value_proposition: DimensionScore;
  copy_flow: DimensionScore;
  cta_effectiveness: DimensionScore;
  audience_fit: DimensionScore;
  overall_score: number;
  top_improvement: string;
}

export type DimensionKey = keyof Omit<AnalysisResult, "overall_score" | "top_improvement">;

export interface DimensionMeta {
  key: DimensionKey;
  label: string;
  description: string;
}

export interface PricingFeature {
  readonly text: string;
  readonly included: boolean;
  readonly highlight?: boolean;
}

export interface PricingTier {
  readonly id: "free" | "pro" | "enterprise";
  readonly name: string;
  readonly tagline: string;
  readonly price: string;
  readonly priceSuffix: string;
  readonly recommended: boolean;
  readonly ctaText: string;
  readonly ctaVariant: "outline" | "accent" | "glass";
  readonly features: readonly PricingFeature[];
}

export type AnalysisState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: AnalysisResult }
  | { status: "error"; message: string };
