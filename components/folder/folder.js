;(function () {
	'use strict';

	let _template = window.fest['folder/folder.tmpl'];

	class Folder {
		/**
		 * Конструктор папки.
		 * @param {Object} options - объект настроек.
		 */
		constructor ({elem}) {
			this.elem = elem;
			this._initEvents();
		}

		/**
		 * Инициализация событий.
		 */
		_initEvents () {
			this.elem.addEventListener('click', this._onFolderClick.bind(this));
			this.elem.addEventListener('mousedown', function (event) {
				event.preventDefault();
			});
		}

		/**
		 * Привязка обработчика события.
		 * @param {String} event - имя события
		 * @param {Function} callback - обработчик события
		 */
		on (event, callback) {
			this.elem.addEventListener(event, callback);
		}

		/**
		 * Запуск события.
		 * @param {String} event - имя события
		 * @param {Object} data - данные, которые нужно передать в обработчик
		 */
		_trigger (event, data) {
			let newEvent = new CustomEvent(event, {
				bubbles: true,
				cancelable: true,
				detail: data
			})

			this.elem.dispatchEvent(newEvent);
		}

		/**
		 * Обработчик клика по папке.
		 * @param {Object} event - объект события.
		 */
		_onFolderClick (event) {
			let target = event.target;

			if (target.matches('.js-folder__title')) {
				let list = this.elem.querySelector('.js-folder__list');
				this._toggle(list);
			}

			if (target.hasAttribute('data-index')) {
				let data = {
					index: target.dataset.index
				};

				this._trigger('itemClick', data);
			}
		}

		/**
		 * Отрисовка папки.
		 */
		render () {
			this.elem.innerHTML = _template(this._data);
		}

		/**
		 * Установка содержимого папки.
		 * @param {Object} data - содержание папки.
		 */
		setData (data) {
			this._data = data;
		}

		/**
		 * Прячет/показывает содержимое папки.
		 * @param {Object} list - содержимое папки.
		 */
		_toggle (list) {
			this.elem.classList.toggle('folder_open');
		}
	}

	// Export
	window.Folder = Folder;

})();
