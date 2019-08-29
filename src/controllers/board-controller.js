import {Board} from '../components/board.js';
import {TaskList} from '../components/taskList.js';
import {Task} from '../components/taskCard.js';
import {TaskEdit} from '../components/taskEdit.js';
import {render, Positions} from '../utils.js';

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
  }

  init() {
    render(this._container, this._board.getElement(), Positions.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Positions.BEFOREEND);
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._taskList.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`.card__save`).addEventListener(`click`, () => {
      this._taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskList.getElement(), taskComponent.getElement(), Positions.BEFOREEND);
  }
}

export {BoardController};
