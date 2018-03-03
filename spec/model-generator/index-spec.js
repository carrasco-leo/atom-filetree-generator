'use babel';
//
// index-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T16:51:48+01:00
//

import mock from 'mock-require';

describe('model-generator', () => {
	beforeEach(() => {
		mock('../../lib/model-generator/main', (src, dest, model, data) => {
			if (data) {
				return Promise.reject(data);
			} else {
				return Promise.resolve();
			}
		});
	});
	afterEach(() => mock.stopAll());

	it('should return a promise that resolve', () => {
		const modelGenerator = require('../../lib/model-generator');
		waitsForPromise(() => modelGenerator());
	});

	it('should return a promise that reject', () => {
		const func = require('../../lib/model-generator');
		waitsForPromise({ shouldReject: true }, () => func(0, 0, 0, 'error'));
	});

	it('should use the callback with no error', () => {
		const spy	= jasmine.createSpy('model-generator.spy');
		const func = require('../../lib/model-generator');

		func(0, 0, 0, null, spy);
		waitsFor(() => spy.callCount > 0);

		runs(() => {
			expect(spy).toHaveBeenCalledWith(null);
		});
	});

	it('should use the callback with an error', () => {
		const spy	= jasmine.createSpy('model-generator.spy');
		const func = require('../../lib/model-generator');

		func(0, 0, 0, 'error', spy);
		waitsFor(() => spy.callCount > 0);

		runs(() => {
			expect(spy).toHaveBeenCalledWith('error');
		});
	});
});
