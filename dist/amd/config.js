define(['exports', './util'], function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Config = undefined;

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

  var configurations = new WeakMap();

  var defaultInstance = void 0;
  var propertyDecorator = void 0;

  var Config = exports.Config = function () {
    function Config() {
      _classCallCheck(this, Config);

      var config = {
        extensible: false,
        onCreate: function onCreate() {
          return undefined;
        },
        baseUrl: null
      };
      configurations.set(this, config);
      if (!defaultInstance) {
        defaultInstance = this;
      }
    }

    _createClass(Config, [{
      key: 'configure',
      value: function configure(userConfig) {
        var config = configurations.get(this);
        for (var key in userConfig) {
          if (!Reflect.has(config, key)) {
            throw new Error('unknown configuration key: ' + key);
          }
          config[key] = userConfig[key];
        }
      }
    }, {
      key: 'current',
      get: function get() {
        var config = {};
        Object.assign(config, configurations.get(this));
        return Object.freeze(config);
      }
    }], [{
      key: 'create',
      value: function create(userConfig) {
        var config = new Config();
        config.configure(userConfig);
        return config;
      }
    }, {
      key: 'getPropertyDecorator',
      value: function getPropertyDecorator() {
        return propertyDecorator;
      }
    }, {
      key: 'setPropertyDecorator',
      value: function setPropertyDecorator(decorator) {
        if (!propertyDecorator && _util.Util.isPropertyDecorator(decorator)) {
          propertyDecorator = decorator;
        }
      }
    }, {
      key: 'getDefault',
      value: function getDefault() {
        return defaultInstance;
      }
    }]);

    return Config;
  }();
});