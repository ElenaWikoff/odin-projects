export function Node(key, value, next) {
  let _key = key; // Key of node for hash map
  let _value = value; // Value at Node
  let _next = next; // Node

  return {
    key: () => _key,
    value: () => _value,
    next: () => _next,
    setValue: (value) => (_value = value),
    setNext: (next) => (_next = next),
  };
}

export function LinkedList(list) {
  let _head = null; // Private variable
  let _tail = null; // Private variable
  if (!list || list.length === 0) {
    _head = null;
    _tail = null;
  } else {
    list.forEach((value) => {
      const node = Node(value, null);
      if (_head === null) {
        _head = node;
        _tail = _head;
      } else {
        _tail.setNext(node);
        _tail = node;
      }
    });
  }

  const _append = (key, value) => {
    const node = Node(key, value, null);
    if (_head === null) {
      _head = node;
      _tail = _head;
    } else {
      _tail.setNext(node);
      _tail = node;
    }
  };

  const _prepend = (key, value) => {
    const node = Node(key, value, _head);
    _head = node;
    if (_tail === null) {
      _tail = _head;
    }
  };

  const _size = () => {
    let count = 0;
    let node = _head;
    while (node) {
      count++;
      node = node.next();
    }
    return count;
  };

  const _at = (index) => {
    let node = _head;
    let i = 0;
    while (node) {
      if (i === index) {
        return node;
      }
      i++;
      node = node.next();
    }
    throw new Error(
      `Index out of bounds: ${index}, linked list has ${i} nodes.`,
    );
  };

  const _pop = () => {
    if (!_tail) {
      return null;
    }
    const value = _tail.value();
    if (_head === _tail) {
      _head = null;
      _tail = null;
    } else {
      let node = _head;
      while (node.next().next()) {
        node = node.next();
      }
      node.setNext(null);
      _tail = node;
    }
    return value;
  };

  const _contains = (key) => {
    let node = _head;
    while (node) {
      if (node.key() === key) {
        return true;
      }
      node = node.next();
    }
    return false;
  };

  const _find = (value) => {
    let node = _head;
    while (node) {
      if (node.value() === value) {
        break;
      }
      node = node.next();
    }
    return node;
  };

  const _findKey = (key) => {
    let node = _head;
    while (node) {
      if (node.key() === key) {
        break;
      }
      node = node.next();
    }
    return node;
  };

  const _remove = (key) => {
    let prev = null;
    let node = _head;
    let found = false;
    while (node) {
      if (node.key() === key) {
        if (!prev) {
          // Remove first node in list
          _head = node.next();
          if (!_head) {
            _tail = _head;
          }
        } else {
          // Remove middle or last node in list
          prev.setNext(node.next());
        }
        found = true;
        break;
      }
      node = node.next();
      prev = prev ? prev.next() : (prev = _head);
    }
    return found;
  };

  const _keys = () => {
    const keys = [];
    let node = _head;
    while (node) {
      keys.push(node.key());
      node = node.next();
    }
    return keys;
  };

  const _values = () => {
    const values = [];
    let node = _head;
    while (node) {
      values.push(node.value());
      node = node.next();
    }
    return values;
  };

  const _entries = () => {
    const entries = [];
    let node = _head;
    while (node) {
      entries.push({
        key: node.key(),
        value: node.value(),
      });
      node = node.next();
    }
    return entries;
  };

  const _toString = () => {
    let output = "";
    let node = _head;
    while (node) {
      output += `( ${node.value()} ) -> `;
      node = node.next();
    }
    return (output += "null");
  };

  return {
    append: (key, value) => _append(key, value),
    prepend: (key, value) => _prepend(key, value),
    size: () => _size(),
    head: () => _head,
    tail: () => _tail,
    at: (index) => _at(index),
    pop: () => _pop(),
    contains: (key) => _contains(key),
    find: (value) => _find(value),
    findKey: (key) => _findKey(key),
    remove: (key) => _remove(key),
    keys: () => _keys(),
    values: () => _values(),
    entries: () => _entries(),
    toString: () => _toString(),
  };
}
