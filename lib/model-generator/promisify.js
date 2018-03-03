//
// promisify.js — FileTree Generator
//
// By Léo CARRASCO <leo.carrasco42@gmail.com>
// Started on 2018-03-03T15:53:19+01:00
//

module.exports = function(resolve, reject) {
	return function(error, returnValue) {
		if (error) {
			return reject(error);
		}

		resolve(returnValue);
	}
}

module.exports.default = module.exports;
