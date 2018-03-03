//
// model-files.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:31:15+01:00
//

const glob = require('glob');
const Promise = require('bluebird');

module.exports = function(src) {
	return new Promise((resolve, reject) => {
		glob('**', { cwd: src }, function(error, fileNames) {
			if (error) {
				return reject(fileNames);
			}

			resolve(fileNames);
		});
	});
}

module.exports.default = module.exports;
