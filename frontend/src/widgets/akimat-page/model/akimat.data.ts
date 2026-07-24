import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  Eye,
  FileCheck2,
  MapPinned,
  Scale,
  Shield,
  Target,
} from "lucide-react";

export const akimatImages = {
  hero: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=85",
  control:
    "https://images.unsplash.com/photo-1577412647305-9911502f09b2?auto=format&fit=crop&w=1400&q=85",
  program:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
} as const;

export const akimatHero = {
  brand: "AKYL",
  audience: "Акимат",
  title: "Городской контур управления жилищным фондом",
  description:
    "Единая картина качества управления МЖД: индексы, риски, стандарты и контроль управляющих организаций — для решений на основе данных, а не отчётов на бумаге.",
  heroImageAlt: "Панорама города и жилой фонд",
  primaryCta: "Обсудить пилот",
  secondaryCta: "Методология МЖД",
} as const;

export const akimatDefinition = {
  eyebrow: "Роль акимата",
  title: "Акимат как регулятор и заказчик качества управления",
  text: "В модели AKYL акимат задаёт стандарты, видит состояние фонда по районам и домам, сравнивает управляющие организации и направляет ресурсы туда, где эффект для жителей максимален.",
  points: [
    "Регулирование и надзор без ручного сбора разрозненных отчётов",
    "Сопоставимые KPI по домам, УК и районам города",
    "Опора для программ модернизации и пилотных внедрений",
  ],
} as const;

export type AkimatChallenge = {
  title: string;
  text: string;
};

export const akimatChallengesSection = {
  eyebrow: "Исходная точка",
  title: "Типичные разрывы в городском управлении МЖД",
  description:
    "Без единой методологии акимат получает фрагменты картины: разные формы отчётности, несопоставимые УК и слабую связь между жалобами, финансами и качеством обслуживания.",
} as const;

export const akimatChallenges: AkimatChallenge[] = [
  {
    title: "Нет единой шкалы качества",
    text: "Дома и УК оцениваются по разным критериям — сложно ранжировать и приоритизировать вмешательство.",
  },
  {
    title: "Отчёты вместо прозрачности",
    text: "Бумажная отчётность не показывает динамику рисков, собираемости и исполнения заявок.",
  },
  {
    title: "Слабый контроль подрядного контура",
    text: "Системные нарушения и зоны риска выявляются поздно, когда проблема уже у жителей.",
  },
  {
    title: "Ресурсы без приоритизации",
    text: "Программы и поддержка распределяются без явной карты домов, где эффект будет наибольшим.",
  },
];

export type AkimatCapability = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const akimatCapabilitiesSection = {
  eyebrow: "Возможности",
  title: "Что получает акимат с AKYL",
  description:
    "Методологическая рамка и цифровые контуры для оценки, сравнения и управления качеством обслуживания жилого фонда города.",
} as const;

export const akimatCapabilities: AkimatCapability[] = [
  {
    icon: BarChart3,
    title: "Сводная аналитика",
    text: "Индексы эффективности, рейтинги домов и динамика по районам в одном контуре.",
  },
  {
    icon: Shield,
    title: "Контроль стандартов",
    text: "Единые KPI и регламенты для сопоставимости управляющих организаций.",
  },
  {
    icon: Building2,
    title: "Портфель домов",
    text: "Карта рисков, проблемных объектов и зон для целевых городских программ.",
  },
  {
    icon: Scale,
    title: "Справедливое сравнение УК",
    text: "Одинаковые метрики по финансам, сервису, эксплуатации и подрядчикам.",
  },
  {
    icon: Eye,
    title: "Надзор по данным",
    text: "Раннее выявление системных отклонений без ручного свода таблиц.",
  },
  {
    icon: MapPinned,
    title: "Территориальный фокус",
    text: "Приоритизация районов и домов для пилотов, аудитов и мер поддержки.",
  },
];

