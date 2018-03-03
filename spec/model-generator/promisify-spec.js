'use babel';
//
// promisify-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T16:55:06+01:00
//

import promisify from '../../lib/model-generator/promisify';

describe('model-generator/promisify', () => {
	let error, returnValue, callback;

	beforeEach(() => {
		let resolve = (_returnValue) => returnValue = _returnValue;
		let reject = (_error) => error = _error;

		error = null;
		returnValue = null;
		callback = promisify(
			(_returnValue) => returnValue = _returnValue,
			(_error) => error = _error,
		);
	});

	it('should reject', () => {
		callback('error');
		expect(error).toBe('error');
	});

	it('should resolve', () => {
		callback(null, 'data');
		expect(error).toBe(null);
		expect(returnValue).toBe('data');
	});
});
