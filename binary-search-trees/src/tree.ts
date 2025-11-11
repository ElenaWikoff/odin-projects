/**
 * This file defines the Tree factory function, which is a Balanced Binary
 * Search Tree.
 *
 * @file Defines Binary Search Tree
 * @author Elena Wikoff
 */

import Node, { type NodeData } from "./node.js";

/**
 * Check if object has "key" property.
 * @param obj Object
 * @returns *True* if object has a "key" property, *false* otherwise.
 */
function hasKeyProperty(obj: unknown): obj is { key: string; value: any } {
  return typeof obj === "object" && obj !== null && "key" in obj;
}

/**
 * Compare function for the type NodeData: *string*, *number* or has *key*
 * property.
 * @param {NodeData} a First item.
 * @param {NodeData} b Second item.
 * @returns > 1 if `a` > `b`, < 1 if `a` < `b`, 0 if `a` === `b`
 */
function compare(a: NodeData, b: NodeData): number {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  } else if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else if (hasKeyProperty(a) && hasKeyProperty(b)) {
    return String(a.key).localeCompare(b.key);
  }

  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Sort function for array of NodeData: *string*, *number* or has *key*
 * property.
 * @param array Array of NodeData.
 */
function sort<T extends NodeData>(array: T[]) {
  return [...array].sort((a, b) => compare(a, b));
}

/**
 * Creates a balanced **Binary Search Tree** from a sorted array.
 * @param {T[]} array The array must be sorted.
 * @param {number} start The first index of the array.
 * @param {number} end The last index of the array.
 * @returns The root of the **Binary Search Tree**.
 */
function sortedArrayToBST<T extends NodeData>(
  array: T[],
  start: number,
  end: number,
): Node<T> | null {
  if (!array) {
    throw new Error("Array cannot be null or undefined.");
  }
  // Base case.
  if (start > end) {
    return null;
  }
  // Throw error if invalid start or end.
  if (start < 0 || start >= array.length) {
    const trail = start < 0 ? `${start} < 0` : `${start} >= ${array.length}`;
    throw new Error(`Start index not in bounds of array: ${trail}`);
  }
  if (end < 0 || end >= array.length) {
    const trail = end < 0 ? `${end} < 0` : `${end} >= ${array.length}`;
    throw new Error(`End index not in bounds of array: ${trail}`);
  }

  // Get data for current node.
  const mid = Math.floor(start + (end - start) / 2);
  const root = new Node<T>(array[mid]!);

  // Decide left and right children.
  root.setLeft(sortedArrayToBST<T>(array, start, mid - 1));
  root.setRight(sortedArrayToBST<T>(array, mid + 1, end));

  // Return root.
  return root;
}

/**
 * Creates a balanced **Binary Search Tree** from an array.
 * @param {T[]} array The array.
 * @returns {Node<T>} The root of the **Binary Search Tree**.
 */
function buildTree<T extends NodeData>(array: T[]): Node<T> | null {
  const uniqueArray = [...new Set(array)];
  const sortedArray = sort(uniqueArray);
  return sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
}

/**
 * A **Balanced Binary Search Tree (BST)**. The data stored in the **BST** must
 * be a *string*, *number* or an *object* with a *key* property.
 *
 *
 * @see Node
 */
class Tree<T extends NodeData> {
  /** 0-level *Node* for **BST**. */
  private root: Node<T> | null;

  /**
   * Creates a new Balanced Binary Search tree using an array.
   * @class Tree
   * @param {T} array Elements to be added to BST.
   */
  constructor(array?: T[]) {
    this.root = array && array.length ? buildTree<T>(array) : null;
  }

  /**
   * Returns the root *Node*.
   * @returns root.
   */
  getRoot(): Node<T> | null {
    return this.root;
  }

  /**
   * Helper recursive function to insert *data* to **BST**.
   * @access private
   * @param {T} data Data to add.
   * @param {Node<T>} node Current node.
   */
  private insertRec(data: T, node: Node<T>) {
    const cmp = compare(data, node.getData());
    // Don't add duplicate
    if (cmp === 0) {
      return;
    }

    // Traverse left or right
    if (cmp < 0) {
      if (node.getLeft()) {
        this.insertRec(data, node.getLeft()!);
      } else {
        node.setLeft(new Node(data));
      }
    } else if (cmp > 0) {
      if (node.getRight()) {
        this.insertRec(data, node.getRight()!);
      } else {
        node.setRight(new Node(data));
      }
    }
  }

