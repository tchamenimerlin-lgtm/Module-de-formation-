import {
  AfroHairstyle,
  BarberTool,
  ChapterData,
  GuardGuide,
  HairTextureCode,
  LeverPosition,
  ProgressState,
  QuizQuestion,
  QuizResultRecord,
  SkillLevel,
  ToolCategory,
} from '../types/academy';

export const PASSING_THRESHOLD = 70;

export const LEVER_OFFSETS_MM: Record<LeverPosition, number> = {
  closed: 0,
  quarter: 0.25,
  half: 0.5,
  'three-quarter': 0.75,
  open: 1.0,
};

export const LEVER_LABELS_FR: Record<LeverPosition, string> = {
  closed: 'Fermé (0 %)',
  quarter: 'Quart-ouvert (25 %)',
  half: 'Demi-ouvert (50 %)',
  'three-quarter': 'Trois-quarts (75 %)',
  open: 'Ouvert (100 %)',
};

/**
 * Computes effective cutting length in millimeters for a given guard and lever setting.
 */
export function computeEffectiveCutLengthMm(
  guard: GuardGuide,
  lever: LeverPosition
): number {
  const delta = guard.mmOpen - guard.mmClosed;
  const fraction = LEVER_OFFSETS_MM[lever];
  const raw = guard.mmClosed + delta * fraction;
  return Math.round(raw * 100) / 100;
}

export interface QuizEvaluationItem {
  questionId: string;
  selectedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
}

export interface QuizEvaluationResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  items: QuizEvaluationItem[];
}

/**
 * Pure grading function for any quiz session.
 */
export function evaluateQuizAnswers(
  questions: QuizQuestion[],
  selectedAnswers: Record<string, number>
): QuizEvaluationResult {
  const total = questions.length;
  if (total === 0) {
    return { score: 0, total: 0, percentage: 0, passed: false, items: [] };
  }

  let score = 0;
  const items: QuizEvaluationItem[] = questions.map((q) => {
    const selected =
      typeof selectedAnswers[q.id] === 'number' ? selectedAnswers[q.id] : null;
    const isCorrect = selected === q.correctIndex;
    if (isCorrect) score += 1;
    return {
      questionId: q.id,
      selectedIndex: selected,
      correctIndex: q.correctIndex,
      isCorrect,
    };
  });

  const percentage = Math.round((score / total) * 100);
  return {
    score,
    total,
    percentage,
    passed: percentage >= PASSING_THRESHOLD,
    items,
  };
}

export interface LevelProgressSummary {
  level: SkillLevel;
  totalChapters: number;
  validatedChapters: number;
  completedExercises: number;
  passedQuizzes: number;
  completionPercentage: number;
  isValidated: boolean;
}

export interface AcademyProgressOverview {
  totalChapters: number;
  validatedChaptersCount: number;
  completedExercisesCount: number;
  passedChapterQuizzesCount: number;
  averageQuizScore: number | null;
  overallProgressPercentage: number;
  levels: LevelProgressSummary[];
  currentRankLabel: string;
}

/**
 * A chapter is considered fully validated when marked completed OR its exercise is checked AND its quiz is passed,
 * OR simply marked completed by the learner. Here we compute a transparent weighted readiness score:
 * - 40% chapter lessons completed
 * - 30% practical exercises validated
 * - 30% chapter quizzes passed (>= 70%)
 */
