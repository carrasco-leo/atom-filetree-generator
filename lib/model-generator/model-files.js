//
// model-files.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:31:15+01:00
//

const glob = require('glob');
const Promise = require('bluebird');

const promisify = require('./promisify');

module.exports = function(src) {
	return new Promise((resolve, reject) => {
		glob('**', { cwd: src }, promisify(resolve, reject));
	});
}

module.exports.default = module.exports;
