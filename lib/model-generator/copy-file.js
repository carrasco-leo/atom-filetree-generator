//
// copy-file.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:31:31+01:00
//

const fs = require('fs');
const Promise = require('bluebird');

const inject = require('./inject');
const promisify = require('./promisify');

function resolveDirectory(src, dest, callback) {
	fs.mkdir(dest, 0755, callback);
}

function resolveFile(src, dest, data, callback) {
	fs.readFile(src, 'utf8', (error, body) => {
		if (error) {
			return callback(error);
		}

		const options = { encoding: 'utf8', mode: 644 };
		fs.writeFile(dest, inject(body, data), options, callback);
	});
}

module.exports = function(src, dest, data) {
	return new Promise((resolve, reject) => {
		fs.stat(src, (error, stats) => {
			if (error) {
				reject(error);
			} else if (stats.isDirectory()) {
				resolveDirectory(src, dest, promisify(resolve, reject));
			} else {
				resolveFile(src, dest, data, promisify(resolve, reject));
			}
		});
	});
}

module.exports.default = module.exports;
module.exports.resolveDirectory = resolveDirectory;
module.exports.resolveFile = resolveFile;
