import {Collectible} from '../../../src/decorator/collectible';
import {Collection} from '../../../src/decorator/collection';
import {Embeddable} from '../../../src/decorator/embeddable';
import {Embedded} from '../../../src/decorator/embedded';
import {Entity} from '../../../src/decorator/entity';
import {Id} from '../../../src/decorator/id';
import {Property} from '../../../src/decorator/property';
import {Config} from '../../../src/config';
import {PersistentConfig} from '../../../src/persistent-config';
import {createEntityManagerStub} from '../helper';

Config.create();

describe('@Entity', () => {
  let entityManager;

  beforeEach(() => {
    entityManager = createEntityManagerStub();
  });

  it('@Entity', () => {
    @Entity class Foo {
      @Id id;
    }
    expect(PersistentConfig.has(Foo)).toBeTruthy();
    expect(PersistentConfig.get(Foo).path).toEqual('foo');

    return entityManager.create(Foo, {})
      .then(foo => expect(foo).toEqual(jasmine.any(Foo)));
  });

  it('@Entity()', () => {
    @Entity() class Foo {
      @Id id;
    }
    expect(PersistentConfig.has(Foo)).toBeTruthy();
    expect(PersistentConfig.get(Foo).path).toEqual('foo');

    return entityManager.create(Foo, {})
      .then(foo => expect(foo).toEqual(jasmine.any(Foo)));
  });

  it('@Entity(path)', () => {
    @Entity('bar') class Foo {
      @Id id;
    }
    expect(PersistentConfig.get(Foo).path).toEqual('bar');

    return entityManager.create(Foo, {})
      .then(foo => expect(foo).toEqual(jasmine.any(Foo)));
  });

  it('No @Entity', () => {
    class Foo {
      @Id id;
    }
    expect(PersistentConfig.get(Foo).path).toBeUndefined();

    return entityManager.create(Foo, {})
      .then(
        () => {throw new Error('created entity');},
        err => expect(err.message).toEqual('EntityManager expects a valid Entity')
      );
  });

  it('Collectible & Embeddable', () => {
    @Collectible
    @Embeddable
    class Bar {
      @Property prop;
    }

    @Entity
    class Foo {
      @Collection(Bar)
      bars;

      @Embedded(Bar)
      bar;
    }
    let data = {bars: [{prop: 'A'}, {prop: 'B'}], bar: {prop: 'C'}};
    expect(Bar.isCollectible).toBe(true);
    expect(Bar.isEmbeddable).toBe(true);
    return entityManager.create(Foo, data).then(foo => {
      let bars = Array.from(foo.bars);
      expect(bars.length).toBe(2);
      expect(bars[0].prop).toBe('A');
      expect(bars[1].prop).toBe('B');
      expect(foo.bar.prop).toBe('C');
    });
  });

  it('Entity constructor', () => {
    @Entity
    class Foo {
      @Property prop;

      constructor() {
        this.prop = 'foo';
      }

      __construct(prop = 'bar') {
        this.prop = this.prop || 'bar';
      }
    }
    return entityManager.create(Foo, {})
      .then(foo => expect(foo.prop).toBeUndefined());
  });

  it('Non-Entity constructor', () => {
    @Embeddable
    class Bar {
      @Property prop;

      constructor() {
        this.prop = 'foo';
      }

      __construct(prop = 'bar') {
        this.prop = this.prop || prop;
      }
    }

    @Entity
    class Foo {
      @Embedded(Bar)
      bar;
    }
    expect(new Bar().prop).toBe('bar');
    expect(new Bar('baz').prop).toBe('baz');
    return entityManager.create(Foo, {})
      .then(foo => expect(foo.bar.prop).toBeUndefined());
  });
});
