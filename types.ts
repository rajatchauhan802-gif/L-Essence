
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

export interface FragranceNote {
  level: 'Top' | 'Heart' | 'Base';
  name: string;
  description: string;
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
