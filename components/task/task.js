;(function () {
	'use strict';

	class Task {
		constructor (options) {
			this._elem = options.elem;
			this._data = options.data;

			this._render();
		}

		_render () {
			this._elem.innerHTML = '';

			let ul = document.createElement('ul');
			ul.className = 'task__list';
			this._elem.append(ul);

			this._data.forEach( item => {
				let li = document.createElement('li');
				li.className = 'task__item';
				li.innerHTML = item.anchor;
				ul.append(li);
			});
		}

	}


	// Export
	window.Task = Task;

})();