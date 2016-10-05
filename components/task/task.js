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

			this._list = document.createElement('ul');
			this._list.className = 'task__list';
			this._elem.append(this._list);

			this._data.forEach( item => {
				let li = document.createElement('li');
				li.className = 'task__item';
				li.textContent = item.anchor;
				this._list.append(li);
			});
		}

		addTask (task) {
			let li = document.createElement('li');
			li.className = 'task__item';
			li.textContent = task;

			this._list.append(li);
		}

	}


	// Export
	window.Task = Task;

})();