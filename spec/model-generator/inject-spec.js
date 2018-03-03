'use babel';
//
// inject-spec.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T16:53:30+01:00
//

import changeCase from 'change-case';

import inject from '../../lib/model-generator/inject';
import { INJECT_KEYS } from '../../lib/model-generator/inject';

describe('model-generator/inject', () => {
	it('should convert the string for each INJECT_KEY', () => {
		INJECT_KEYS.forEach((key) => {
			const data = 'This is Ok';

			if (key === 'raw') {
				expect(inject(`{{-- raw --}}`, data)).toBe(data);
			} else {
				expect(inject(`{{-- ${key} --}}`, data)).toBe(changeCase[key](data));
			}
		});
	});
});