export function computeAcademyProgress(
  chapters: ChapterData[],
  progress: ProgressState
): AcademyProgressOverview {
  const totalChapters = chapters.length;
  const completedSet = new Set(progress.completedChapters);
  const exerciseSet = new Set(progress.completedExercises);

  const isChapterValidated = (chapterId: number): boolean => {
    const quiz = progress.chapterQuizScores[chapterId];
    return (
      completedSet.has(chapterId) ||
      (exerciseSet.has(chapterId) && Boolean(quiz?.passed))
    );
  };

  const validatedChaptersCount = chapters.filter((c) =>
    isChapterValidated(c.id)
  ).length;
  const completedExercisesCount = chapters.filter((c) =>
    exerciseSet.has(c.id)
  ).length;
  const passedChapterQuizzesCount = chapters.filter((c) =>
    Boolean(progress.chapterQuizScores[c.id]?.passed)
  ).length;

  const validChapterIds = new Set(chapters.map((c) => c.id));
  const allQuizRecords: QuizResultRecord[] = [
    ...Object.entries(progress.chapterQuizScores)
      .filter(([id]) => validChapterIds.has(Number(id)))
      .map(([, rec]) => rec),
    ...Object.values(progress.categoryQuizScores),
  ];

  const averageQuizScore =
    allQuizRecords.length > 0
      ? Math.round(
          allQuizRecords.reduce((acc, item) => acc + item.percentage, 0) /
            allQuizRecords.length
        )
      : null;

  const overallProgressPercentage =
    totalChapters === 0
      ? 0
      : Math.round(
          ((validatedChaptersCount / totalChapters) * 0.4 +
            (completedExercisesCount / totalChapters) * 0.3 +
            (passedChapterQuizzesCount / totalChapters) * 0.3) *
            100
        );

  const levelOrder: SkillLevel[] = ['Débutant', 'Intermédiaire', 'Avancé'];
  const levels: LevelProgressSummary[] = levelOrder.map((level) => {
    const levelChapters = chapters.filter((c) => c.level === level);
    const total = levelChapters.length;
    const validated = levelChapters.filter((c) => isChapterValidated(c.id)).length;
    const exercises = levelChapters.filter((c) => exerciseSet.has(c.id)).length;
    const quizzes = levelChapters.filter((c) =>
      Boolean(progress.chapterQuizScores[c.id]?.passed)
    ).length;

    const completionPercentage =
      total === 0
        ? 0
        : Math.round(
            ((validated / total) * 0.4 +
              (exercises / total) * 0.3 +
              (quizzes / total) * 0.3) *
              100
          );

    return {
      level,
      totalChapters: total,
      validatedChapters: validated,
      completedExercises: exercises,
      passedQuizzes: quizzes,
      completionPercentage,
      isValidated: total > 0 && validated === total && quizzes === total,
    };
  });

  let currentRankLabel = 'Apprenti Débutant';
  if (levels[2]?.isValidated) {
    currentRankLabel = 'Master Afro Barber Certifié';
  } else if (levels[1]?.isValidated) {
    currentRankLabel = 'Barber Confirmé (Niveau Avancé)';
  } else if (levels[0]?.isValidated) {
    currentRankLabel = 'Barber Junior (Niveau Intermédiaire)';
  } else if (overallProgressPercentage >= 20) {
    currentRankLabel = 'Apprenti en Progression';
  }

  return {
    totalChapters,
    validatedChaptersCount,
    completedExercisesCount,
    passedChapterQuizzesCount,
    averageQuizScore,
    overallProgressPercentage,
    levels,
    currentRankLabel,
  };
}

export function filterHairstyles(
  styles: AfroHairstyle[],
  query: string,
  levelFilter: SkillLevel | 'Tous',
  hairTypeFilter: HairTextureCode | 'Tous'
): AfroHairstyle[] {
  const q = query.trim().toLowerCase();
  return styles.filter((style) => {
    const matchesLevel = levelFilter === 'Tous' || style.difficulty === levelFilter;
    const matchesHair =
      hairTypeFilter === 'Tous' || style.suitableHairTypes.includes(hairTypeFilter);
    const matchesQuery =
      q.length === 0 ||
      style.name.toLowerCase().includes(q) ||
      style.description.toLowerCase().includes(q) ||
      style.category.toLowerCase().includes(q);
    return matchesLevel && matchesHair && matchesQuery;
  });
}

export function filterTools(
  tools: BarberTool[],
  query: string,
  categoryFilter: ToolCategory | 'Tous'
): BarberTool[] {
  const q = query.trim().toLowerCase();
  return tools.filter((tool) => {
    const matchesCat = categoryFilter === 'Tous' || tool.category === categoryFilter;
    const matchesQuery =
      q.length === 0 ||
      tool.name.toLowerCase().includes(q) ||
      tool.englishName.toLowerCase().includes(q) ||
      tool.purpose.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });
}

export const EMPTY_PROGRESS: ProgressState = {
  completedChapters: [],
  completedExercises: [],
  chapterQuizScores: {},
  categoryQuizScores: {},
  personalNotes: {},
};

export function normalizeProgressState(raw: unknown): ProgressState {
  if (!raw || typeof raw !== 'object') {
    return { ...EMPTY_PROGRESS };
  }
  const obj = raw as Partial<ProgressState>;
  return {
    completedChapters: Array.isArray(obj.completedChapters)
      ? Array.from(new Set(obj.completedChapters.filter((n) => typeof n === 'number')))
      : [],
    completedExercises: Array.isArray(obj.completedExercises)
      ? Array.from(new Set(obj.completedExercises.filter((n) => typeof n === 'number')))
      : [],
    chapterQuizScores:
      obj.chapterQuizScores && typeof obj.chapterQuizScores === 'object'
        ? obj.chapterQuizScores
        : {},
    categoryQuizScores:
      obj.categoryQuizScores && typeof obj.categoryQuizScores === 'object'
        ? obj.categoryQuizScores
        : {},
    personalNotes:
      obj.personalNotes && typeof obj.personalNotes === 'object'
        ? obj.personalNotes
        : {},
  };
}
