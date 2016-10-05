;(function () {
	'use strict';

	class SpecialEvent {
		/**
		 * Конструктор нестандартного события.
		 * @param {String} channel - канал события.
		 */
		constructor (channel) {
			this._channel = channel;
			this._propagationState = 1;
		}

		/**
		 * Возвращает имя канала.
		 * @returns {String}
		 */
		get channel () {
			return this._channel;
		}
		
		/**
		 * Возвращает состояние распространения события.
		 * @returns {Number}
		 */
		get propagationState () {
			return this._propagationState;
		}

		/**
		 * Останавливает распространения события по каналу.
		 */
		stopImmediatePropagation () {
			this._propagationState = 0;
		}
	}

	const EVENT_BUS = {
		/**
		 * Запускает обработчики события данного канала.
		 * @param {String} channel - канал события.
		 */
		trigger (channel) {
			if (!EVENT_BUS.__eventList[channel]) {
				return;
			}
			
			let currentEvent = new SpecialEvent(channel);

			for (let i = 0; i < EVENT_BUS.__eventList[channel].length; i += 1) {
				if (currentEvent.propagationState) {
					EVENT_BUS.__eventList[channel][i].call(this, currentEvent);
				}
			}
		},

		/**
		 * Привязывает обработчик к каналу события.
		 * @param {String} channel - канал события.
		 * @param {Function} callback - обработчик события.
		 */
		on (channel, callback) {
			if (!EVENT_BUS.__eventList[channel]) {
				EVENT_BUS.__eventList[channel] = [];
			}
			EVENT_BUS.__eventList[channel].push(callback);
		},

		/**
		 * Отвязывает обработчик от канала события.
		 * @param {String} channel - канал события.
		 * @param {Function} callback - обработчик события.
		 */
		off (channel, callback) {
			if (!EVENT_BUS.__eventList[channel]) {
				return;
			}
			if (callback === undefined) {
				delete EVENT_BUS.__eventList[channel];
				return;
			}

			let fnList = EVENT_BUS.__eventList[channel];

			for (let i = 0; i < fnList.length; i++) {
				if (fnList[i] === callback) {
					fnList.splice(i--, 1);
				}
			}
		}
	};
	// Создание в шина EVENT_BUS объекта каналов.
	Object.defineProperty(EVENT_BUS, '__eventList', {
		value: {},
		enumerable: false,
		writable: true
	});

	/**
	 * Примешивает в прототип одного объекта
	 * собственные свойства другого объекта.
	 * @param {Object} where - куда примешивает.
	 * @param {Object} what - что примешивает.
	 */
	function mixins (where, what) {
		for (let key in what) {
			if (what.hasOwnProperty(key)) {
				where.prototype[key] = what[key];
			}
		}
	}

	// Import
	let Folder = window.Folder;
	let List = window.List;
	let Form = window.Form;

	// Примешивание методов шины событий
	mixins(Folder, EVENT_BUS);
	mixins(List, EVENT_BUS);
	mixins(Form, EVENT_BUS);

	new Folder({
		elem: document.querySelector('.js-folder'),
		data: [
			{
				content: 'Понедельник'
			},
			{
				content: 'Втоник'
			},
			{
				content: 'Среда'
			},
			{
				content: 'Четверг'
			},
			{
				content: 'Пятница'
			},
			{
				content: 'Суббота'
			},
			{
				content: 'Воскресенье'
			},
		]
	});

	let list = new List({
		elem: document.querySelector('.js-list'),
		data: [
			{
				content: 'Дело номер 1'
			},
			{
				content: 'Дело номер 2'
			},
			{
				content: 'Дело номер 3'
			},
			{
				content: 'Дело номер 4'
			},
			{
				content: 'Дело номер 5'
			}
		]
	});

	let form = new Form({
		elem: document.querySelector('.js-form'),
		placeholder: 'Новая задача'
	});

	/**
	 * Обработчик клика по кнопке форму
	 */
	function formBtnClickHandler () {
		let text = form.getInputText().trim();
		form.setInputText('');
		if (text) list.addItem(text);
	}

	// Привязываем обработчик к каналу formBtnClick
	list.on('formBtnClick', formBtnClickHandler);


})();