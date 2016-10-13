;(function () {
	'use strict';

	let _template = window.fest['list/list.tmpl'];

	class List {
		/**
		 * Конструктор списка.
		 * @param {Object} options - объект настроек.
		 */
		constructor ({elem}) {
			this.elem = elem;
			this._initEvents();
		}

		setData (data) {
			this._data = data;
		}

		/**
		 * Отрисовка списка.
		 */
		render () {
			this.elem.innerHTML = _template(this._data);
			this.list = this.elem.querySelector('.list__list');
		}

		/**
		 * Инициализация событий.
		 */
		_initEvents () {
			this.elem.addEventListener('click', this._deleteItem.bind(this));
		}

		/**
		 * Обработчик клика по иконке удаления пункта из списка.
		 * @param {Object} event - объект события клика.
		 */
		_deleteItem (event) {
			let target = event.target;

			let del = target.closest('i');
			if (!del || !this.elem.contains(del)) return;

			let item = del.closest('li');
			if (!item || !this.elem.contains(item)) return;

			item.remove();
		}

		/**
		 * Добавление пункта в список.
		 * @param {String} content - содержание пункта.
		 */
		addItem (content) {
			console.log(content);
			this._data.items.push(content);
			this.render();
		}
	}

	// Export
	window.List = List;

})();