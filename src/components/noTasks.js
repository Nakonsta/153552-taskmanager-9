import {AbstractComponent} from './abstract-component.js';

class NoTasks extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<p class="board__no-tasks">
        Congratulations, all tasks were completed! To create a new click on
        «add new task» button.
    </p>`;
  }
}

export {NoTasks};
