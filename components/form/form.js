;(function () {
	'use strict';

	class Form {
		constructor (options) {
			this._elem = options.elem;

			this._render();
			this._initEvents();
		}

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
			this._btn.innerHTML = '&#43;'
			form.append(this._btn);
		}

		_initEvents () {
			this._btn.addEventListener('click', this._btnOnClick.bind(this));
		}

		_btnOnClick (event) {
			event.preventDefault();
			this.trigger('formBtnClick');
		}

		getInputText () {
			return this._input.value;
		}

		setInputText () {
			return this._input.value = '';
		}

	}


	// Export
	window.Form = Form;

})();