export const akimatControlSection = {
  eyebrow: "Надзор",
  title: "Контроль управляющих организаций",
  description:
    "Прозрачные метрики по финансам, эксплуатации, сервису и подрядчикам позволяют акимату видеть реальное качество работы УК — не только формальные отчёты.",
  imageAlt: "Аналитика и контроль управления жилым фондом",
} as const;

export const akimatControlBullets: string[] = [
  "Мониторинг собираемости и расходов по домам",
  "Сравнение УК внутри города и по районам",
  "Выявление системных нарушений и рисков",
  "Основание для мер поддержки или санкций",
];

export type AkimatStat = {
  label: string;
  value: number;
  suffix: string;
  note: string;
};

export const akimatAnalyticsSection = {
  eyebrow: "Аналитика",
  title: "Рейтинг домов и картина ЖКХ",
  description:
    "Рейтинговая модель AKYL ранжирует дома по зрелости управления и помогает направлять ресурсы туда, где эффект для города максимален.",
} as const;

export const akimatStats: AkimatStat[] = [
  {
    label: "Индекс IEU",
    value: 82,
    suffix: "",
    note: "Средний индекс по пилотному району",
  },
  {
    label: "Дома в зоне риска",
    value: 14,
    suffix: "%",
    note: "Требуют целевого вмешательства",
  },
  {
    label: "Прозрачность отчётности",
    value: 76,
    suffix: "%",
    note: "Дома с регулярной отчётностью для жителей",
  },
  {
    label: "Цифровизация",
    value: 68,
    suffix: "%",
    note: "Дома с диспетчеризацией и учётом заявок",
  },
];

export type AkimatProgramStep = {
  number: string;
  title: string;
  text: string;
  result: string;
};

export const akimatProgramSection = {
  eyebrow: "Городская программа",
  title: "Как запускается пилот в акимате",
  description:
    "Четыре этапа от диагностики фонда до устойчивого мониторинга — с измеримым результатом на каждом шаге.",
} as const;

export const akimatProgramSteps: AkimatProgramStep[] = [
  {
    number: "01",
    title: "Диагностика фонда",
    text: "Срез домов, УК, отчётности и зон риска по выбранному району или контуру.",
    result: "Карта зрелости и приоритетов",
  },
  {
    number: "02",
    title: "Единые метрики",
    text: "Согласование KPI, форм отчётности и шкалы индексов для сопоставимости.",
    result: "Стандарт оценки для города",
  },
  {
    number: "03",
    title: "Пилотный контур",
    text: "Запуск аналитики и контроля на ограниченном портфеле домов и УК.",
    result: "Рабочая панель решений",
  },
  {
    number: "04",
    title: "Масштабирование",
    text: "Расширение на районы, регламенты надзора и цикл регулярного мониторинга.",
    result: "Городская система контроля",
  },
];

export type AkimatOutcome = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const akimatOutcomesSection = {
  eyebrow: "Эффект",
  title: "Что меняется для города",
  description:
    "От разрозненных сигналов — к управляемой системе качества жилищного фонда.",
} as const;

export const akimatOutcomes: AkimatOutcome[] = [
  {
    icon: Target,
    title: "Целевое вмешательство",
    text: "Ресурсы и проверки идут в дома и УК с наибольшим риском и потенциалом улучшения.",
  },
  {
    icon: FileCheck2,
    title: "Прозрачная отчётность",
    text: "Единые формы для акимата, собраний и внутреннего аудита — без «разных таблиц».",
  },
  {
    icon: Building2,
    title: "Доверие жителей",
    text: "Видимое качество управления и понятные основания для решений власти.",
  },
];

export const akimatCta = {
  brand: "AKYL",
  title: "Запустите городскую программу профессионального управления МЖД",
  description:
    "Обсудим формат пилота, набор метрик и roadmap внедрения для вашего акимата.",
  primaryCta: "Получить консультацию",
  secondaryCta: "К методологии МЖД",
} as const;
