/*
 * Write a Fully funcitonal code in 25-30 min in interview with test cases:
 *
 * Set
 * Get
 * Delete
 * Begin
 * Commit
 * Rollback
 */

class KeyValueStore {
  store: Record<string, any>[] = [{}];

  keyMap: Record<string, number> = {};

  uncomittedIndices: number[] = [];

  get lastIndex(): number {
    return this.store.length - 1;
  }

  set(key: string, value: any): void {
    this.store[this.lastIndex][key] = value;
    this.keyMap[key] = this.lastIndex;
  }

  get(key: string): any {
    const storeIndex = this.keyMap[key];
    if (!storeIndex && storeIndex !== 0) {
      return undefined;
    }
    return this.store[storeIndex][key];
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
    this.uncomittedIndices.push(this.lastIndex);
  }

  commit(): void {
    let uncomittedObjects;
    // loop through and create a single object out of the uncommitted ones
    for (let i = 0; i < this.uncomittedIndices.length; i += 1) {
      uncomittedObjects = { ...uncomittedObjects, ...this.store[this.uncomittedIndices[i]] };
    }
    // loop backwards through the store, and remove uncommitted objects
    for (let i = this.uncomittedIndices.length; i > 0; i -= 1) {
      this.store.splice(this.uncomittedIndices[i - 1], 1);
    }
    // append single new object at the end of the store stack
    this.store.push(uncomittedObjects);
    // loop through the uncommittedObject and update keyMap
    const keys = Object.keys(uncomittedObjects);
    for (let i = 0; i < keys.length; i += 1) {
      this.keyMap[keys[i]] = this.lastIndex;
    }
  }

  rollback(): void {
    // anything in the lastIndexed store item needs to be deleted from the keyMap
    const keys = Object.keys(this.store[this.lastIndex]);
    for (let i = 0; i < keys.length; i += 1) {
      delete this.keyMap[keys[i]];
    }
    this.store.pop();
  }
}

test('simple-set-get', () => {
  const kvStore = new KeyValueStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);
  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
});

test('simple-set-delete-get', () => {
  const kvStore = new KeyValueStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);
  kvStore.delete('key1');

  expect(kvStore.get('key1')).toBe(undefined);
});

test('simple-begin-commit', () => {
  const kvStore = new KeyValueStore();
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
  const kvStore = new KeyValueStore();
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
  const kvStore = new KeyValueStore();
  kvStore.set('key1', 1);
  kvStore.set('key2', 2);

  kvStore.begin();

  kvStore.set('key3', 3);
  kvStore.set('key4', 4);

  kvStore.commit();
  kvStore.rollback();

  expect(kvStore.get('key1')).toBe(1);
  expect(kvStore.get('key2')).toBe(2);
  expect(kvStore.get('key3')).toBe(undefined);
  expect(kvStore.get('key4')).toBe(undefined);
});

test('simple-begin-commit-rollback', () => {
  const kvStore = new KeyValueStore();
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
