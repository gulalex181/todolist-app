;(function () {
	'use strict';

	class Form {
		/**
		 * Конструктор формы.
		 * @param {Object} options - объект настроек.
		 */
		constructor (options) {
			this._elem = options.elem;

			this._render();
			this._initEvents();
		}

		/**
		 * Отрисовка формы.
		 */
		_render () {
			this._elem.innerHTML = '';

			let form = document.createElement('form');
			form.className = 'form__form';
			this._elem.append(form);

			this._input = document.createElement('input');
			this._input.className = 'form__input';
			form.append(this._input);

			this._btn = document.createElement('button');
			this._btn.className = 'form__button';
			this._btn.innerHTML = '+';
			form.append(this._btn);
		}

		/**
		 * Инициализация событий.
		 */
		_initEvents () {
			this._btn.addEventListener('click', this._btnOnClick.bind(this));
		}

		/**
		 * Обработчик клика по кнопке формы.
		 * @param {Object} event - объект события клика.
		 */
		_btnOnClick (event) {
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