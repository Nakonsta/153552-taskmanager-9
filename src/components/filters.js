import {AbstractComponent} from './abstract-component.js';

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
            <input
            type="radio"
            id="filter__all"
            class="filter__input visually-hidden"
            name="filter"
            checked
            />
            <label for="filter__all" class="filter__label">
            ${this._filters[0].title} <span class="filter__all-count">${this._filters[0].count}</span></label
            >
            <input
            type="radio"
            id="filter__overdue"
            class="filter__input visually-hidden"
            name="filter"
            disabled
            />
            <label for="filter__overdue" class="filter__label"
            >${this._filters[1].title} <span class="filter__overdue-count">${this._filters[1].count}</span></label
            >
            <input
            type="radio"
            id="filter__today"
            class="filter__input visually-hidden"
            name="filter"
            disabled
            />
            <label for="filter__today" class="filter__label"
            >${this._filters[2].title} <span class="filter__today-count">${this._filters[2].count}</span></label
            >
            <input
            type="radio"
            id="filter__favorites"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__favorites" class="filter__label"
            >${this._filters[3].title} <span class="filter__favorites-count">${this._filters[3].count}</span></label
            >
            <input
            type="radio"
            id="filter__repeating"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__repeating" class="filter__label"
            >${this._filters[4].title} <span class="filter__repeating-count">${this._filters[4].count}</span></label
            >
            <input
            type="radio"
            id="filter__tags"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__tags" class="filter__label"
            >${this._filters[5].title} <span class="filter__tags-count">${this._filters[5].count}</span></label
            >
            <input
            type="radio"
            id="filter__archive"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__archive" class="filter__label"
            >${this._filters[6].title} <span class="filter__archive-count">${this._filters[6].count}</span></label
            >
        </section>`;
  }
}

export {Filter};
