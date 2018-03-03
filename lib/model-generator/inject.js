//
// inject.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:31:37+01:00
//

const changeCase = require('change-case');

const INJECT_KEYS = [
  'camel',
  'constant',
  'dot',
  'header',
  'lower',
  'lcFirst',
  'no',
  'param',
  'pascal',
  'path',
	'raw',
  'sentence',
  'snake',
  'swap',
  'title',
  'upper',
  'ucFirst',
]

module.exports = function(str, data) {
	return str.replace(/\{\{--\s*(\w+)\s*--\}\}/g, (raw, key) => {
		if (!INJECT_KEYS.includes(key)) {
			return raw;
		} else if (key === 'raw') {
			return data;
		} else {
			return changeCase[key](data);
		}
	});
}

module.exports.default = module.exports;
module.exports.INJECT_KEYS = INJECT_KEYS;
