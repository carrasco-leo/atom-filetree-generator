'use babel';
//
// filetree-generator-modal.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T02:47:28+01:00
//

import { TextEditor } from 'atom';

export default class FileTreeGeneratorModal {
	constructor(serializedState, models) {
		this.$model = document.createElement('select');
		this._addModels(this.$model, models);
		this.$model.classList.add('form-control')

		this.$data = new TextEditor({
			mini: true,
			placeholderText: 'Model Data',
		});

		this.$element = this._rootElement(this.$model, this.$data.element);
		this.$element.classList.add('filetree-generator');

		this._attachListener(this.$model, this.$data.element);
	}

	get model() {
		return this.$model && this.$model.value;
	}

	get data() {
		return this.$data && this.$data.getText();
	}

	get element() {
		return this.$element;
	}

  destroy() {
		this.$element.remove();
  }

	serialize() {
	}

	setData(data) {
		this.$data.setText(data);
	}

	focus() {
		this.$data.element.focus();
	}

	cancel() {
		this.$on.cancel();
	}

	confirm() {
		this.$on.confirm(this.model, this.data);
	}

	on(event, callback) {
		this.$on[event] = callback || () => null;
	}

	_rootElement(modelElement, dataElement) {
		const rootElement = document.createElement('div');

		const message = document.createElement('div');
		message.textContent = 'Select the model and enter the data for the template:';
		rootElement.appendChild(message);

		const container = document.createElement('div');
		container.classList.add('filetree-generator-template', 'settings-view');
		rootElement.appendChild(container);

		container.appendChild(modelElement);
		container.appendChild(dataElement);

		return rootElement;
	}

	_attachListener(modelElement, dataElement) {
		modelElement.addEventListener('change', () => dataElement.focus());
		dataElement.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				this.cancel();
			} else if (event.key === 'Enter') {
				this.confirm();
			}
		});

		this.$on = {
			cancel: () => null,
			confirm: () => null,
		};
	}

	_addModels(modelElement, models) {
		for (let key in models) {
			const option = document.createElement('option');
			option.value = key;
			option.textContent = models[key];

			modelElement.appendChild(option);
		}
	}
}
