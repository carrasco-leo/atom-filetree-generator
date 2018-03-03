'use babel';
//
// main-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T16:59:34+01:00
//

import mock from 'mock-require';
import Promise from 'bluebird';

describe('model-generator/main', () => {
	afterEach(() => mock.stopAll());

	it('should return a promise that reject', () => {
		const func = require('../../lib/model-generator/main');
		waitsForPromise({ shouldReject: true }, () => func(
			'',
			__dirname+'/generated',
			'.',
			'FileTree Generator',
		));

		waitsForPromise({ shouldReject: true }, () => func(
			__dirname+'/models',
			__dirname+'/generated',
			'.',
			'FileTree Generator',
		));
		waitsForPromise({ shouldReject: true }, () => func(
			__dirname+'/models',
			__dirname+'/generated',
			'..',
			'FileTree Generator',
		));

		waitsForPromise({ shouldReject: true }, () => func(
			__dirname+'/models',
			__dirname+'/generated',
			'404-not-found',
			'FileTree Generator',
		));
	});
});
