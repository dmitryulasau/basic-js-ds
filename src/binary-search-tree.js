const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }

    let current = this._root;
    while (current) {
      if (data === current.data) {
        return;
      }
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    let current = this._root;
    let parent = null;
    let node = null;
    let direction = null;

    while (current) {
      if (data === current.data) {
        node = current;
        break;
      }
      parent = current;
      if (data < current.data) {
        current = current.left;
        direction = "left";
      } else {
        current = current.right;
        direction = "right";
      }
    }

    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      if (node === this._root) {
        this._root = null;
      } else {
        parent[direction] = null;
      }
    } else if (!node.left) {
      if (node === this._root) {
        this._root = node.right;
      } else {
        parent[direction] = node.right;
      }
    } else if (!node.right) {
      if (node === this._root) {
        this._root = node.left;
      } else {
        parent[direction] = node.left;
      }
    } else {
      let min = node.right;
      while (min.left) {
        min = min.left;
      }
      this.remove(min.data);
      node.data = min.data;
    }
  }

  min() {
    let current = this._root;
    while (current && current.left) {
      current = current.left;
    }
    return current ? current.data : null;
  }

  max() {
    let current = this._root;
    while (current && current.right) {
      current = current.right;
    }
    return current ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree,
};
