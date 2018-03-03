'use babel';
//
// model-files-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T17:37:21+01:00
//

import glob from 'glob';

describe('model-generator/model-files', () => {
	it('should return the model tree', () => {
		const func = require('../../lib/model-generator/model-files');
		let tree = null;

		glob('**', { cwd: __dirname+'/models/test-model' }, (error, files) => {
			if (error) {
				throw error;
			}

			tree = files;
		});

		waitsFor(() => tree !== null);
		waitsForPromise(() => func(__dirname+'/models/test-model')
			.then((files) => {
				files.forEach(fileName => expect(tree).toContain(fileName));
				tree.forEach(fileName => expect(files).toContain(fileName));
			})
		);
	});

	it('should return a promise that reject', () => {
		const func = require('../../lib/model-generator/model-files');
		waitsForPromise({ shouldReject: true }, () => func());
	});
});
