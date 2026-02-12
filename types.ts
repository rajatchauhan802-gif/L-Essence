
export enum AppView {
  ONBOARDING = 'ONBOARDING',
  PAIRING = 'PAIRING',
  DASHBOARD = 'DASHBOARD',
  LIBRARY = 'LIBRARY',
  MOMENTS = 'MOMENTS',
  PROFILE = 'PROFILE'
}

export enum DiffusionIntensity {
  SOFT = 'SOFT',
  BALANCED = 'BALANCED',
  EXPRESSIVE = 'EXPRESSIVE'
}

export interface JourneyStep {
  title: string;
  description: string;
}

export interface SourcingInfo {
  origin: string;
  sustainabilityScore: number; // 0-100
  ethicalPractices: string[];
  story: string;
  methods: string;
  communityImpact: string;
  certifications: string[];
  journeySteps: JourneyStep[];
}

export interface FragranceNote {
  level: 'Top' | 'Heart' | 'Base';
  name: string;
  description: string;
  sourcing?: SourcingInfo;
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  notes: FragranceNote[];
  moods: string[];
  description: string;
  story: string;
  intensity: DiffusionIntensity;
  remainingPercentage: number;
}

export interface JourneyStage {
  guidance: string;
  feeling: string;
  intensityRecommendation: DiffusionIntensity;
  ritual: string;
}

export interface FragranceGuidance {
  tone: string;
  poeticSuggestion: string;
  why: string;
  journey: {
    top: JourneyStage;
    heart: JourneyStage;
    base: JourneyStage;
  };
}
