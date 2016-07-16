define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Util = exports.Util = function () {
    function Util() {
      _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
      key: 'getClass',
      value: function getClass(target) {
        if (Util.isClass(target)) {
          return target.prototype.constructor;
        }
        if (!Util.isObject(target)) {
          throw new Error('expected instance or class');
        }
        return target.constructor;
      }
    }, {
      key: 'is',
      value: function is(value) {
        return value !== undefined && value !== null;
      }
    }, {
      key: 'isClass',
      value: function isClass(value) {
        return typeof value === 'function';
      }
    }, {
      key: 'isClassDecorator',
      value: function isClassDecorator(Target) {
        return Util.isClass(Target) && arguments.length === 1;
      }
    }, {
      key: 'isObject',
      value: function isObject(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && !Array.isArray(value);
      }
    }, {
      key: 'isPropertyDecorator',
      value: function isPropertyDecorator(target, propertyKey, descriptor) {
        return arguments.length === 3 && Util.isObject(target) && typeof propertyKey === 'string' && propertyKey !== '' && Util.isObject(descriptor);
      }
    }]);

    return Util;
  }();
});