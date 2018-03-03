//
// replace-filename.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:31:23+01:00
//

const path = require('path');
const Promise = require('bluebird');

const inject = require('./inject');

module.exports = function(src, dest, fileName, data) {
	return Promise.resolve({
		src: path.join(src, fileName),
		dest: path.join(dest, inject(fileName, data)),
	});
}

module.exports.default = module.exports;
