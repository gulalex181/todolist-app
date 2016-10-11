;(function () {
	'use strict';

	// Import
	let Folder = window.Folder;
	let List = window.List;
	let Form = window.Form;
	let DragNDrop = window.DragNDrop;

	new Folder({
		elem: document.querySelector('.js-folder'),
		data: {
			items: [
				{
					content: 'Понедельник'
				},
				{
					content: 'Вторник'
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
		}
	});

	let list = new List({
		elem: document.querySelector('.js-list'),
		data: {
			items: [
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
				},
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
				},
				{
					content: 'Дело номер 1'
				},
				{
					content: 'Дело номер 2'
				}
			]
		}
	});

	let form = new Form({
		elem: document.querySelector('.js-form'),
		data: {
			placeholder: 'Новая задача'
		}
	});

	new DragNDrop({
		container: list.list,
		placeHolderClass: 'list__item_template',
		placeHolderText: 'Вставить сюда'
	});

	// Привязываем обработчик к каналу formBtnClick
	form.on('formBtnClick', event => {
		list.addItem(event.detail);
	});


})();