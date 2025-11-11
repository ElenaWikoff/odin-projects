/**
 * This file is a driver script to test the binary search tree.
 *
 * @file Driver script
 * @author Elena Wikoff
 */

import Tree from "./tree.js";

function driver() {
  const array = [];
  for (let i = 0; i < 100; i++) {
    const rand = Math.floor(Math.random() * 100);
    array.push(rand);
  }

  const bst = new Tree<number>(array);

  console.log(`Is tree balanced?: ${bst.isBalanced()}`);
  console.log(`Level Order: ${bst.levelorder()}`);
  console.log(`   In-Order: ${bst.inorder()}`);
  console.log(`  Pre-Order: ${bst.preorder()}`);
  console.log(` Post-Order: ${bst.postorder()}`);

  for (let i = 0; i < 100; i++) {
    const rand = Math.floor(Math.random() * 300 - 100);
    bst.insert(rand);
  }

  console.log("");
  console.log("Adding 100 elements to tree...");
  console.log(`Is tree balanced?: ${bst.isBalanced()}`);

  bst.rebalance();
  console.log("");
  console.log("Balancing tree...");
  console.log(`Is tree balanced?: ${bst.isBalanced()}`);
  console.log(`Level Order: ${bst.levelorder()}`);
  console.log(`   In-Order: ${bst.inorder()}`);
  console.log(`  Pre-Order: ${bst.preorder()}`);
  console.log(` Post-Order: ${bst.postorder()}`);
}

driver();
