export type HomeImplementationPhase = {
  step: string;
  title: string;
  text: string;
};

export const homeImplementationPhases: ReadonlyArray<HomeImplementationPhase> =
  [
    {
      step: "01",
      title: "Диагностика",
      text: "Сбор фактуры по процессам, ролям и данным.",
    },
    {
      step: "02",
      title: "Проектирование",
      text: "Целевая модель управления и дорожная карта.",
    },
    {
      step: "03",
      title: "Настройка процессов",
      text: "Регламенты, контуры ответственности, цифровые точки контроля.",
    },
    {
      step: "04",
      title: "Обучение",
      text: "Вовлечение команд и закрепление практики.",
    },
    {
      step: "05",
      title: "Контроль результата",
      text: "KPI, ревизии и корректировка на основе данных.",
    },
  ];
