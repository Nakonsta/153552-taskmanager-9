import {tasksMock} from './main.js';

const chooseTags = () => {
  let allHashtags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `lecture`, `chat`];
  let resultHashtags = new Set();
  for (let h of allHashtags) {
    if (Math.random() > 0.5) {
      resultHashtags.add(h);
    }
    if (resultHashtags.size === 3) {
      break;
    }
  }
  return resultHashtags;
};

let filterOverdue = (task) => task.dueDate < Date.now();
let filterToday = (task) => new Date(task.dueDate).toDateString() === new Date().toDateString();
let filterFavorites = (task) => task.isFavorite === true;
let filterRepeating = (task) => (Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])) == true;
let filterTags = (task) => task.tags.size > 0;
let filterArchive = (task) => task.isArchive === true;

let countMatch = (filter, tasks) => {
  if (filter === `All`) {
    return tasks.length - tasks.filter(filterArchive).length;
  }
  if (filter === `Overdue`) {
    return tasks.filter(filterOverdue).length;
  }
  if (filter === `Today`) {
    return tasks.filter(filterToday).length;
  }
  if (filter === `Favorites`) {
    return tasks.filter(filterFavorites).length;
  }
  if (filter === `Repeating`) {
    return tasks.filter(filterRepeating).length;
  }
  if (filter === `Tags`) {
    return tasks.filter(filterTags).length;
  }
  if (filter === `Archive`) {
    return tasks.filter(filterArchive).length;
  }
};

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
  tags: chooseTags(),
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

const tasks = new Array(7).fill(``).map(getTask);

const getFilters = () => ([
  {
    title: `All`,
    count: countMatch(`All`, tasksMock),
  },
  {
    title: `Overdue`,
    count: countMatch(`Overdue`, tasksMock),
  },
  {
    title: `Today`,
    count: countMatch(`Today`, tasksMock),
  },
  {
    title: `Favorites`,
    count: countMatch(`Favorites`, tasksMock),
  },
  {
    title: `Repeating`,
    count: countMatch(`Repeating`, tasksMock),
  },
  {
    title: `Tags`,
    count: countMatch(`Tags`, tasksMock),
  },
  {
    title: `Archive`,
    count: countMatch(`Archive`, tasksMock),
  }
]);

export {getTask, getFilters, tasks};


