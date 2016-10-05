;(function () {
	'use strict';

	class Task {
		constructor (options) {
			this._elem = options.elem;
			this._data = options.data;

			this._render();
			this._initEvents();
		}

		_render () {
			this._elem.innerHTML = '';

			this._list = document.createElement('ul');
			this._list.className = 'task__list';
			this._elem.append(this._list);

			this._data.forEach( item => {
				this._renderItem(item.anchor);
			});
		}

		_renderItem (text) {
			let li = document.createElement('li');
			li.className = 'task__item';
			li.textContent = text;
			this._list.append(li);

			let i = document.createElement('i');
			i.className = 'task__delete';
			i.innerHTML = '&#128473;';
			li.append(i);
		}

		_initEvents () {
			this._list.addEventListener('click', this._deleteTask.bind(this));
		}

		_deleteTask (event) {
			let target = event.target;
			let i = target.closest('i');
			if (!i || !this._list.contains(i)) return;

			let li = i.closest('li');
			if (!li || !this._list.contains(li)) return;

			li.remove();
		}

		addTask (task) {
			this._renderItem(task);
		}
	}


	// Export
	window.Task = Task;

})();