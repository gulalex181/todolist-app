;(function () {
	'use strict';

	let _template = window.fest['menu/menu.tmpl'];

	class Menu {
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

			if (target.matches('.js-menu__title')) {
				let folder = target.closest('.js-menu__folder');
				this._toggle(folder);
			}

			if (target.hasAttribute('data-list-index')) {
				let data = {
					listIndex: target.getAttribute('data-list-index'),
					folderIndex: target.closest('.js-menu__folder').getAttribute('data-folder-index') + '_'
				};

				this._trigger('itemClick', data);

				let activeItems = this.elem.querySelectorAll('.menu__item_active');
				for (let i = 0; i < activeItems.length; i += 1) {
					activeItems[i].classList.remove('menu__item_active');
				}

				target.classList.add('menu__item_active');
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
		 * @param {Object} folder - содержимое папки.
		 */
		_toggle (folder) {
			folder.classList.toggle('menu_open');
		}
	}

	// Export
	window.Menu = Menu;

})();
