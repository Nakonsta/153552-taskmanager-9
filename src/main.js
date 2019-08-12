import {returnMenu} from '../src/components/menu.js';
import {returnSearch} from '../src/components/search.js';
import {returnFilters} from '../src/components/filters.js';
import {returnTaskCard} from '../src/components/taskCard.js';
import {returnTaskEdit} from '../src/components/taskEdit.js';
import {returnLoadBtn} from '../src/components/loadBtn.js';


const templates = {
  menu: returnMenu,
  search: returnSearch,
  filters: returnFilters,
  taskEdit: returnTaskEdit,
  taskCard: returnTaskCard,
  loadBtn: returnLoadBtn
};

// Функция вставки компонентов в контейнеры
const renderComponent = (container, component) => {
  container.innerHTML += component();
};

// Создание переменных с контейнерами

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
renderComponent(mainContainer, templates.filters);
renderComponent(tasksContainerInner, templates.taskEdit);
for (let i = 0; i < 3; i++) {
  renderComponent(tasksContainerInner, templates.taskCard);
}
mainContainer.appendChild(tasksContainer);
renderComponent(tasksContainer, templates.loadBtn);
