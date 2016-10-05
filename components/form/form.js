;(function () {
	'use strict';

	class Form {
		constructor (options) {
			this._elem = options.elem;

			this._render();
		}

		_render () {
			this._elem.innerHTML = '';

			let form = document.createElement('form');
			form.className = 'form__form';
			this._elem.append(form);

			let input = document.createElement('input');
			input.className = 'form__input';
			form.append(input);

			let button = document.createElement('button');
			button.className = 'form__button';
			button.innerHTML = '&#43;'
			form.append(button);
		}

	}


	// Export
	window.Form = Form;

})();