import {getMenuTemplate} from '../src/components/menu.js';
import {getSearchTemplate} from '../src/components/search.js';
import {getFiltersTemplate} from '../src/components/filters.js';
import {Task} from '../src/components/taskCard.js';
import {TaskEdit} from '../src/components/taskEdit.js';
import {getLoadBtnTemplate} from '../src/components/loadBtn.js';
import {getTask, getFilters, tasks} from './data.js';
import {render, Positions} from './utils.js';

const templates = {
  menu: getMenuTemplate,
  search: getSearchTemplate,
  filters: getFiltersTemplate,
  loadBtn: getLoadBtnTemplate
};

// Функция вставки компонентов в контейнеры
const renderComponent = (container, component) => {
  container.innerHTML += component;
};

// Функция отрисовки карточек

const renderTask = (tasksMock) => {
  const task = new Task(tasksMock);
  const taskEdit = new TaskEdit(tasksMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainerInner.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement().addEventListener(`click`, () => console.log(te22st));

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    tasksContainerInner.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
    tasksContainerInner.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tasksContainerInner, task.getElement(), Positions.BEFOREEND);
};

const renderFilters = (container) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getFilters)
    .map(getFiltersTemplate)
    .join(``));
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

// Создание переменных с контейнерами

const TASK_COUNT = 8;

const tasksMock = new Array(TASK_COUNT).fill(``).map(getTask);

const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const tasksContainer = document.createElement(`div`);
tasksContainer.classList.add(`board`, `container`);
const tasksContainerInner = document.createElement(`div`);
tasksContainerInner.classList.add(`board__tasks`);
tasksContainer.appendChild(tasksContainerInner);

// Отрисовка блоков

renderComponent(menuContainer, templates.menu());
renderComponent(mainContainer, templates.search());
renderFilters(mainContainer);
tasksMock.forEach((taskMock) => renderTask(taskMock));
mainContainer.appendChild(tasksContainer);
renderComponent(tasksContainer, templates.loadBtn());

// Подрузка новых карточек

// const loadBtn = document.querySelector(`.load-more`);
// loadBtn.addEventListener(`click`, loadMoreTasks);

// document.addEventListener(`keydown`, onEscKeyDown);


