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
		 * Обработчик клика по кнопке формы.
		 * @param {Object} event - объект события клика.
		 */
		_btnOnClick (event) {
			let target = event.target;

			let btn = target.closest('button');
			if (!btn || !this.elem.contains(btn)) return;

			event.preventDefault();

			// Включение события клика по кнопке формы в шине событий.
			this.trigger('formBtnClick');
		}

		/**
		 * Возвращает введенный в поле ввода формы текст.
		 * @returs {String} - введенный текст.
		 */
		getInputText () {
			return this._input.value;
		}

		/**
		 * Изменяет текст в поле ввода формы.
		 * @param {Object} text - нужный текст.
		 */
		setInputText (text) {
			this._input.value = text;
		}
	}

	// Export
	window.Form = Form;

})();