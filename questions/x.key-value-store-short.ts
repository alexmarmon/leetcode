/*
 * Write a Fully funcitonal code in 25-30 min in interview with test cases:
 *
 * Set
 * Get
 * Delete
 * Begin
 * Commit
 * Rollback // should this be used as an opposition to commit? aka you begin, then commit _or_ rollback.
 * // or, if you begin then commit then rollback, should it remove the items that have been committed.
 */

class KVStore {
  store: Record<string, any>[] = [{}];

  isUncommitted: boolean = false;

  get lastIndex(): number {
    return this.store.length - 1;
  }

  set(key: string, value: any): void {
    this.store[this.lastIndex][key] = value;
  }

  get(key: string): any {
    for (let i = 0; i < this.store.length; i += 1) {
      if (this.store[i][key]) {
        return this.store[i][key];
      }
    }
    return undefined;
  }

  delete(key: string): void {
    for (let i = 0; i < this.store.length; i += 1) {
      if (this.store[i][key]) {
        delete this.store[i][key];
      }
    }
  }

  begin(): void {
    this.store.push({});
  }

  commit(): void {
    const lastElement = this.store.pop();
    Object.keys(lastElement).forEach((key) => {
      this.store[this.lastIndex][key] = lastElement[key];
    });
  }

  rollback(): void {
    this.store.pop();
  }
}

test('simple-set-get', () => {
  const kvStore = new KVStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);
  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
});

test('simple-set-delete-get', () => {
  const kvStore = new KVStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);
  kvStore.delete('key1');

  expect(kvStore.get('key1')).toBe(undefined);
  expect(kvStore.get('key2')).toBe(2);
});

test('simple-begin-commit', () => {
  const kvStore = new KVStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);

  kvStore.begin();

  kvStore.set('key3', 3);
  kvStore.set('key4', 4);

  kvStore.commit();

  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
  expect(kvStore.get('key3')).toBe(3);
  expect(kvStore.get('key4')).toBe(4);
});

test('less-simple-begin-commit', () => {
  const kvStore = new KVStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);

  kvStore.begin();

  kvStore.set('key3', 3);
  kvStore.set('key4', 4);

  kvStore.begin();

  kvStore.set('key5', 5);
  kvStore.set('key6', 6);

  kvStore.commit();

  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
  expect(kvStore.get('key3')).toBe(3);
  expect(kvStore.get('key4')).toBe(4);
  expect(kvStore.get('key5')).toBe(5);
  expect(kvStore.get('key6')).toBe(6);
});

test('simple-begin-commit-rollback', () => {
  const kvStore = new KVStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);

  kvStore.begin();

  kvStore.set('key3', 3);
  kvStore.set('key4', 4);

  kvStore.rollback();

  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
  expect(kvStore.get('key3')).toBe(undefined);
  expect(kvStore.get('key4')).toBe(undefined);
});

test('simple-begin-commit-rollback', () => {
  const kvStore = new KVStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);

  kvStore.begin();

  kvStore.set('key3', 3);
  kvStore.set('key4', 4);

  kvStore.begin();

  kvStore.set('key5', 5);
  kvStore.set('key6', 6);

  kvStore.commit();
  kvStore.rollback();

  kvStore.set('key7', 7);

  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
  expect(kvStore.get('key3')).toBe(undefined);
  expect(kvStore.get('key4')).toBe(undefined);
  expect(kvStore.get('key5')).toBe(undefined);
  expect(kvStore.get('key6')).toBe(undefined);
  expect(kvStore.get('key7')).toBe(7);
});
