;(function () {
	'use strict';

	class List {
		/**
		 * Конструктор списка.
		 * @param {Object} options - объект настроек.
		 */
		constructor (options) {
			this._elem = options.elem;
			this._data = options.data;

			this._render();
			this._initEvents();
		}

		/**
		 * Отрисовка списка.
		 */
		_render () {
			this._elem.innerHTML = '';

			this._list = document.createElement('ul');
			this._list.className = 'list__list';
			this._elem.append(this._list);

			this._data.forEach( item => {
				this._renderItem(item.content);
			});
		}

		/**
		 * Отрисовка одного пункта списка.
		 * @param {String} content - содержание пункта.
		 */
		_renderItem (content) {
			let item = document.createElement('li');
			item.className = 'list__item';
			item.textContent = content;
			this._list.append(item);

			let del = document.createElement('i');
			del.className = 'list__delete';
			del.innerHTML = '🗙';
			item.append(del);
		}

		/**
		 * Инициализация событий.
		 */
		_initEvents () {
			this._list.addEventListener('click', this._deleteItem.bind(this));
		}

		/**
		 * Обработчик клика по иконке удаления пункта из списка.
		 * @param {Object} event - объект события клика.
		 */
		_deleteItem (event) {
			let target = event.target;

			let del = target.closest('i');
			if (!del || !this._list.contains(del)) return;

			let item = del.closest('li');
			if (!item || !this._list.contains(item)) return;

			item.remove();
		}

		/**
		 * Добавление пункта в список.
		 * @param {String} content - содержание пункта.
		 */
		addItem (content) {
			this._renderItem(content);
		}
	}

	// Export
	window.List = List;

})();