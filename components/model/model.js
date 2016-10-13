;(function () {
	'use strict';

	class Model {
		constructor ({resourse, data = {}}) {
			this._resourse = resourse;
			this._handlers = {};

			this.setData(data);
		}

		setData (data) {
			this._data = data;
			this._trigger('update', this._data);
		}

		getData () {
			return this._data;
		}

		fetch (folder = '', list = '') {
			// Тут я сделал под разные файлы,
			// т.к. сервера у меня нет, который мог бы генерировать один файл по GET-параметрам.
			let resourse = this._resourse.slice(0, -5) + folder + list + this._resourse.slice(-5);
			this._makeRequest('GET', resourse);
		}

		on (name, callback) {
			if (!this._handlers[name]) {
				this._handlers[name] = [];
			}

			this._handlers[name].push(callback);
		}

		_trigger (name, data) {
			if (this._handlers[name]) {
				this._handlers[name].forEach(callback => callback(data));
			}
		}

		_makeRequest (method, resourse) {
			// Создаем объект запроса.
			let xhr = new XMLHttpRequest();

			// Конфигурируем запрос.
			xhr.open(method, resourse, true);

			// Вешаем обработчик на изменение состояния запроса.
			xhr.onreadystatechange = () => {
				if (xhr.readyState !== 4) return;
				if (xhr.status === 200) {
					let data = JSON.parse(xhr.responseText);

					this._trigger('fetch', xhr);
					this.setData(data);
				}
			}

			// Отправляем запрос.
			xhr.send();
		}
	}

	// export
	window.Model = Model;

})();