'use babel';
//
// replace-filename-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T16:55:49+01:00
//

import changeCase from 'change-case';
import path from 'path';

import replaceFilename from '../../lib/model-generator/replace-filename';

describe('model-generator/replace-filename', () => {
	it('should return the src and dest', () => {
		waitsForPromise(() => replaceFilename('src', 'dest', 'fileName', null)
			.then((model) => {
				expect(model.src).toBe(path.join('src', 'fileName'))
				expect(model.dest).toBe(path.join('dest', 'fileName'))
			})
		);
	});

	it('should inject the data into the dest', () => {
		const data = 'Aa Bbb Ccc';
		const injected = changeCase.param(data);
		const fileName = '{{-- param --}}';

		waitsForPromise(() => replaceFilename('src', 'dest', fileName, data)
			.then((model) => {
				expect(model.src).toBe(path.join('src', fileName))
				expect(model.dest).toBe(path.join('dest', injected))
			})
		);
	});
});
