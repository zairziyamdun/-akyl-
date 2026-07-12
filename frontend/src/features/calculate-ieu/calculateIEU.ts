import type { IEUBlockResult, IEUInput, IEUResult } from "@/types/ieu";

const clamp = (value: number, min = 0, max = 100): number => {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
};

// Прямой показатель: чем больше, тем лучше
const normalizeDirectPercent = (value: number): number => clamp(value) / 100;

// Обратный показатель: чем меньше, тем лучше
const normalizeInversePercent = (value: number): number =>
  1 - clamp(value) / 100;

// Балльный показатель, например 4.2 из 5
const normalizeScore = (value: number, maxScore: number): number => {
  const safe = Math.min(maxScore, Math.max(0, value));
  return safe / maxScore;
};

const average = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, item) => sum + item, 0) / values.length;
};

const round2 = (value: number): number => Math.round(value * 100) / 100;

const getLevel = (total: number): string => {
  const p = total * 100;
  if (p <= 20) return "Критическое управление";
  if (p <= 40) return "Кризисное управление";
  if (p <= 60) return "Слабое управление";
  if (p <= 80) return "Устойчивое управление";
  return "Профессиональное управление";
};

/** Диапазон 0–100 % */
export function getIEUBand(totalPercent: number): {
  label: string;
  range: string;
  interpretation: string;
} {
  if (totalPercent >= 81) {
    return {
      label: "Профессиональное управление",
      range: "81–100%",
      interpretation:
        "Высокая зрелость процессов и контроля. Фокус — удержание уровня, точечные улучшения и развитие аналитики.",
    };
  }
  if (totalPercent >= 61) {
    return {
      label: "Устойчивое управление",
      range: "61–80%",
      interpretation:
        "База в порядке, но есть зоны роста. Приоритизируйте слабые блоки, чтобы выйти на профессиональный уровень.",
    };
  }
  if (totalPercent >= 41) {
    return {
      label: "Слабое управление",
      range: "41–60%",
      interpretation:
        "Системные пробелы в дисциплине и контроле. Нужны регламенты, прозрачность и регулярный разбор показателей.",
    };
  }
  if (totalPercent >= 21) {
    return {
      label: "Кризисное управление",
      range: "21–40%",
      interpretation:
        "Высокие риски для дома и репутации. Требуется аудит, план стабилизации и усиление финансовой и операционной дисциплины.",
    };
  }
  return {
    label: "Критическое управление",
    range: "0–20%",
    interpretation:
      "Критическая зона: решения нужны срочно — безопасность, финансы, документы и управляемость под угрозой.",
  };
}

export function getBlockDetailedRecommendations(
  key: IEUBlockResult["key"],
): string[] {
  switch (key) {
    case "K1":
      return [
        "Сверьте календарь ППР с фактом: закройте хвосты и зафиксируйте ответственных за просрочки.",
        "Проведите обход инженерных систем с чек-листом и планом устранения выявленных рисков.",
        "Подготовьте дом к сезону заранее: отопление, кровля, дренаж, подготовка к ливням и морозам.",
        "Введите учёт открытых дефектов со сроками и эскалацией, если срок срывается.",
      ];
    case "K2":
      return [
        "Настройте понятный график платежей и напоминания; разберите причины неплатежей по сегментам.",
        "Введите ежемесячный план-факт по статьям и лимиты отклонений, согласованные с советом.",
        "Ужесточите работу с дебиторкой: договорённости, претензионный блок, контроль лимитов задолженности.",
        "Синхронизируйте бюджет с реальным паспортом работ и резервом на непредвиденное.",
      ];
    case "K3":
      return [
        "Пересмотрите SLA по заявкам и загрузку линии; измеряйте долю заявок, закрытых в норматив.",
        "Соберите обратную связь жителей (опрос/NPS) и разберите типовые жалобы.",
        "Найдите причины повторных обращений: одни и те же узлы, подрядчики, коммуникации.",
        "Зафиксируйте стандарты ответа и эскалации, чтобы снизить «потерянные» обращения.",
      ];
    case "K4":
      return [
        "Утвердите регламент отчётности для собственников и соблюдайте сроки публикации.",
        "Расширьте каналы участия: опросы, очные/онлайн форматы, понятные повестки собраний.",
        "Сделайте расходы читаемыми: краткие пояснения к крупным статьям и доступ к детализации.",
        "Контролируйте время первого ответа и полноту ответов на обращения.",
      ];
    case "K5":
      return [
        "Соберите обязательный комплект документов по дому и закройте пробелы в реестре.",
        "Введите календарь актов и протоколов; не допускайте «задним числом» без крайней необходимости.",
        "Проведите правовую/процедурную проверку ключевых решений и договоров.",
        "Назначьте ответственных за актуальность документов и версионность.",
      ];
    case "K6":
      return [
        "Обновите аварийные регламенты и проведите учения/проверку готовности.",
        "Измеряйте время реагирования на инциденты и устраняйте системные задержки.",
        "Закройте замечания по пожарной безопасности и контролируйте исполнение графика.",
        "Фиксируйте инциденты, разборы и меры, чтобы снижать повторяемость.",
      ];
    case "K7":
      return [
        "Внедрите или доведите до массового использования электронные заявки и статусы для жителей.",
        "Оцифруйте архив критичных документов с резервированием и правами доступа.",
        "Соберите единый дашборд для совета и УК: платежи, заявки, инциденты, подрядчики.",
        "Используйте отчёты и срезы данных на совещаниях, а не только «на бумаге».",
      ];
    default:
      return [];
  }
}

