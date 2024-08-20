class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const insertHelper = (node, val) => {
      if (node === null) {
        return new Node(val);
      }

      if (val < node.val) {
        node.left = insertHelper(node.left, val);
      } else {
        node.right = insertHelper(node.right, val);
      }

      return node;
    };

    this.root = insertHelper(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current !== null) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findHelper = (node, val) => {
      if (node === null) {
        return undefined;
      }

      if (val === node.val) {
        return node;
      } else if (val < node.val) {
        return findHelper(node.left, val);
      } else {
        return findHelper(node.right, val);
      }
    };

    return findHelper(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      result.push(node.val); // Visit the node
      traverse(node.left); // Traverse left subtree
      traverse(node.right); // Traverse right subtree
    };

    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left); // Traverse left subtree
      result.push(node.val); // Visit the node
      traverse(node.right); // Traverse right subtree
    };

    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left); // Traverse left subtree
      traverse(node.right); // Traverse right subtree
      result.push(node.val); // Visit the node
    };

    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];

    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.val);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (node === null) {
        return null;
      }

      if (val === node.val) {
        // Node with no children
        if (node.left === null && node.right === null) {
          return null;
        }

        // Node with one child
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }

        // Node with two children
        let tempNode = this.getMin(node.right);
        node.val = tempNode.val;
        node.right = removeNode(node.right, tempNode.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
  }

  getMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const height = (node) => {
      if (node === null) return -1;
      return Math.max(height(node.left), height(node.right)) + 1;
    };

    const checkBalance = (node) => {
      if (node === null) return true;

      let leftHeight = height(node.left);
      let rightHeight = height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return checkBalance(node.left) && checkBalance(node.right);
    };

    return checkBalance(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root === null || (this.root.left === null && this.root.right === null)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    while (current.right !== null) {
      parent = current;
      current = current.right;
    }

    if (current.left !== null) {
      return this.getMax(current.left).val;
    }

    return parent.val;
  }

  getMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }

  // Iterative DFS in-order traversal

  dfsInOrderIteratively() {
    const result = [];
    const stack = [];
    let current = this.root;

    while (stack.length > 0 || current !== null) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      result.push(current.val);
      current = current.right;
    }

    return result;
  }
}

module.exports = BinarySearchTree;
