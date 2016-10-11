;(function () {
	'use strict';

	let _template = window.fest['folder/folder.tmpl'];

	class Folder {
		/**
		 * Конструктор папки.
		 * @param {Object} options - объект настроек.
		 */
		constructor (options) {
			this.elem = options.elem;
			this._data = options.data;

			this.render();
		}

		/**
		 * Отрисовка папки.
		 */
		render () {
			this.elem.innerHTML = _template(this._data);
		}
	}

	// Export
	window.Folder = Folder;

})();
