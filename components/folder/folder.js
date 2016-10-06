;(function () {
	'use strict';

	class Folder {
		/**
		 * Конструктор папки.
		 * @param {Object} options - объект настроек.
		 */
		constructor (options) {
			this._elem = options.elem;
			this._data = options.data;

			this._render();
		}

		/**
		 * Отрисовка папки.
		 */
		_render () {
			this._elem.innerHTML = '';

			this._list = document.createElement('ul');
			this._list.className = 'folder__list';
			this._elem.appendChild(this._list);

			this._data.forEach( item => {
				this._renderItem(item.content);
			});
		}

		/**
		 * Отрисовка одного пункта из папки.
		 * @param {String} content - содержание пункта.
		 */
		_renderItem (content) {
			let item = document.createElement('li');
			item.className = 'folder__item';
			item.innerHTML = content;
			this._list.appendChild(item);
		}
	}

	// Export
	window.Folder = Folder;

})();
