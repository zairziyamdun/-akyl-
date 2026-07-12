export type ChecklistAnswerValue = 0 | 1 | 2;

type ChecklistQuestion = {
  id: string;
  text: string;
};

type ChecklistCategory = {
  id: string;
  title: string;
  description: string;
  questions: ChecklistQuestion[];
};

export const ANSWER_OPTIONS: ReadonlyArray<{
  value: ChecklistAnswerValue;
  label: string;
}> = [
  { value: 0, label: "Нет" },
  { value: 1, label: "Частично" },
  { value: 2, label: "Да" },
];

export const CHECKLIST_CATEGORIES: readonly ChecklistCategory[] = [
  {
    id: "technical",
    title: "Техническая эксплуатация",
    description:
      "Плановость обслуживания, учёт инцидентов и контроль инженерных систем.",
    questions: [
      {
        id: "te-1",
        text: "Ведётся ли плановое техническое обслуживание?",
      },
      {
        id: "te-2",
        text: "Есть ли актуальный график осмотров?",
      },
      {
        id: "te-3",
        text: "Фиксируются ли аварии и инциденты?",
      },
      {
        id: "te-4",
        text: "Выполняется ли сезонная подготовка?",
      },
      {
        id: "te-5",
        text: "Контролируется ли состояние инженерных систем?",
      },
      {
        id: "te-6",
        text: "Ведётся ли учёт и паспортизация узлов и оборудования?",
      },
    ],
  },
  {
    id: "financial",
    title: "Финансовое управление",
    description:
      "Бюджет, план-факт, прозрачность расходов и контроль дебиторки.",
    questions: [
      {
        id: "fi-1",
        text: "Есть ли утверждённый бюджет дома?",
      },
      {
        id: "fi-2",
        text: "Проводится ли сравнение плана и факта?",
      },
      {
        id: "fi-3",
        text: "Публикуется ли отчёт по расходам?",
      },
      {
        id: "fi-4",
        text: "Контролируется ли задолженность?",
      },
      {
        id: "fi-5",
        text: "Есть ли прозрачная структура затрат?",
      },
      {
        id: "fi-6",
        text: "Предусмотрены ли резервы на внеплановые работы?",
      },
    ],
  },
  {
    id: "residents",
    title: "Работа с жителями",
    description:
      "Обратная связь, заявки, сроки реакции и вовлечённость собственников.",
    questions: [
      {
        id: "re-1",
        text: "Есть ли регулярная обратная связь с жителями?",
      },
      {
        id: "re-2",
        text: "Фиксируются ли обращения и заявки?",
      },
      {
        id: "re-3",
        text: "Есть ли понятные сроки ответа?",
      },
      {
        id: "re-4",
        text: "Публикуются ли результаты работ?",
      },
      {
        id: "re-5",
        text: "Проводятся ли опросы или собрания?",
      },
      {
        id: "re-6",
        text: "Оценивается ли удовлетворённость жителей?",
      },
    ],
  },
  {
    id: "contractors",
    title: "Управление подрядчиками",
    description: "Критерии отбора, контроль сроков и качества, учёт нарушений.",
    questions: [
      {
        id: "co-1",
        text: "Есть ли критерии оценки подрядчиков?",
      },
      {
        id: "co-2",
        text: "Контролируются ли сроки исполнения?",
      },
      {
        id: "co-3",
        text: "Оценивается ли качество выполненных работ?",
      },
      {
        id: "co-4",
        text: "Фиксируются ли нарушения?",
      },
      {
        id: "co-5",
        text: "Ведётся ли история взаимодействия с подрядчиками?",
      },
      {
        id: "co-6",
        text: "Соблюдаются ли процедуры допуска и смены подрядчиков?",
      },
    ],
  },
  {
    id: "effectiveness",
    title: "Эффективность управления",
    description:
      "KPI, отчётность, анализ отклонений и цифровой контроль процессов.",
    questions: [
      {
        id: "ef-1",
        text: "Используются ли KPI в управлении?",
      },
      {
        id: "ef-2",
        text: "Есть ли регулярная управленческая отчётность?",
      },
      {
        id: "ef-3",
        text: "Проводится ли анализ отклонений?",
      },
      {
        id: "ef-4",
        text: "Есть ли план улучшений?",
      },
      {
        id: "ef-5",
        text: "Используются ли цифровые инструменты контроля?",
      },
      {
        id: "ef-6",
        text: "Зафиксированы ли роли и зоны ответственности?",
      },
    ],
  },
] as const;

export const TOTAL_CHECKLIST_QUESTIONS = CHECKLIST_CATEGORIES.reduce(
  (n, c) => n + c.questions.length,
  0,
);

export const MAX_CHECKLIST_SCORE = TOTAL_CHECKLIST_QUESTIONS * 2;

type BandKey = "low" | "mid" | "high";

export function scoreBand(percent: number): BandKey {
  if (percent < 40) return "low";
  if (percent < 70) return "mid";
  return "high";
}

export function bandLabelRu(band: BandKey): string {
  switch (band) {
    case "low":
      return "Низкий уровень управляемости";
    case "mid":
      return "Средний уровень";
    case "high":
      return "Системный уровень управления";
    default:
      return "";
  }
}

export function overallNarrativeRu(band: BandKey): string {
  switch (band) {
    case "low":
      return "Система управления требует базовой структуризации. Есть критические пробелы в процессах и контроле.";
    case "mid":
      return "Управление ведётся, но остаются зоны нестабильности. Требуется усиление контроля, прозрачности и регулярности процессов.";
    case "high":
      return "Система управления находится на хорошем уровне. Следующий шаг — углубление аналитики, KPI и цифрового контроля.";
    default:
      return "";
  }
}

export function createInitialAnswers(): Record<
  string,
  (ChecklistAnswerValue | null)[]
> {
  return Object.fromEntries(
    CHECKLIST_CATEGORIES.map((c) => [
      c.id,
      c.questions.map(() => null as ChecklistAnswerValue | null),
    ]),
  );
}
