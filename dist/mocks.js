'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mocks = exports.Mocks = function () {
	function Mocks() {
		_classCallCheck(this, Mocks);
	}

	_createClass(Mocks, null, [{
		key: 'mock',
		value: function mock(cl) {
			return this.stub(cl);
		}
	}, {
		key: 'stub',
		value: function stub(cl, overrides) {
			var temp = overrides && overrides['constructor'] ? overrides['constructor'] : function () {};
			var fns = Object.getOwnPropertyNames(cl.prototype);
			fns.forEach(function (property) {
				if (typeof cl.prototype[property] === 'function') {
					temp.prototype[property] = function () {};
					if (overrides && overrides[property]) spyOn(temp.prototype, property).and.callFake(overrides[property]);else spyOn(temp.prototype, property);
				}
			});
			return temp;
		}
	}]);

	return Mocks;
}();