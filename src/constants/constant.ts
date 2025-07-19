export const QUIZ_STAGES = {
  REGISTRATION: 'registration',
  START: 'start',
  IN_PROGRESS: 'in_progress',
  ENDED: 'ended'
} as const;

export type QuizStage = typeof QUIZ_STAGES[keyof typeof QUIZ_STAGES];