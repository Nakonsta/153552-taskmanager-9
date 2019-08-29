import {AbstractComponent} from './abstract-component.js';

class LoadBtn extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

export {LoadBtn};
