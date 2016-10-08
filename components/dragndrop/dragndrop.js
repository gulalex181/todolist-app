;(function () {
	'use strict';

	class DragNDrop {
		constructor (options) {
			this._dragObject = {};

			this._container = options.container;
			this._dropFunction = options.dropFunction;

			this._initEvents();
		}

		_initEvents () {
			document.addEventListener('mousedown', this._onMouseDown.bind(this));
			document.addEventListener('mousemove', this._onMouseMove.bind(this));
			document.addEventListener('mouseup', this._onMouseUp.bind(this));
		}

		_onMouseDown (event) {
			// Проверка, что нажата левая кнопка мыши.
			if (event.which != 1) return;

			// Ищем ближайшей предка с возможностью перетаскивания.
			let element = event.target.closest('[data-draggable]');
			if (!element) return;

			// Записываем элемент и координаты клика в момент нажатия мыши.
			this._dragObject.element = element;
			this._dragObject.downX = event.pageX;
			this._dragObject.downY = event.pageY;
			this._dragObject.width = element.offsetWidth;
			this._dragObject.height = element.offsetHeight;

			// Убираем стандартное поведение (выделение).
			event.preventDefault();
		}

		_onMouseMove (event) {
			// Если элемент не зажат, то ничего не делаем.
			if (!this._dragObject.element) return;

			// Если перенос элемента еще не начат.
			if (!this._dragObject.avatar) {
				// Если это малые движения мыши, то не начинать перенос.
				let moveX = event.pageX - this._dragObject.downX,
					moveY = event.pageY - this._dragObject.downY;
				if (Math.abs(moveX) < 5 && Math.abs(moveY) < 5) {
					return;
				}

				// Начало переноса элемента.
				this._dragObject.avatar = this._createAvatar(event);

				let coords = this._getCoords(this._dragObject.avatar);
				// Записываем смещение мыши относительно левого верхнего угла.
				this._dragObject.shiftX = this._dragObject.downX - coords.left;
				this._dragObject.shiftY = this._dragObject.downY - coords.top;

				// Отображение начала переноса.
				this._startDrag(event);
			}

			// Отображение потенциального места вставки.
			this._renderPlace(event);

			// Отображение переноса.
			this._dragObject.avatar.style.left = event.pageX - this._dragObject.shiftX + 'px';
			this._dragObject.avatar.style.top = event.pageY - this._dragObject.shiftY + 'px';

			// Убираем стандартное поведение (перетаскивание).
			event.preventDefault()
		}

		_onMouseUp (event) {
			if (this._dragObject.avatar) {
				this._finishDrag(event);
			}

			this._dragObject = {};
		}

		_createAvatar (event) {
			let avatar = this._dragObject.element;
			// Записываем все первоначальные свойства элемента на случай отмены переноса.
			let original = {
				parent: avatar.parentNode,
				nextSibling: avatar.nextSibling,
				position: avatar.style.position || '',
				top: avatar.style.top || '',
				left: avatar.style.left || '',
				zIndex: avatar.style.zIndex || ''
			};

			avatar.toOriginal = function () {
				original.parent.insertBefore(avatar, original.nextSibling);
				avatar.style.position = original.position;
				avatar.style.top = original.top;
				avatar.style.left = original.left;
				avatar.style.zIndex = original.zIndex;
			}

			return avatar;
		}

		_startDrag (event) {
			// Добавляем элемент на страницу заново,
			// чтобы он точно был позиционирован абсолютно.
			this._dragObject.avatar.style.position = 'absolute';
			this._dragObject.avatar.style.zIndex = '9999';
			this._dragObject.avatar.style.width = this._dragObject.width + 'px';
			this._dragObject.avatar.style.height = this._dragObject.height + 'px';
			this._container.appendChild(this._dragObject.avatar);
		}

		_renderPlace (event) {
			if (!this._dragObject.template) {
				this._dragObject.template = document.createElement('li');
				this._dragObject.template.style.width = this._dragObject.width + 'px';
				this._dragObject.template.style.height = this._dragObject.height + 'px';
				this._dragObject.template.className = 'list__item_template';
				this._dragObject.template.textContent = 'Вставить сюда';
			}

			if (this._getCoords(this._container).bottom < event.pageY) {
				this._container.appendChild(this._dragObject.template);
				return;
			}

			this._dragObject.avatar.hidden = true;
			let item = document.elementFromPoint(event.clientX, event.clientY).closest('[data-draggable]');
			this._dragObject.avatar.hidden = false;

			if (!item) return;

			this._container.insertBefore(this._dragObject.template, item);
		}

		_finishDrag (event) {
			if (this._dragObject.template) {
				this._container.insertBefore(this._dragObject.avatar, this._dragObject.template);
				this._container.removeChild(this._dragObject.template);
			}
			this._dragObject.avatar.style.cssText = '';
		}

		_getCoords (elem) {
			let box = elem.getBoundingClientRect();

			let body = document.body;
			let docEl = document.documentElement;

			// IE9, * || IE8 || Quirks Mode
			let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
			let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

			// IE7-
			let clientTop = docEl.clientTop || body.clientTop || 0;
			let clientLeft = docEl.clientLeft || body.clientLeft || 0;

			let top = box.top + scrollTop - clientTop;
			let right = box.right + scrollLeft - clientLeft;
			let bottom = box.bottom + scrollTop - clientTop;
			let left = box.left + scrollLeft - clientLeft;

			return {
				top: top,
				right: right,
				bottom: bottom,
				left: left
			};
		}
	}

	// Export
	window.DragNDrop = DragNDrop;

})();