export type HomeJournalPost = {
  title: string;
  tag: string;
  date: string;
};

export const homeJournalPosts: ReadonlyArray<HomeJournalPost> = [
  {
    title: "Индекс эффективности: как читать цифры управления",
    tag: "Аналитика",
    date: "2026",
  },
  {
    title: "Подрядчики и границы ответственности УК",
    tag: "Практика",
    date: "2026",
  },
  {
    title: "Городской контур и данные по жилому фонду",
    tag: "Город",
    date: "2026",
  },
];

export const homeJournalUrl = "/journal";
