//
// main.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:15:49+01:00
//

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const modelFiles = require('./model-files');
const replaceFilename = require('./replace-filename');
const copyFile = require('./copy-file');

module.exports = function(src, dest, model, data) {
	return new Promise((resolve, reject) => {
		if (!src) {
			return reject(new RangeError('Models path is not defined'));
		}

		model = path.basename(model);
		const modelPath = path.join(src, model);

		if (model === '.' || model === '..') {
			return reject(new RangeError('Model must not be "." or ".."'));
		}

		fs.stat(modelPath, (error, stats) => {
			if (error) {
				return reject(error);
			} else if (!stats.isDirectory()) {
				return reject(new Error(`The model "${model}" is not a directory`));
			}

			modelFiles(modelPath)
				.map(fileName => replaceFilename(modelPath, dest, fileName, data))
				.each(model => copyFile(model.src, model.dest, data))
				.then(() => resolve())
				.catch((error) => reject(error))
		});
	});
}

module.exports.default = module.exports;
