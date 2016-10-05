;(function () {
	'use strict';

	// Import
	let List = window.List;
	let Task = window.Task;
	let Form = window.Form;

	new List({
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

	new Task({
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

	new Form({
		elem: document.querySelector('.js-form')
	});
})();