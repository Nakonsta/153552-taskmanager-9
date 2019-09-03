import {Board} from '../components/board.js';
import {TaskList} from '../components/taskList.js';
import {Task} from '../components/taskCard.js';
import {TaskEdit} from '../components/taskEdit.js';
import {Sort} from '../components/sort.js';
import {LoadBtn} from '../components/loadBtn.js';
import {render, unrender, Positions} from '../utils.js';
import {TaskController} from './task-controller.js';

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadBtn = new LoadBtn();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Positions.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Positions.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Positions.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));

    this._sort.getElement().addEventListener(`click`, (evt) => {
      this._onSortClick(evt);
    });

    render(this._board.getElement(), this._loadBtn.getElement(), Positions.BEFOREEND);

  }

  _renderBoard() {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    unrender(this._loadBtn.getElement());
    this._loadBtn.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Positions.BEFOREEND);
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    render(this._board.getElement(), this._loadBtn.getElement(), Positions.BEFOREEND);
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tasks);
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