const getBlockRecommendation = (block: IEUBlockResult): string[] =>
  getBlockDetailedRecommendations(block.key);

export function calculateIEU(input: IEUInput): IEUResult {
  // K1 — Техническая эксплуатация
  const K1 = average([
    normalizeDirectPercent(input.maintenanceCompletion),
    normalizeDirectPercent(input.engineeringSystemsHealth),
    normalizeDirectPercent(input.seasonalPreparation),
    normalizeInversePercent(input.overdueDefects),
  ]);

  // K2 — Финансы
  const K2 = average([
    normalizeDirectPercent(input.collectionRate),
    normalizeInversePercent(input.budgetDeviation),
    normalizeInversePercent(input.receivablesOverdue),
  ]);

  // K3 — Сервис
  const K3 = average([
    normalizeDirectPercent(input.slaCompliance),
    normalizeScore(input.residentServiceRating, 5),
    normalizeInversePercent(input.repeatRequests),
  ]);

  // K4 — Коммуникации
  const K4 = average([
    normalizeDirectPercent(input.reportingRegularity),
    normalizeDirectPercent(input.residentParticipation),
    normalizeDirectPercent(input.expenseTransparency),
    normalizeDirectPercent(input.responseTimeliness),
  ]);

  // K5 — Документы
  const K5 = average([
    normalizeDirectPercent(input.documentCompleteness),
    normalizeDirectPercent(input.actsTimeliness),
    normalizeDirectPercent(input.complianceWithoutViolations),
  ]);

  // K6 — Безопасность
  const K6 = average([
    normalizeDirectPercent(input.emergencyRegulations),
    normalizeDirectPercent(input.emergencyResponseNorm),
    normalizeDirectPercent(input.fireSafetyMeasures),
    normalizeDirectPercent(input.noSevereIncidents),
  ]);

  // K7 — Цифровизация
  const K7 = average([
    normalizeDirectPercent(input.electronicRequests),
    normalizeDirectPercent(input.digitalArchive),
    normalizeDirectPercent(input.dashboardAvailability),
    normalizeDirectPercent(input.analyticsUsage),
  ]);

  const blockDefs = [
    {
      key: "K1" as const,
      name: "Техническая эксплуатация",
      value: K1,
      weight: 0.2,
    },
    { key: "K2" as const, name: "Финансы", value: K2, weight: 0.15 },
    { key: "K3" as const, name: "Сервис", value: K3, weight: 0.15 },
    { key: "K4" as const, name: "Коммуникации", value: K4, weight: 0.15 },
    { key: "K5" as const, name: "Документы", value: K5, weight: 0.1 },
    { key: "K6" as const, name: "Безопасность", value: K6, weight: 0.15 },
    { key: "K7" as const, name: "Цифровизация", value: K7, weight: 0.1 },
  ];

  const blocks: IEUBlockResult[] = blockDefs.map((block) => ({
    key: block.key,
    name: block.name,
    value: round2(block.value),
    weightedValue: round2(block.value * block.weight),
    scorePercent: round2(block.value * 100),
  }));

  const totalRaw = blockDefs.reduce(
    (sum, block) => sum + block.value * block.weight,
    0,
  );

  const total = round2(totalRaw);
  const totalPercent = round2(total * 100);
  const level = getLevel(total);

  const sortedByWeakness = [...blocks].sort((a, b) => a.value - b.value);
  const sortedByStrength = [...blocks].sort((a, b) => b.value - a.value);

  const weakestBlocks = sortedByWeakness.slice(0, 3);
  const strongestBlocks = sortedByStrength.slice(0, 3);

  const recommendations: string[] = [];
  weakestBlocks.forEach((block) => {
    recommendations.push(...getBlockRecommendation(block));
  });

  if (totalPercent >= 81) {
    recommendations.unshift(
      "Система находится на высоком уровне. Основной фокус — удержание качества, точечное улучшение слабых блоков и развитие аналитики.",
    );
  } else if (totalPercent >= 61) {
    recommendations.unshift(
      "Управление устойчивое, но ещё не полностью зрелое. Главная задача — подтянуть слабые блоки, чтобы перейти к профессиональному уровню.",
    );
  } else if (totalPercent >= 41) {
    recommendations.unshift(
      "Управление слабое. Нужны системные меры: стандартизация процессов, контроль, финансовая дисциплина и регулярная отчетность.",
    );
  } else if (totalPercent >= 21) {
    recommendations.unshift(
      "Система в кризисной зоне. Нужен управленческий аудит, переработка процессов, усиление безопасности и финансового контроля.",
    );
  } else {
    recommendations.unshift(
      "Критическое состояние управления: требуются срочные меры по безопасности, финансам и базовой управляемости дома.",
    );
  }

  return {
    total,
    totalPercent,
    level,
    blocks,
    weakestBlocks,
    strongestBlocks,
    recommendations,
  };
}
