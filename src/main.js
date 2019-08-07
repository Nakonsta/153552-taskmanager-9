(function(){
  
  // Функция вставки компонентов в контейнеры
  function renderComponent(container, component) {
    container.innerHTML += component();
  }

  // Создание переменных с контейнерами
    
  const menuContainer = document.querySelector('.main__control');
  const mainContainer = document.querySelector('.main');
  const tasksContainer = document.createElement('div');
  tasksContainer.classList.add('board', 'container');
  const tasksContainerInner = document.createElement('div');
  tasksContainerInner.classList.add('board__tasks');
  tasksContainer.appendChild(tasksContainerInner);

  //Отрисовка блоков

  renderComponent(menuContainer, templates.menu);
  renderComponent(mainContainer, templates.search);
  renderComponent(mainContainer, templates.filters);
  renderComponent(tasksContainerInner, templates.taskEdit);
  for (let i = 0; i < 3; i++) {
    renderComponent(tasksContainerInner, templates.taskCard);
  }
  mainContainer.appendChild(tasksContainer);
  renderComponent(tasksContainer, templates.loadBtn);
  
})();