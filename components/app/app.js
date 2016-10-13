;(function () {
	'use strict';

	// Import
	let Menu = window.Menu;
	let List = window.List;
	let Form = window.Form;
	let DragNDrop = window.DragNDrop;
	let Model = window.Model;

	let listModel = new Model({
		resourse: '/todolist-app/data/list.json',
		data: {}
	});

	let menuModel = new Model({
		resourse: '/todolist-app/data/menu.json',
		data: {}
	});

	let menu = new Menu({
		elem: document.querySelector('.js-menu')
	});

	let list = new List({
		elem: document.querySelector('.js-list')
	});

	let form = new Form({
		elem: document.querySelector('.js-form'),
		data: {
			placeholder: 'Новая задача'
		}
	});

	listModel.on('update', data => {
		list.setData(data);
		list.render();

		new DragNDrop({
			container: document.querySelector('.js-list__list'),
			placeHolderClass: 'list__item_template',
			placeHolderText: 'Вставить сюда'
		});
	});

	menuModel.on('update', data => {
		menu.setData(data);
		menu.render();
	});

	// Привязываем обработчик к каналу formBtnClick
	form.on('formBtnClick', event => {
		list.addItem(event.detail);
	});

	menu.on('itemClick', event => {
		listModel.fetch(event.detail.folderIndex, event.detail.listIndex);
	});

	menuModel.fetch();


})();