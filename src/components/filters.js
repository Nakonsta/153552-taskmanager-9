const getFiltersTemplate = (getFilters) => {
  return `<section class="main__filter filter container">
            <input
            type="radio"
            id="filter__all"
            class="filter__input visually-hidden"
            name="filter"
            checked
            />
            <label for="filter__all" class="filter__label">
            ${getFilters[0].title} <span class="filter__all-count">${getFilters[0].count}</span></label
            >
            <input
            type="radio"
            id="filter__overdue"
            class="filter__input visually-hidden"
            name="filter"
            disabled
            />
            <label for="filter__overdue" class="filter__label"
            >${getFilters[1].title} <span class="filter__overdue-count">${getFilters[1].count}</span></label
            >
            <input
            type="radio"
            id="filter__today"
            class="filter__input visually-hidden"
            name="filter"
            disabled
            />
            <label for="filter__today" class="filter__label"
            >${getFilters[2].title} <span class="filter__today-count">${getFilters[2].count}</span></label
            >
            <input
            type="radio"
            id="filter__favorites"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__favorites" class="filter__label"
            >${getFilters[3].title} <span class="filter__favorites-count">${getFilters[3].count}</span></label
            >
            <input
            type="radio"
            id="filter__repeating"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__repeating" class="filter__label"
            >${getFilters[4].title} <span class="filter__repeating-count">${getFilters[4].count}</span></label
            >
            <input
            type="radio"
            id="filter__tags"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__tags" class="filter__label"
            >${getFilters[5].title} <span class="filter__tags-count">${getFilters[5].count}</span></label
            >
            <input
            type="radio"
            id="filter__archive"
            class="filter__input visually-hidden"
            name="filter"
            />
            <label for="filter__archive" class="filter__label"
            >${getFilters[6].title} <span class="filter__archive-count">${getFilters[6].count}</span></label
            >
        </section>`;
};
export {getFiltersTemplate};
