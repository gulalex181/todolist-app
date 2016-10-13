;(function () {
	'use strict';

	let _template = window.fest['form/form.tmpl']

	class Form {
		/**
		 * Конструктор формы.
		 * @param {Object} options - объект настроек.
		 */
		constructor (options) {
			this.elem = options.elem;
			this._data = options.data;

			this.render();
			this._initEvents();
		}

		/**
		 * Отрисовка формы.
		 */
		render () {
			this.elem.innerHTML = _template(this._data);
		}

		/**
		 * Инициализация событий.
		 */
		_initEvents () {
			this.elem.addEventListener('click', this._btnOnClick.bind(this));
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
		trigger (event, data) {
			let newEvent = new CustomEvent(event, {
				bubbles: true,
				cancelable: true,
				detail: data
			})

			this.elem.dispatchEvent(newEvent);
		}

		/**
		 * Обработчик клика по кнопке формы.
		 * @param {Object} event - объект события клика.
		 */
		_btnOnClick (event) {
			event.preventDefault();

			let target = event.target;

			let btn = target.closest('button');
			if (!btn || !this.elem.contains(btn)) return;

			// Запуск события клика по кнопке формы.
			let inputText = this.getInputText();
			if (tinputText !== '') {
				this.trigger('formBtnClick', {
					content: inputText
				});
			}

			// Сброс поля ввода формы.
			this.elem.querySelector('input').value = '';
		}

		/**
		 * Возвращает введенный в поле ввода формы текст.
		 * @returs {String} - введенный текст.
		 */
		getInputText () {
			return this.elem.querySelector('input').value.trim();
		}
	}

	// Export
	window.Form = Form;

})();