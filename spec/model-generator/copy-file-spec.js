'use babel';
//
// copy-file-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T17:59:43+01:00
//

import mock from 'mock-require';

describe('model-generator/copy-file', () => {
	afterEach(() => mock.stopAll());
	beforeEach(() => {
		mock('fs', {
			stat: (path, callback) => {
				callback(!path ? 'error' : null, {
					isDirectory: () => ['directory'].includes(path),
				});
			},

			mkdir: (path, mode, callback) => {
				callback(path === 'error' ? 'error' : null);
			},

			readFile: (path, options, callback) => {
				callback(path === 'read' ? 'error' : null, '');
			},

			writeFile: (path, body, options, callback) => {
				callback(path === 'write' ? 'error' : null);
			},
		});
	});

	it('should return a promise that reject', () => {
		const func = require('../../lib/model-generator/copy-file');

		waitsForPromise({ shouldReject: true }, () => func());
		waitsForPromise({ shouldReject: true }, () => func('directory', 'error'));
		waitsForPromise({ shouldReject: true }, () => func('read', 'read', ''));
		waitsForPromise({ shouldReject: true }, () => func('write', 'write', ''));
	});

	it('should return a promise that resolve', () => {
		const func = require('../../lib/model-generator/copy-file');

		waitsForPromise(() => func('file', 'file', ''));
	});
});
