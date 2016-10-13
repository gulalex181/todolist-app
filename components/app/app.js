;(function () {
	'use strict';

	// Import
	let Folder = window.Folder;
	let List = window.List;
	let Form = window.Form;
	let DragNDrop = window.DragNDrop;
	let Model = window.Model;

	let listModel = new Model({
		resourse: '/data/list.json',
		data: {}
	});

	let folderModel = new Model({
		resourse: '/data/folder.json',
		data: {}
	});

	let folder = new Folder({
		elem: document.querySelector('.js-folder')
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

	folderModel.on('update', data => {
		folder.setData(data);
		folder.render();
	});

	// Привязываем обработчик к каналу formBtnClick
	form.on('formBtnClick', event => {
		list.addItem(event.detail);
	});

	folder.on('itemClick', event => {
		listModel.fetch(event.detail.index);
	});

	folderModel.fetch();


})();