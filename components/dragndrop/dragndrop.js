;(function () {
	'use strict';


	// data-draggable
	class DragNDrop {
		constructor (options) {
			this._dragObject = {};

			this._container = options.container;
			this._placeHolderClass = options.placeHolderClass;
			this._placeHolderText = options.placeHolderText || 'Вставить сюда';

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

			// Ищем ближайшей предка внутри контейнера с возможностью перетаскивания.
			let element = event.target.closest('[data-draggable]');
			if (!element || !this._container.contains(element)) return;

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
				this._dragObject.avatar = this._dragObject.element;

				let coords = this._getCoords(this._dragObject.avatar);
				// Записываем смещение мыши относительно левого верхнего угла.
				this._dragObject.shiftX = this._dragObject.downX - coords.left;
				this._dragObject.shiftY = this._dragObject.downY - coords.top;

				// Отображение начала переноса.
				this._startDrag(event);
			}

			let left = event.pageX - this._dragObject.shiftX;
			let top = event.pageY - this._dragObject.shiftY;

			// Проверка на выход за пределы экрана по горизонтали.
			if (left < 0) left = 0;
			if (left + this._dragObject.width > document.documentElement.clientWidth) {
				left = document.documentElement.clientWidth - this._dragObject.width;
			}

			if (top < 0) top = 0;
			if (top + this._dragObject.height > document.documentElement.clientHeight) {
				top = document.documentElement.clientHeight - this._dragObject.height;
			}

			// Отображение переноса.
			this._dragObject.avatar.style.left = left + 'px';
			this._dragObject.avatar.style.top = top + 'px';

			// Отображение потенциального места вставки.
			this._renderPlaceHolder(event);

			// Убираем стандартное поведение (перетаскивание).
			event.preventDefault();
		}

		_startDrag () {
			// Добавляем элемент на страницу заново,
			// чтобы он точно был позиционирован абсолютно. И прописываем
			// исходные размеры
			this._dragObject.avatar.style.position = 'absolute';
			this._dragObject.avatar.style.zIndex = '9999';
			this._dragObject.avatar.style.width = this._dragObject.width + 'px';
			this._dragObject.avatar.style.height = this._dragObject.height + 'px';
			this._dragObject.avatar.style.margin = '0px';
			this._container.appendChild(this._dragObject.avatar);
		}

		_renderPlaceHolder (event) {
			if (!this._dragObject.placeHolder) {
				this._dragObject.placeHolder = document.createElement('li');
				this._dragObject.placeHolder.style.width = this._dragObject.width + 'px';
				this._dragObject.placeHolder.style.height = this._dragObject.height + 'px';
				this._dragObject.placeHolder.classList.add(this._placeHolderClass);
				this._dragObject.placeHolder.textContent = this._placeHolderText;
			}

			if (this._getCoords(this._container).bottom < event.pageY) {
				this._container.appendChild(this._dragObject.placeHolder);
				return;
			}

			this._dragObject.avatar.hidden = true;
			let elem = document.elementFromPoint(event.clientX, event.clientY);
			this._dragObject.avatar.hidden = false;
			if (!elem) return;
			let item = elem.closest('[data-draggable]');

			if (!item) return;

			this._container.insertBefore(this._dragObject.placeHolder, item);
		}

		_onMouseUp (event) {
			if (this._dragObject.avatar) {
				this._finishDrag(event);
			}

			this._dragObject = {};
		}

		_finishDrag () {
			if (this._dragObject.placeHolder) {
				this._container.insertBefore(this._dragObject.avatar, this._dragObject.placeHolder);
				this._container.removeChild(this._dragObject.placeHolder);
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