export function Node(value, next) {
  let _value = value; // Value at Node
  let _next = next; // Node

  return {
    value: () => _value,
    next: () => _next,
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

  const _append = (value) => {
    const node = Node(value, null);
    if (_head === null) {
      _head = node;
      _tail = _head;
    } else {
      _tail.setNext(node);
      _tail = node;
    }
  };

  const _prepend = (value) => {
    const node = Node(value, _head);
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

  const _contains = (value) => {
    let node = _head;
    while (node) {
      if (node.value() === value) {
        return true;
      }
      node = node.next();
    }
    return false;
  };

  const _find = (value) => {
    let node = _head;
    let index = 0;
    while (node) {
      if (node.value() === value) {
        break;
      }
      index++;
      node = node.next();
    }
    return node ? index : node;
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
    append: (value) => _append(value),
    prepend: (value) => _prepend(value),
    size: () => _size(),
    head: () => _head,
    tail: () => _tail,
    at: (index) => _at(index),
    pop: () => _pop(),
    contains: (value) => _contains(value),
    find: (value) => _find(value),
    toString: () => _toString(),
  };
}