  /**
   * Adds new *Node* to **BST**.
   * @param {T} data Data to add.
   */
  insert(data: T) {
    if (!this.root) {
      this.root = new Node(data);
    } else {
      this.insertRec(data, this.root);
    }
  }

  /**
   * Helper recursive function to swap a *node* with its inorder successor.
   * @access private
   * @param deleteNode Node that will be virtually deleted.
   * @param node Current node.
   */
  private swapInorderSuccessor(deleteNode: Node<T>, node: Node<T> | null) {
    if (!node) {
      return;
    }
    if (!node.getLeft()) {
      // If no left child, is successor, swap and delete.
      const temp = node.getData();
      node.setData(deleteNode.getData());
      deleteNode.setData(temp);
      this.delete(node.getData());
    } else {
      // Has left child, traverse left.
      this.swapInorderSuccessor(deleteNode, node.getLeft());
    }
  }

  /**
   * Recursive function to delete *Node* with `data` in **BST**.
   * @access private
   * @param {T} data Data to remove.
   * @param {Node<T>} node Current *Node*.
   * @param {Node<T>} parent Parent of `node`.
   * @param {string} dir Side of `node` from parent: "left" | "right" | null.
   */
  private deleteRec(
    data: T,
    node: Node<T> | null,
    parent: Node<T> | null,
    dir: string,
  ) {
    // Hit null.
    if (!node) {
      return;
    }
    // Hit target data.
    if (data === node.getData()) {
      if (!(node.getLeft() || node.getRight())) {
        // Case 1: If leaf.
        if (!parent) {
          // If root, set root to null.
          this.root = null;
        } else {
          // If not root, set to null.
          dir === "left" ? parent.setLeft(null) : parent.setRight(null);
        }
      } else if (node.getLeft() && !node.getRight()) {
        // Case 2.1: If only has left child.
        const child = node.getLeft();
        if (!parent) {
          // If root, set root to left child.
          this.root = child;
        } else {
          // If not root, connect right child to parent.
          dir === "left" ? parent.setLeft(child) : parent.setRight(child);
        }
      } else if (!node.getLeft() && node.getRight()) {
        // Case 2.2: If only has right child.
        const child = node.getRight();
        if (!parent) {
          // If root, set root to right child.
          this.root = child;
        } else {
          // If not root, connect left child to parent.
          dir === "left" ? parent.setLeft(child) : parent.setRight(child);
        }
      } else if (node.getLeft() && node.getRight()) {
        // Case 3: Two children, replace with inorder successor.
        this.swapInorderSuccessor(node, node.getRight());
      }
    } else {
      // Continue traversal
      this.deleteRec(data, node.getLeft(), node, "left");
      this.deleteRec(data, node.getRight(), node, "right");
    }
  }

  /**
   * Remove *Node* from **BST**.
   * @param {T} data Data to delete.
   */
  delete(data: T) {
    this.deleteRec(data, this.root, null, "");
  }

  /**
   * Helper recursive method for finding *Node* of `data` in **BST**.
   * @access private
   * @param {T} data Target data.
   * @param {Node<T>} node Current *Node*.
   * @returns *Node* that has target `data` or *null* if not found.
   */
  private findRec(data: T, node: Node<T> | null): Node<T> | null {
    if (!node) {
      return null;
    } else if (data === node.getData()) {
      return node;
    } else if (data < node.getData()) {
      return this.findRec(data, node.getLeft());
    } else {
      return this.findRec(data, node.getRight());
    }
  }

  /**
   * Finds the *Node* containing `data` in **BST**.
   * @param {T} data Target data.
   * @returns *Node* that has target `data` or *null* if not found.
   */
  find(data: T): Node<T> | null {
    return this.findRec(data, this.root);
  }

