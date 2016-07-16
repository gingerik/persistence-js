'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Id = Id;

var _entityConfig = require('../entity-config');

var _util = require('../util');

function Id(optTarget, optPropertyKey, optDescriptor) {
  var isDecorator = _util.Util.isPropertyDecorator.apply(_util.Util, arguments);
  var deco = function deco(target, propertyKey, descriptor) {
    _entityConfig.EntityConfig.get(target).configure({ idKey: propertyKey });
  };
  return isDecorator ? deco(optTarget, optPropertyKey, optDescriptor) : deco;
}