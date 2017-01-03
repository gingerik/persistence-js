import {PersistentConfig} from '../persistent-config';

export function Collection(Type: PClass): PropertyDecorator {
  if (!Type || !Type.isCollectible) {
    throw new TypeError('@Collection type must be @Collectible');
  }
  return function(target: PObject, propertyKey: PropertyKey) {
    let config = PersistentConfig.get(target);
    config.configureProperty(propertyKey, {});
  };
}