  /**
   * Traverses the **BTS** in breadth-first level order and calls a `callback`
   * function on every node.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  levelOrderForEach(callback: (node: Node<T>) => void) {
    if (!callback) {
      throw new Error("A callback is required.");
    }

    if (this.root !== null) {
      // BFS
      const queue: Node<T>[] = [];

      queue.push(this.root); // Enqueue node.
      // Repeat steps until queue is empty.
      while (queue.length > 0) {
        const node = queue.shift()!; // Dequeue front node from queue.
        callback(node); // Perform callback on node.
        // Push children to queue.
        node.getLeft() ? queue.push(node.getLeft()!) : null;
        node.getRight() ? queue.push(node.getRight()!) : null;
      }
    }
  }

  /**
   * Helper recursive function for `inOrderForEach(callback)`.
   * @access private
   * @param {Node<T>} node Current *Node*.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  private inOrderForEachRec(node: Node<T>, callback: (node: Node<T>) => void) {
    // Traverse left subtree
    if (node.getLeft()) {
      this.inOrderForEachRec(node.getLeft()!, callback);
    }

    // Visit root and perform callback
    callback(node);

    // Traverse right subtree
    if (node.getRight()) {
      this.inOrderForEachRec(node.getRight()!, callback);
    }
  }

  /**
   * Traverses the **BTS** using DFS inorder traversal, calling the `callback`
   * function on each *Node*.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  inOrderForEach(callback: (node: Node<T>) => void) {
    this.root ? this.inOrderForEachRec(this.root, callback) : null;
  }

  /**
   * Helper recursive function for `preOrderForEach(callback)`.
   * @access private
   * @param {Node<T>} node Current *Node*.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  private preOrderForEachRec(node: Node<T>, callback: (node: Node<T>) => void) {
    // Visit root and perform callback
    callback(node);

    // Traverse left subtree
    if (node.getLeft()) {
      this.preOrderForEachRec(node.getLeft()!, callback);
    }

    // Traverse right subtree
    if (node.getRight()) {
      this.preOrderForEachRec(node.getRight()!, callback);
    }
  }

  /**
   * Traverses the **BTS** using DFS preoder traversal, calling the `callback`
   * function on each *Node*.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  preOrderForEach(callback: (node: Node<T>) => void) {
    this.root ? this.preOrderForEachRec(this.root, callback) : null;
  }

  /**
   * Helper recursive function for `postOrderForEach(callback)`.
   * @access private
   * @param {Node<T>} node Current *Node*.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  private postOrderForEachRec(
    node: Node<T>,
    callback: (node: Node<T>) => void,
  ) {
    // Traverse left subtree
    if (node.getLeft()) {
      this.postOrderForEachRec(node.getLeft()!, callback);
    }

    // Traverse right subtree
    if (node.getRight()) {
      this.postOrderForEachRec(node.getRight()!, callback);
    }

    // Visit root and perform callback
    callback(node);
  }

  /**
   * Traverses the **BTS** using DFS postorder traversal, calling the `callback`
   * function on each *Node*.
   * @param {(node: Node<T>) => void} callback Function to call on each *Node*.
   */
  postOrderForEach(callback: (node: Node<T>) => void) {
    this.root ? this.postOrderForEachRec(this.root, callback) : null;
  }

  /**
   * Helper recursive function that uses a preorder DFS to find the height of
   * a node.
   * @access private
   * @param {Node<T>} node Current node.
   * @param {number} height Number of edges from original node.
   */
  private heightRec(node: Node<T>, height: number): number {
    // Base case: if leaf, return height.
    if (!(node.getLeft() || node.getRight())) {
      return height;
    }

    // Traverse left subtree
    const lChild = node.getLeft();
    const lHeight = lChild ? this.heightRec(lChild!, height + 1) : 0;

    // Traverse right subtree
    const rChild = node.getRight();
    const rHeight = rChild ? this.heightRec(rChild!, height + 1) : 0;

    // Return max heights of left or right paths.
    return Math.max(lHeight, rHeight);
  }

  /**
   * Returns the height of the node containing the given `value`. Height is
   * defined as the number of edges in the longest path from a node to a leaf
   * node.
   * @param {T} value Value for *Node* to find.
   * @return {number} Height of *Node* or *null* if not found.
   */
  height(value: T): number | null {
    if (this.root !== null) {
      // BFS
      const queue: Node<T>[] = [];

      queue.push(this.root); // Enqueue node.
      // Repeat steps until queue is empty.
      while (queue.length > 0) {
        const level_size = queue.length; // Number of nodes at current level.
        for (let i = 0; i < level_size; i++) {
          const node = queue.shift()!; // Dequeue front node from queue.
          // If node includes value, return height.
          if (node.getData() === value) {
            return this.heightRec(node, 0); // Use DFS to height.
          }
          // Push children to queue.
          node.getLeft() ? queue.push(node.getLeft()!) : null;
          node.getRight() ? queue.push(node.getRight()!) : null;
        }
      }
    }
    return null; // If Node with value not found, return mull.
  }

