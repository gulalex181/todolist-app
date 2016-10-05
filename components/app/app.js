;(function () {
	'use strict';

	class SpecialEvent {
		constructor (channel) {
			this._channel = channel;
			this._propagationState = 1;
		}

	    get channel () {
	        return this._channel;
	    }
	    
	    get propagationState () {
	        return this._propagationState;
	    }

		stopImmediatePropagation () {
			this._propagationState = 0;
		}
	}

	const EVENT_BUS = {
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

		on (channel, callback) {
			if (!EVENT_BUS.__eventList[channel]) {
				EVENT_BUS.__eventList[channel] = [];
			}
			EVENT_BUS.__eventList[channel].push(callback);
		},

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
	Object.defineProperty(EVENT_BUS, '__eventList', {
		value: {},
		enumerable: false,
		writable: true
	})

	function mixins (where, what) {
		for (let key in what) {
			if (what.hasOwnProperty(key)) {
				where.prototype[key] = what[key];
			}
		}
	}

	// Import
	let List = window.List;
	let Task = window.Task;
	let Form = window.Form;

	mixins(List, EVENT_BUS);
	mixins(Task, EVENT_BUS);
	mixins(Form, EVENT_BUS);

	let list = new List({
		elem: document.querySelector('.js-list'),
		data: [
			{
				anchor: 'Понедельник'
			},
			{
				anchor: 'Втоник'
			},
			{
				anchor: 'Среда'
			},
			{
				anchor: 'Четверг'
			},
			{
				anchor: 'Пятница'
			},
			{
				anchor: 'Суббота'
			},
			{
				anchor: 'Воскресенье'
			},
		]
	});

	let task = new Task({
		elem: document.querySelector('.js-task'),
		data: [
			{
				anchor: 'Дело номер 1'
			},
			{
				anchor: 'Дело номер 2'
			},
			{
				anchor: 'Дело номер 3'
			},
			{
				anchor: 'Дело номер 4'
			},
			{
				anchor: 'Дело номер 5'
			}
		]
	});

	let form = new Form({
		elem: document.querySelector('.js-form')
	});

	function formBtnClickHandler () {
		let text = form.getInputText();
		form.setInputText();
		if (text) task.addTask(text);
	}

	task.on('formBtnClick', formBtnClickHandler)


})();