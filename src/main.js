import {Menu} from '../src/components/menu.js';
import {Search} from '../src/components/search.js';
import {Filter} from '../src/components/filters.js';
import {Task} from '../src/components/taskCard.js';
import {TaskEdit} from '../src/components/taskEdit.js';
import {LoadBtn} from '../src/components/loadBtn.js';
import {NoTasks} from '../src/components/noTasks.js';
import {getTask, getFilters} from './data.js';
import {render, Positions} from './utils.js';

// Функция вставки компонентов в контейнеры
const renderComponent = (container, component) => {
  container.innerHTML += component;
};

const renderFilter = (filtersArrayParam) => {
  const filter = new Filter(filtersArrayParam);
  render(mainContainer, filter.getElement(), Positions.BEFOREEND);
};

const renderTask = (tasksMocks) => {
  const task = new Task(tasksMocks);
  const taskEdit = new TaskEdit(tasksMocks);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksBoard.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    tasksBoard.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    tasksBoard.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tasksBoard, task.getElement(), Positions.BEFOREEND);
};

// const loadMoreTasks = () => {
//   let container = document.querySelector(`.board__tasks`);
//   let allTasks = document.querySelectorAll(`.card`);
//   container.innerHTML += new Array(8)
//   .fill(``)
//   .map(getTask)
//   .map(getTaskCardTemplate)
//   .join(``);
//   if (allTasks.length > 30) { // 30 карточек как случайное значение, после которого кнопка "Загрузить еще скрывается"
//     loadBtn.classList.add(`visually-hidden`);
//   }
// };

const TASK_COUNT = 8;

const tasksMock = new Array(TASK_COUNT).fill(``).map(getTask);
const filtersArray = new Array(1).fill(``).map(getFilters);
const menu = new Menu().getTemplate();
const loadBtn = new LoadBtn().getTemplate();
const search = new Search().getTemplate();
const noTasks = new NoTasks().getTemplate();

// Создание переменных с контейнерами

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const tasksContainer = document.createElement(`div`);
tasksContainer.classList.add(`board`, `container`);
const tasksContainerInner = document.createElement(`div`);
tasksContainerInner.classList.add(`board__tasks`);
tasksContainer.appendChild(tasksContainerInner);

// Отрисовка блоков

renderComponent(menuContainer, menu);
renderComponent(mainContainer, search);
filtersArray.forEach((filter) => renderFilter(filter));
if (!filtersArray[0][0].count) {
  renderComponent(mainContainer, noTasks);
}
mainContainer.appendChild(tasksContainer);
renderComponent(tasksContainer, loadBtn);
const tasksBoard = document.querySelector(`.board__tasks`);
tasksMock.forEach((taskMock) => renderTask(taskMock));


// Подрузка новых карточек

// const loadBtn = document.querySelector(`.load-more`);
// loadBtn.addEventListener(`click`, loadMoreTasks);

export {tasksMock};


