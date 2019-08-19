import {getMenuTemplate} from '../src/components/menu.js';
import {getSearchTemplate} from '../src/components/search.js';
import {getFiltersTemplate} from '../src/components/filters.js';
import {getTaskCardTemplate} from '../src/components/taskCard.js';
import {getTaskEditTemplate} from '../src/components/taskEdit.js';
import {getLoadBtnTemplate} from '../src/components/loadBtn.js';
import {getTask, getFilters} from '../src/data.js';


const templates = {
  menu: getMenuTemplate,
  search: getSearchTemplate,
  filters: getFiltersTemplate,
  taskEdit: getTaskEditTemplate,
  taskCard: getTaskCardTemplate,
  loadBtn: getLoadBtnTemplate
};

// Функция вставки компонентов в контейнеры
const renderComponent = (container, component) => {
  container.innerHTML += component();
};

// Функция вставки карточек

const renderTasks = (container, count) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(getTask)
    .map(getTaskCardTemplate)
    .join(``));
};

const renderFilters = (container) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getFilters)
    .map(getFiltersTemplate)
    .join(``));
};

const loadMoreTasks = () => {
  let container = document.querySelector(`.board__tasks`);
  let allTasks = document.querySelectorAll(`.card`);  
  container.innerHTML += new Array(8)
  .fill(``)
  .map(getTask)
  .map(getTaskCardTemplate)
  .join(``);
  if (allTasks.length > 30) { // 30 карточек как случайное значение, после которого кнопка "Загрузить еще скрывается"
    loadBtn.classList.add(`visually-hidden`);
  }
};

// Создание переменных с контейнерами

const TASK_COUNT = 7;
const menuContainer = document.querySelector(`.main__control`);
const mainContainer = document.querySelector(`.main`);
const tasksContainer = document.createElement(`div`);
tasksContainer.classList.add(`board`, `container`);
const tasksContainerInner = document.createElement(`div`);
tasksContainerInner.classList.add(`board__tasks`);
tasksContainer.appendChild(tasksContainerInner);

// Отрисовка блоков

renderComponent(menuContainer, templates.menu);
renderComponent(mainContainer, templates.search);
renderFilters(mainContainer);
renderComponent(tasksContainerInner, templates.taskEdit);
renderTasks(tasksContainerInner, TASK_COUNT);
mainContainer.appendChild(tasksContainer);
renderComponent(tasksContainer, templates.loadBtn);

// Обрезка массива тегов до трех элементов
// Не разобралась, как вставить ее в темплейт

// const chooseTags = (array) => {
//   let shortArray = [];
//   shortArray.push(array[0]);
//   shortArray.push(array[1]);
//   shortArray.push(array[2]);
//   return shortArray;
// };

// Подрузка новых карточек

const loadBtn = document.querySelector(`.load-more`);
loadBtn.addEventListener(`click`, loadMoreTasks);

