import {Menu} from '../src/components/menu.js';
import {Search} from '../src/components/search.js';
import {Filter} from '../src/components/filters.js';
import {LoadBtn} from '../src/components/loadBtn.js';
import {NoTasks} from '../src/components/noTasks.js';
import {getTask, getFilters} from './data.js';
import {render, Positions} from './utils.js';
import {BoardController} from '../src/controllers/board-controller.js';

const renderFilter = (filtersArrayParam) => {
  const filter = new Filter(filtersArrayParam);
  render(mainContainer, filter.getElement(), Positions.BEFOREEND);
};

const TASK_COUNT = 50;
const TASKS_STEP = 8;

const tasksMock = new Array(TASK_COUNT).fill(``).map(getTask);
const taskInProcess = [];
const taskInProcessInitial = [];
for (let i = 0; i < tasksMock.length; i++) {
  if (!tasksMock[i].isArchive) {
    taskInProcess.push(tasksMock[i]);
  }
}
if (taskInProcess.length > TASKS_STEP) {
  for (let i = 0; i < TASKS_STEP; i++) {
    taskInProcessInitial.push(taskInProcess[i]);
  }
}
const filtersArray = new Array(1).fill(``).map(getFilters);

// Создание переменных с контейнерами и отрисовка в них блоков

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
render(menuContainer, new Menu().getElement(), Positions.BEFOREEND);
render(mainContainer, new Search().getElement(), Positions.BEFOREEND);
filtersArray.forEach((filter) => renderFilter(filter));
if (!filtersArray[0][0].count) {
  render(mainContainer, new NoTasks().getElement(), Positions.BEFOREEND);
}
const boardController = new BoardController(mainContainer, taskInProcessInitial);
boardController.init();
const boardContainer = document.querySelector(`.board`);
if (taskInProcess.length > 8) {
  render(boardContainer, new LoadBtn().getElement(), Positions.BEFOREEND);
}

// Подрузка новых карточек

const loadBtn = document.querySelector(`.load-more`);
let startTaskIndex = TASKS_STEP;

const loadMoreTasks = () => {

  for (let i = startTaskIndex; i < startTaskIndex + 8; i++) {
    if (taskInProcess[i]) {
      boardController._renderTask(taskInProcess[i]);
    } else {
      loadBtn.remove();
    }
  }

  startTaskIndex += 8;
};

loadBtn.addEventListener(`click`, loadMoreTasks);

export {tasksMock};