  /**
   * Returns the depth of the node containing the given `value`. Depth is
   * defined as the number of edges in the path from that node to the root node.
   * @param {T} value Value for *Node* to find.
   * @return {number} Depth of *Node* or *null* if not found.
   */
  depth(value: T): number | null {
    if (this.root !== null) {
      // BFS
      let depth = -1;
      const queue: Node<T>[] = [];

      queue.push(this.root); // Enqueue node.
      // Repeat steps until queue is empty.
      while (queue.length > 0) {
        depth++; // Increment depth.
        const level_size = queue.length; // Number of nodes at current level.
        for (let i = 0; i < level_size; i++) {
          const node = queue.shift()!; // Dequeue front node from queue.
          // If node includes value, return depth.
          if (node.getData() === value) {
            return depth;
          }
          // Push children to queue.
          node.getLeft() ? queue.push(node.getLeft()!) : null;
          node.getRight() ? queue.push(node.getRight()!) : null;
        }
      }
    }
    return null; // If Node with value not found, return null.
  }

  /**
   * Checks if tree is balanced. A binary tree is balanced if, for every node,
   * the height difference between its left and right subtrees is no more than
   * 1.
   * @return {boolean} True if tree is balanced, false otherwise.
   */
  isBalanced(): boolean {
    if (this.root !== null) {
      // BFS
      const queue: Node<T>[] = [];

      queue.push(this.root); // Enqueue node.
      // Repeat steps until queue is empty.
      while (queue.length > 0) {
        const level_size = queue.length; // Number of nodes at current level.
        for (let i = 0; i < level_size; i++) {
          const node = queue.shift()!; // Dequeue front node from queue.

          // Check heights of left and right subtree.
          // Get height of left subtree.
          const lChild = node.getLeft();
          const lHeight = lChild ? this.heightRec(lChild!, 0) : -1;

          // Get height of right subtree.
          const rChild = node.getRight();
          const rHeight = rChild ? this.heightRec(rChild!, 0) : -1;

          // If difference between heights is greater than 1, return false.
          if (lHeight - rHeight > 1) {
            return false;
          }

          // Push children to queue.
          node.getLeft() ? queue.push(node.getLeft()!) : null;
          node.getRight() ? queue.push(node.getRight()!) : null;
        }
      }
    }
    return true; // Every node is balanced, return true.
  }

  /**
   * Returns array of node values in level order traversal.
   * @returns {T[]} Array
   */
  levelorder(): T[] {
    const array: T[] = [];
    this.levelOrderForEach((node) => array.push(node.getData()));
    return array;
  }

  /**
   * Returns array of node values in inorder traversal.
   * @returns {T[]} Array
   */
  inorder(): T[] {
    const array: T[] = [];
    this.inOrderForEach((node) => array.push(node.getData()));
    return array;
  }

  /**
   * Returns array of node values in preorder traversal.
   * @returns {T[]} Array
   */
  preorder(): T[] {
    const array: T[] = [];
    this.preOrderForEach((node) => array.push(node.getData()));
    return array;
  }

  /**
   * Returns array of node values in postorder traversal.
   * @returns {T[]} Array
   */
  postorder(): T[] {
    const array: T[] = [];
    this.postOrderForEach((node) => array.push(node.getData()));
    return array;
  }

  /**
   * Rebalances an unbalanced tree.
   */
  rebalance() {
    const array = this.inorder();
    this.root = buildTree(array);
  }

  /**
   * Helper function for printing **BST**.
   * @access private
   * @param {Node<T>} node *Node* to print.
   * @returns `node` string representation.
   */
  private output(node: Node<T> | null): string {
    if (node === null) {
      return "";
    }

    // Print key if not string or number.
    const data = node.getData();
    let output = "";
    if (hasKeyProperty(data)) {
      output = data.key;
    } else {
      output = `${data}`;
    }
    return output;
  }

  /**
   * Helper recursive function for printing **BST** as a tree.
   * @access private
   * @param {Node<T>} node Current *Node*.
   * @param {string} prefix Prefix before `node` string.
   * @param {boolean} isLeft If left child: *true*, *false* otherwise.
   */
  private prettyPrint(node: Node<T> | null, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.getRight() !== null) {
      this.prettyPrint(
        node.getRight(),
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${this.output(node)}`);
    if (node.getLeft() !== null) {
      this.prettyPrint(
        node.getLeft(),
        `${prefix}${isLeft ? "    " : "│   "}`,
        true,
      );
    }
  }

  /**
   * Prints tree to `console`.
   * @param pretty If *true*, represent as tree.
   */
  print(pretty = true) {
    if (pretty) {
      this.prettyPrint(this.root);
    } else {
      console.log(this.preorder());
    }
  }
}

export default Tree;
