/**
 * This file defines the Node factory function, which is used to build a
 * balanced binary search tree.
 *
 * @file Defines tree Node
 * @author Elena Wikoff
 */

type Primitive = string | number;
interface HasKey {
  key: string; // Or a more specific type for 'key' if needed
  [x: string]: any; // Allows for other properties on the object
}
export type NodeData = Primitive | HasKey;

/**
 * Node for a Binary Search Tree.
 */
class Node<T extends NodeData> {
  /** Data stored in Node. */
  private data: T;
  /** The left child node. */
  private left: Node<T> | null;
  /** The right child node. */
  private right: Node<T> | null;

  /**
   * Creates a new Node for a Binary Search Tree.
   * @param {T} data Data stored by node of type T.
   * @param {Node<T>} left The left child node.
   * @param {Node<T>} right The right child node.
   * @returns The newly created Node object.
   */
  constructor(data: T, left?: Node<T>, right?: Node<T> | null) {
    this.data = data;
    this.left = left ? left : null;
    this.right = right ? right : null;
  }

  /**
   * Returns the data stored in the Node.
   * @returns Value in Node.
   */
  getData(): T {
    return this.data;
  }

  /**
   * Returns the left child of Node; returns null if no left child.
   * @returns The Node's left child.
   */
  getLeft(): Node<T> | null {
    return this.left;
  }

  /**
   * Returns the right child of Node; returns null if no right child.
   * @returns The Node's right child.
   */
  getRight(): Node<T> | null {
    return this.right;
  }

  /**
   * Set data for node.
   * @param data New data.
   */
  setData(data: T) {
    this.data = data;
  }

  /**
   * Sets the node of the left child.
   * @param {Node<T>} node A Node.
   */
  setLeft(node: Node<T> | null) {
    this.left = node;
  }

  /**
   * Sets the node of the right child.
   * @param {Node<T>} node A Node.
   */
  setRight(node: Node<T> | null) {
    this.right = node;
  }
}

export default Node;
