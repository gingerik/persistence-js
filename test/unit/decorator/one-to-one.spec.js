import {Entity} from '../../../src/decorator/entity';
import {Id} from '../../../src/decorator/id';
import {OneToOne} from '../../../src/decorator/one-to-one';
import {Property} from '../../../src/decorator/property';
import {createEntityManagerStub} from '../helper';

@Entity
class Bar {
  @Id key;
  @Property prop;
}

@Entity
class Foo {
  @Id
  key;

  @OneToOne(Bar)
  bar;
}

describe('@OneToOne', () => {
  let foo;
  let bar;
  let emptyBar;

  beforeEach(() => {
    let entityManager = createEntityManagerStub();
    return Promise.all([
      entityManager.create(Foo, {key: 123}),
      entityManager.create(Bar, {key: 456}),
      entityManager.create(Bar, {})
    ])
    .then(values => [foo, bar, emptyBar] = values);
  });

  it('initial value', () => {
    return foo.bar.then(b => expect(b).toBeUndefined());
  });

  it('invalid reference', () => {
    expect(() => foo.bar = foo).toThrowError('invalid reference object');
  });

  it('valid reference', () => {
    foo.bar = bar;
    return foo.bar.then(b => expect(b).toEqual(bar));
  });
});
