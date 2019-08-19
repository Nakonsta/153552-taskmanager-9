const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + Math.floor(Math.random() * 14 - 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': Boolean(Math.round(Math.random())),
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

const getFilters = () => ([
  {
    title: `All`,
    count: 12,
  },
  {
    title: `Overdue`,
    count: 0,
  },
  {
    title: `Today`,
    count: 0,
  },
  {
    title: `Favorites`,
    count: 1,
  },
  {
    title: `Repeating`,
    count: 1,
  },
  {
    title: `Tags`,
    count: 1,
  },
  {
    title: `Archive`,
    count: 115,
  }
]);

export {getTask};
export {getFilters};

