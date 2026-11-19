export type NavView =
  | 'home'
  | 'program'
  | 'course'
  | 'gallery'
  | 'tools'
  | 'quiz'
  | 'progress'
  | 'resources';

export type SkillLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';

export type HairTextureCode = '3A' | '3B' | '3C' | '4A' | '4B' | '4C';

export type LeverPosition = 'closed' | 'quarter' | 'half' | 'three-quarter' | 'open';

export type DiagramKind =
  | 'face-shapes'
  | 'tool-comparison'
  | 'clipper-simulator'
  | 'fade-blueprint'
  | 'style-proportions'
  | 'head-sectioning'
  | 'lineup-geometry'
  | 'hygiene-cycle'
  | 'client-journey';

export interface AssetItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  figureCode: string;
}

export interface HairTextureProfile {
  code: HairTextureCode;
  name: string;
  shortLabel: string;
  imageId: string;
  caption: string;
  presentation: string;
  visualAppearance: string;
  densityAndShrinkage: string;
  shrinkagePercent: string;
  clipperBehavior: string;
  prepTechniques: string[];
  careAdvice: string[];
}

export type ToolCategory = 'Machines' | 'Lames & Ciseaux' | 'Peignes & Brosses' | 'Accessoires & Hygiène';

export interface BarberTool {
  id: string;
  number: number;
  name: string;
  englishName: string;
  category: ToolCategory;
  imageId: string;
  caption: string;
  purpose: string;
  howToHold: string;
  howToUse: string;
  mistakesToAvoid: string[];
  maintenanceAndDisinfection: string;
}

export interface GuardGuide {
  code: string;
  numericValue: number;
  label: string;
  mmClosed: number;
  mmOpen: number;
  inches: string;
  primaryUse: string;
  fadeRole: string;
}

export interface FadeType {
  id: string;
  number: number;
  name: string;
  frenchSubtitle: string;
  difficulty: SkillLevel;
  imageId: string;
  caption: string;
  visualCue: string;
  principle: string;
  heightZone: string;
  transitionZones: string;
  requiredTools: string[];
  firstLinePosition: string;
  guardsUsed: string[];
  leverSettings: string;
  passOrder: string[];
  lineRemovalMethod: string;
  finishingCheck: string;
  svgProfile:
    | 'low'
    | 'mid'
    | 'high'
    | 'skin'
    | 'bald'
    | 'taper'
    | 'drop'
    | 'burst'
    | 'temple'
    | 'shadow';
}

export interface AfroHairstyle {
  id: string;
  number: number;
  name: string;
  category: 'Afro & Volume' | 'Dégradés & Courts' | 'Textures & Twists' | 'Artistique & Contours';
  imageId: string;
  caption: string;
  visualCue: string;
  description: string;
  materials: string[];
  steps: string[];
  difficulty: SkillLevel;
  suitableHairTypes: HairTextureCode[];
  hairProfileNote: string;
}

export interface LessonSection {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
  figureId?: string;
  figureCaption?: string;
}

export interface ConcreteExample {
  scenario: string;
  diagnosis: string;
  action: string;
  result: string;
}

export interface PracticalExercise {
  title: string;
  duration: string;
  objective: string;
  equipment: string[];
  steps: string[];
  validationCriteria: string[];
}

export interface ChapterData {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  level: SkillLevel;
  durationMinutes: number;
  summaryIntro: string;
  objectives: string[];
  heroImageId: string;
  heroCaption: string;
  diagramKind: DiagramKind;
  sections: LessonSection[];
  concreteExamples: ConcreteExample[];
  proTips: string[];
  commonMistakes: string[];
  keyTakeaways: string[];
  exercise: PracticalExercise;
}

export type QuizCategory =
  | 'qcm-general'
  | 'comprehension'
  | 'sabots'
  | 'fades'
  | 'pratique'
  | 'chapter';

export interface QuizQuestion {
  id: string;
  chapterId: number;
  category: Exclude<QuizCategory, 'chapter'>;
  prompt: string;
  contextDetail?: string;
  imageId?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResultRecord {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export interface ProgressState {
  completedChapters: number[];
  completedExercises: number[];
  chapterQuizScores: Record<number, QuizResultRecord>;
  categoryQuizScores: Record<string, QuizResultRecord>;
  personalNotes: Record<number, string>;
}

export interface GlossaryEntry {
  termFr: string;
  termEn: string;
  category: string;
  definition: string;
}
