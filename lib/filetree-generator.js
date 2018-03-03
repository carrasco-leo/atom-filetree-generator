'use babel';
//
// filetree-generator.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T02:41:43+01:00
//

import { CompositeDisposable } from 'atom';

import FileTreeGeneratorModal from './filetree-generator-modal';
import modelGenerator from './model-generator';

export default {
	subscriptions: new CompositeDisposable(),
	modalPanel: null,
	modal: null,
	config: require('./config-schema'),

	activate(state) {
		let models = {};
		try {
			models = JSON.parse(atom.config.get('filetree-generator.modelsList'));
		} catch (error) {
			atom.notifications.addError('Invalid models list', {
				detail: error.message,
				stack: error.stack,
			});
		}

		this.modal = new FileTreeGeneratorModal(state.modalState, models);
		this.modal.on('cancel', () => this.hide());

		this.modalPanel = atom.workspace.addModalPanel({
			item: this.modal.element,
			visible: false,
		});

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'filetree-generator:ask': (event) => this.show(event),
		}));
	},

	deactivate() {
		this.subscriptions.dispose();
		this.modalPanel.destroy();
		this.modal.destroy();
	},

	serialize() {
		return {
			modalState: this.modal.serialize(),
		}
	},

	show(event) {
		let dest = event.target.dataset.path;
		let src = atom.config.get('filetree-generator.modelsPath');

		if (event.target.children.length !== 0) {
			dest = event.target.children[0].dataset.path;
		}

		this.modal.on('confirm', (model, data) => {
			this.generate(src, dest, model, data);
			this.hide();
		});

		this.modalPanel.show();
		this.modal.setData('');
		this.modal.focus();
	},

	hide() {
		this.modalPanel.hide();
	},

	generate(src, dest, model, data) {
		if (!src || !model) {
			return;
		}

		modelGenerator(src, dest, model, data).catch((error) => {
			atom.notifications.addError('Unable to generate model.', {
				detail: error.message,
				stack: error.stack,
			});
		});
	},
}
