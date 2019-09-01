import {Board} from '../components/board.js';
import {TaskList} from '../components/taskList.js';
import {Task} from '../components/taskCard.js';
import {TaskEdit} from '../components/taskEdit.js';
import {Sort} from '../components/sort.js';
import {render, unrender, Positions} from '../utils.js';

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
  }

  init() {
    render(this._container, this._board.getElement(), Positions.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Positions.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Positions.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));

    this._sort.getElement().addEventListener(`click`, (evt) => {
      this._onSortClick(evt);
    });
  }

  _renderBoard(tasks) {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Positions.AFTERBEGIN);
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
      this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement().querySelector(`.card__save`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(taskEditComponent.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        })
      };

      this._tasks[this._tasks.findIndex((it) => it === task)] = entry;        
      this._renderBoard(this._tasks);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskList.getElement(), taskComponent.getElement(), Positions.BEFOREEND);
  }

  _onSortClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}

export {BoardController};
