import { LinkedList } from "./linked-list.js";

export function HashMap(capacity = 16, loadFactor = 0.75) {
  let _capacity = capacity;
  let _loadFactor = loadFactor;
  let _length = 0;
  let _map = Array.from({ length: capacity }, () => LinkedList());

  const _hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _capacity;
    }

    return hashCode;
  };

  const _findNode = (key) => _map[_hash(key)].findKey(key);

  const _set = (key, value) => {
    const list = _map[_hash(key)];
    const node = _findNode(key);
    let prev = null;
    if (!node) {
      _length++;
      list.append(key, value);
    } else {
      prev = node.value();
      node.setValue(value);
    }
    if (_length > _capacity * _loadFactor) {
      _expand();
    }
    return prev;
  };

  const _get = (key) => {
    const node = _findNode(key);
    return node ? node.value() : null;
  };

  const _has = (key) => {
    const list = _map[_hash(key)];
    return list.contains(key);
  };

  const _remove = (key) => {
    const list = _map[_hash(key)];
    const isFound = list.remove(key);
    if (isFound) {
      _length--;
    }
    return isFound;
  };

  const _clear = () => {
    _length = 0;
    _map = Array.from({ length: capacity }, () => LinkedList());
  };

  const _keys = () => {
    let keys = [];
    _map.forEach((bucket) => {
      keys = keys.concat(bucket.keys());
    });
    return keys;
  };

  const _values = () => {
    let values = [];
    _map.forEach((bucket) => {
      values = values.concat(bucket.values());
    });
    return values;
  };

  const _entries = () => {
    let entries = [];
    _map.forEach((bucket) => {
      entries = entries.concat(bucket.entries());
    });
    return entries;
  };

  function _expand() {
    _length = 0;
    _capacity = _capacity * 2;
    const entries = _entries();
    _map = Array.from({ length: _capacity }, () => LinkedList());
    entries.forEach(({ key, value }) => {
      _set(key, value);
    });
  }

  return {
    capacity: () => _capacity,
    loadFactor: () => _loadFactor,
    hash: (code) => _hash(code),
    set: (key, value) => _set(key, value),
    get: (key) => _get(key),
    has: (key) => _has(key),
    remove: (key) => _remove(key),
    length: () => _length,
    clear: () => _clear(),
    keys: () => _keys(),
    values: () => _values(),
    entries: () => _entries(),
  };
}
