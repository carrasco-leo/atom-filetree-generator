//
// config-schema.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:53:09+01:00
//

module.exports = {
	modelsPath: {
		title: 'Models Path',
		description: 'Directory where models are.',
		type: 'string',
		default: '',
	},

	modelsList: {
		title: 'Models List',
		description: 'A JSON object where each key is the model identifier and the value is the text shown in the modal.',
		type: 'string',
		default: '{}',
	}
}
