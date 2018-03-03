//
// index.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T14:07:38+01:00
//

const main = require('./main')

module.exports = function(src, dest, model, data, callback) {
	if (!callback) {
		return main(src, dest, model, data);
	}

	main(src, dest, model, data)
		.then(() => callback(null))
		.catch((error) => callback(error));
}

module.exports.default = module.exports;
