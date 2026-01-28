import type { Category, Question } from "./types";

export const categories: Category[] = [
  {
    id: "arrays",
    label: "Arrays",
    headerTitle: "Arrays & Hashing — Common + Challenging",
    headerSubtitle:
      "Accordion items include: prompt, approach, edge cases, time/space, and a JS-friendly solution sketch.",
  },
  {
    id: "trees",
    label: "Trees",
    headerTitle: "Trees — Traversals + BST + Recursion",
    headerSubtitle:
      "Focus on recursion patterns, iterative stacks, and BST invariants. Each item includes edge cases + complexity.",
  },
  {
    id: "graphs",
    label: "Graphs",
    headerTitle: "Graphs — BFS/DFS + Topo + Shortest Path",
    headerSubtitle:
      "Core patterns: visited sets, queue BFS, recursion/stack DFS, topological sort, and Dijkstra.",
  },
  {
    id: "dp",
    label: "Dynamic Prog",
    headerTitle: "Dynamic Programming — Patterns + State",
    headerSubtitle:
      "Train: 1D/2D DP, knapsack, interval DP, and how to define state + transition.",
  },
  {
    id: "javascript",
    label: "JavaScript",
    headerTitle: "JavaScript — Common Interview Logic",
    headerSubtitle:
      "Core JS topics: event loop, closures, prototypes, async patterns, and small utilities (debounce/throttle).",
  },
];

export const questions: Question[] = [
  {
    id: "arrays-two-sum",
    category: "arrays",
    title: "Two Sum",
    subtitle: "Given indices of two numbers that sum to target.",
    difficulty: "Easy",
    tags: ["hash map"],
    prompt:
      "Prompt: Given nums[] and target, find two distinct indices i,j such that nums[i] + nums[j] = target.",
    code: {
      language: "js",
      content: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: { name: "LeetCode", url: "https://leetcode.com/problems/two-sum/" },
  },
  {
    id: "arrays-group-anagrams",
    category: "arrays",
    title: "Group Anagrams",
    subtitle: "Group strings by anagram class.",
    difficulty: "Medium",
    tags: ["hash map", "sorting"],
    prompt:
      "Prompt: Given an array of strings, group the anagrams together (order of groups doesn't matter).",
    code: {
      language: "js",
      content: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    const arr = map.get(key) ?? [];
    arr.push(s);
    map.set(key, arr);
  }
  return Array.from(map.values());
}`,
    },
    complexity: { time: "O(n * k log k)", space: "O(nk)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/group-anagrams/",
    },
  },
  {
    id: "arrays-product-except-self",
    category: "arrays",
    title: "Product Except Self",
    subtitle: "Array of products excluding index.",
    difficulty: "Medium",
    tags: ["prefix", "suffix"],
    prompt:
      "Prompt: Return an array output where output[i] is the product of all nums[j] for j != i (no division).",
    code: {
      language: "js",
      content: `function productExceptSelf(nums) {
  const n = nums.length;
  const out = Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    out[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out;
}`,
    },
    complexity: { time: "O(n)", space: "O(1) extra" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/product-of-array-except-self/",
    },
  },
  {
    id: "arrays-top-k-frequent",
    category: "arrays",
    title: "Top K Frequent",
    subtitle: "Most frequent elements in array.",
    difficulty: "Medium",
    tags: ["hash map", "bucket"],
    prompt:
      "Prompt: Return the k most frequent elements. Aim for better than O(n log n) when possible.",
    code: {
      language: "js",
      content: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
  const buckets = Array(nums.length + 1)
    .fill(0)
    .map(() => []);
  for (const [x, f] of freq.entries()) buckets[f].push(x);
  const out = [];
  for (let f = buckets.length - 1; f >= 0 && out.length < k; f--) {
    for (const x of buckets[f]) {
      out.push(x);
      if (out.length === k) break;
    }
  }
  return out;
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/top-k-frequent-elements/",
    },
  },
  {
    id: "arrays-longest-consecutive",
    category: "arrays",
    title: "Longest Consecutive",
    subtitle: "Longest consecutive run in set.",
    difficulty: "Medium",
    tags: ["set"],
    prompt:
      "Prompt: Given an unsorted array, return the length of the longest consecutive elements sequence (O(n)).",
    code: {
      language: "js",
      content: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (!set.has(x - 1)) {
      let cur = x;
      let len = 1;
      while (set.has(cur + 1)) {
        cur++;
        len++;
      }
      best = Math.max(best, len);
    }
  }
  return best;
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/longest-consecutive-sequence/",
    },
  },
  {
    id: "arrays-min-window-substring",
    category: "arrays",
    title: "Min Window Substring",
    subtitle: "Smallest window containing all chars.",
    difficulty: "Hard",
    tags: ["sliding window"],
    prompt:
      "Prompt: Find the minimum substring window of s that contains every character of t (with multiplicity).",
    code: {
      language: "js",
      content: `function minWindow(s, t) {
  if (!t) return '';
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let missing = t.length;
  let left = 0;
  let best = [0, Infinity];

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      const v = need.get(c);
      if (v > 0) missing--;
      need.set(c, v - 1);
    }
    while (missing === 0) {
      if (right - left < best[1] - best[0]) best = [left, right + 1];
      const lc = s[left++];
      if (need.has(lc)) {
        const v = need.get(lc) + 1;
        need.set(lc, v);
        if (v > 0) missing++;
      }
    }
  }

  return best[1] === Infinity ? '' : s.slice(best[0], best[1]);
}`,
    },
    complexity: { time: "O(n)", space: "O(k)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/minimum-window-substring/",
    },
  },
  {
    id: "arrays-subarray-sum-k",
    category: "arrays",
    title: "Subarray Sum = K",
    subtitle: "Count subarrays with sum k.",
    difficulty: "Medium",
    tags: ["prefix sum", "hash map"],
    prompt:
      "Prompt: Count the number of continuous subarrays whose sum equals k.",
    code: {
      language: "js",
      content: `function subarraySum(nums, k) {
  const count = new Map();
  count.set(0, 1);
  let sum = 0;
  let ans = 0;
  for (const x of nums) {
    sum += x;
    ans += count.get(sum - k) ?? 0;
    count.set(sum, (count.get(sum) ?? 0) + 1);
  }
  return ans;
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/subarray-sum-equals-k/",
    },
  },
  {
    id: "arrays-valid-sudoku",
    category: "arrays",
    title: "Valid Sudoku",
    subtitle: "Validate rows/cols/3x3 boxes.",
    difficulty: "Medium",
    tags: ["set", "matrix"],
    prompt:
      "Prompt: Determine if a 9x9 Sudoku board is valid (only validate filled cells).",
    code: {
      language: "js",
      content: `function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const ch = board[r][c];
      if (ch === '.') continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(ch) || cols[c].has(ch) || boxes[b].has(ch)) return false;
      rows[r].add(ch);
      cols[c].add(ch);
      boxes[b].add(ch);
    }
  }
  return true;
}`,
    },
    complexity: { time: "O(1)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/valid-sudoku/",
    },
  },
  {
    id: "arrays-3sum",
    category: "arrays",
    title: "3Sum",
    subtitle: "Unique triplets summing to zero.",
    difficulty: "Medium",
    tags: ["sorting", "two pointers"],
    prompt: "Prompt: Return all unique triplets [a,b,c] such that a+b+c = 0.",
    code: {
      language: "js",
      content: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        out.push([nums[i], nums[l], nums[r]]);
        l++;
        r--;
        while (l < r && nums[l] === nums[l - 1]) l++;
        while (l < r && nums[r] === nums[r + 1]) r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return out;
}`,
    },
    complexity: { time: "O(n^2)", space: "O(1) extra" },
    source: { name: "LeetCode", url: "https://leetcode.com/problems/3sum/" },
  },
  {
    id: "arrays-container-water",
    category: "arrays",
    title: "Container With Most Water",
    subtitle: "Two pointers max area.",
    difficulty: "Medium",
    tags: ["two pointers"],
    prompt:
      "Prompt: Given heights, find max area of water container (choose two lines).",
    code: {
      language: "js",
      content: `function maxArea(height) {
  let l = 0;
  let r = height.length - 1;
  let best = 0;
  while (l < r) {
    const h = Math.min(height[l], height[r]);
    best = Math.max(best, h * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}`,
    },
    complexity: { time: "O(n)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/container-with-most-water/",
    },
  },
  {
    id: "arrays-merge-intervals",
    category: "arrays",
    title: "Merge Intervals",
    subtitle: "Merge overlapping ranges.",
    difficulty: "Medium",
    tags: ["sorting"],
    prompt: "Prompt: Given intervals, merge all overlapping intervals.",
    code: {
      language: "js",
      content: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [s, e] of intervals) {
    if (!out.length || out[out.length - 1][1] < s) out.push([s, e]);
    else out[out.length - 1][1] = Math.max(out[out.length - 1][1], e);
  }
  return out;
}`,
    },
    complexity: { time: "O(n log n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/merge-intervals/",
    },
  },
  {
    id: "arrays-find-min-rotated",
    category: "arrays",
    title: "Find Min in Rotated Array",
    subtitle: "Binary search pivot.",
    difficulty: "Medium",
    tags: ["binary search"],
    prompt:
      "Prompt: Given rotated sorted array with unique elements, return the minimum.",
    code: {
      language: "js",
      content: `function findMin(nums) {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = (l + r) >> 1;
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}`,
    },
    complexity: { time: "O(log n)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    },
  },
  {
    id: "arrays-search-rotated",
    category: "arrays",
    title: "Search in Rotated Array",
    subtitle: "Binary search with sorted half.",
    difficulty: "Medium",
    tags: ["binary search"],
    prompt:
      "Prompt: Search target in rotated sorted array (unique). Return index or -1.",
    code: {
      language: "js",
      content: `function search(nums, target) {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] === target) return m;
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
}`,
    },
    complexity: { time: "O(log n)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    },
  },
  {
    id: "arrays-trap-rain-water",
    category: "arrays",
    title: "Trapping Rain Water",
    subtitle: "Two pointers with running max.",
    difficulty: "Hard",
    tags: ["two pointers"],
    prompt:
      "Prompt: Given elevation map, compute how much water can be trapped.",
    code: {
      language: "js",
      content: `function trap(height) {
  let l = 0;
  let r = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let ans = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      leftMax = Math.max(leftMax, height[l]);
      ans += leftMax - height[l];
      l++;
    } else {
      rightMax = Math.max(rightMax, height[r]);
      ans += rightMax - height[r];
      r--;
    }
  }
  return ans;
}`,
    },
    complexity: { time: "O(n)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/trapping-rain-water/",
    },
  },
  {
    id: "trees-validate-bst",
    category: "trees",
    title: "Validate BST",
    subtitle: "Check if a tree satisfies BST ordering.",
    difficulty: "Medium",
    tags: ["dfs", "recursion"],
    prompt:
      "Prompt: Determine if a binary tree is a valid BST. Every node must be in (low, high) bounds.",
    code: {
      language: "js",
      content: `function isValidBST(root) {
  function dfs(node, low, high) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
  }
  return dfs(root, -Infinity, Infinity);
}`,
    },
    complexity: { time: "O(n)", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/validate-binary-search-tree/",
    },
  },
  {
    id: "trees-level-order",
    category: "trees",
    title: "Level Order Traversal",
    subtitle: "BFS by levels.",
    difficulty: "Medium",
    tags: ["bfs", "queue"],
    prompt:
      "Prompt: Return level-order traversal of a binary tree as an array of levels.",
    code: {
      language: "js",
      content: `function levelOrder(root) {
  if (!root) return [];
  const out = [];
  const q = [root];
  for (let qi = 0; qi < q.length; ) {
    const size = q.length - qi;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = q[qi++];
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    out.push(level);
  }
  return out;
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    },
  },
  {
    id: "trees-invert",
    category: "trees",
    title: "Invert Tree",
    subtitle: "Swap left/right recursively.",
    difficulty: "Easy",
    tags: ["dfs"],
    prompt: "Prompt: Invert a binary tree (mirror).",
    code: {
      language: "js",
      content: `function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}`,
    },
    complexity: { time: "O(n)", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/invert-binary-tree/",
    },
  },
  {
    id: "trees-kth-smallest",
    category: "trees",
    title: "Kth Smallest in BST",
    subtitle: "Inorder traversal yields sorted.",
    difficulty: "Medium",
    tags: ["bst", "inorder"],
    prompt: "Prompt: Given a BST, return the kth smallest element.",
    code: {
      language: "js",
      content: `function kthSmallest(root, k) {
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
}`,
    },
    complexity: { time: "O(h + k)", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    },
  },
  {
    id: "trees-lca",
    category: "trees",
    title: "Lowest Common Ancestor",
    subtitle: "Find the split point in recursion.",
    difficulty: "Medium",
    tags: ["dfs", "recursion"],
    prompt:
      "Prompt: Return the lowest common ancestor of two nodes in a binary tree.",
    code: {
      language: "js",
      content: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ?? right;
}`,
    },
    complexity: { time: "O(n)", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    },
  },
  {
    id: "trees-max-path-sum",
    category: "trees",
    title: "Binary Tree Max Path Sum",
    subtitle: "Best path may pass through node.",
    difficulty: "Hard",
    tags: ["dfs", "postorder"],
    prompt:
      "Prompt: Find the maximum path sum in a binary tree (path can start/end anywhere).",
    code: {
      language: "js",
      content: `function maxPathSum(root) {
  let best = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const left = Math.max(0, gain(node.left));
    const right = Math.max(0, gain(node.right));
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  gain(root);
  return best;
}`,
    },
    complexity: { time: "O(n)", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    },
  },
  {
    id: "trees-diameter",
    category: "trees",
    title: "Diameter of Binary Tree",
    subtitle: "Longest path length between nodes.",
    difficulty: "Easy",
    tags: ["dfs", "postorder"],
    prompt:
      "Prompt: Return the length of the diameter (number of edges) of a binary tree.",
    code: {
      language: "js",
      content: `function diameterOfBinaryTree(root) {
  let best = 0;
  function depth(node) {
    if (!node) return 0;
    const l = depth(node.left);
    const r = depth(node.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  }
  depth(root);
  return best;
}`,
    },
    complexity: { time: "O(n)", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/diameter-of-binary-tree/",
    },
  },
  {
    id: "trees-subtree",
    category: "trees",
    title: "Subtree of Another Tree",
    subtitle: "Check structural equality at nodes.",
    difficulty: "Easy",
    tags: ["dfs"],
    prompt: "Prompt: Return true if subRoot is a subtree of root.",
    code: {
      language: "js",
      content: `function isSubtree(root, subRoot) {
  function same(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  }
  function dfs(node) {
    if (!node) return false;
    if (same(node, subRoot)) return true;
    return dfs(node.left) || dfs(node.right);
  }
  return dfs(root);
}`,
    },
    complexity: { time: "O(n*m) worst", space: "O(h)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/subtree-of-another-tree/",
    },
  },
  {
    id: "trees-right-side-view",
    category: "trees",
    title: "Right Side View",
    subtitle: "BFS take last at each level.",
    difficulty: "Medium",
    tags: ["bfs"],
    prompt:
      "Prompt: Return values visible from the right side of a binary tree.",
    code: {
      language: "js",
      content: `function rightSideView(root) {
  if (!root) return [];
  const out = [];
  const q = [root];
  for (let qi = 0; qi < q.length; ) {
    const size = q.length - qi;
    let last = null;
    for (let i = 0; i < size; i++) {
      const node = q[qi++];
      last = node;
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    out.push(last.val);
  }
  return out;
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/binary-tree-right-side-view/",
    },
  },
  {
    id: "trees-build-pre-in",
    category: "trees",
    title: "Build Tree (Preorder + Inorder)",
    subtitle: "Reconstruct from traversals.",
    difficulty: "Medium",
    tags: ["recursion", "hash map"],
    prompt:
      "Prompt: Construct binary tree from preorder and inorder traversal arrays.",
    code: {
      language: "js",
      content: `function buildTree(preorder, inorder) {
  const idx = new Map();
  for (let i = 0; i < inorder.length; i++) idx.set(inorder[i], i);
  let p = 0;
  function helper(l, r) {
    if (l > r) return null;
    const val = preorder[p++];
    const mid = idx.get(val);
    const node = { val, left: null, right: null };
    node.left = helper(l, mid - 1);
    node.right = helper(mid + 1, r);
    return node;
  }
  return helper(0, inorder.length - 1);
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    },
  },
  {
    id: "trees-serialize",
    category: "trees",
    title: "Serialize / Deserialize",
    subtitle: "Encode tree to string and back.",
    difficulty: "Hard",
    tags: ["bfs", "queue"],
    prompt:
      "Prompt: Design an algorithm to serialize and deserialize a binary tree.",
    code: {
      language: "js",
      content: `function serialize(root) {
  if (!root) return '';
  const out = [];
  const q = [root];
  for (let i = 0; i < q.length; i++) {
    const n = q[i];
    if (!n) {
      out.push('#');
      continue;
    }
    out.push(String(n.val));
    q.push(n.left ?? null);
    q.push(n.right ?? null);
  }
  return out.join(',');
}

function deserialize(data) {
  if (!data) return null;
  const arr = data.split(',');
  const root = { val: Number(arr[0]), left: null, right: null };
  const q = [root];
  let i = 1;
  for (let qi = 0; qi < q.length && i < arr.length; qi++) {
    const node = q[qi];
    const left = arr[i++];
    const right = arr[i++];
    if (left !== '#') {
      node.left = { val: Number(left), left: null, right: null };
      q.push(node.left);
    }
    if (right !== '#') {
      node.right = { val: Number(right), left: null, right: null };
      q.push(node.right);
    }
  }
  return root;
}`,
    },
    complexity: { time: "O(n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    },
  },
  {
    id: "graphs-course-schedule",
    category: "graphs",
    title: "Course Schedule",
    subtitle: "Detect cycles in prerequisites.",
    difficulty: "Medium",
    tags: ["topo", "bfs"],
    prompt:
      "Prompt: Given prerequisites, return whether you can finish all courses (graph has no cycle).",
    code: {
      language: "js",
      content: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indeg = Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  let seen = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const v = q[qi];
    seen++;
    for (const nei of adj[v]) {
      if (--indeg[nei] === 0) q.push(nei);
    }
  }
  return seen === numCourses;
}`,
    },
    complexity: { time: "O(V+E)", space: "O(V+E)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/course-schedule/",
    },
  },
  {
    id: "graphs-num-islands",
    category: "graphs",
    title: "Number of Islands",
    subtitle: "Count connected components in grid.",
    difficulty: "Medium",
    tags: ["dfs", "grid"],
    prompt:
      'Prompt: Given a grid of "1"/"0", count how many 4-directionally connected islands exist.',
    code: {
      language: "js",
      content: `function numIslands(grid) {
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  let ans = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n) return;
    if (grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        ans++;
        dfs(r, c);
      }
    }
  }
  return ans;
}`,
    },
    complexity: { time: "O(mn)", space: "O(mn)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/number-of-islands/",
    },
  },
  {
    id: "graphs-clone-graph",
    category: "graphs",
    title: "Clone Graph",
    subtitle: "Deep copy with visited map.",
    difficulty: "Medium",
    tags: ["dfs", "hash map"],
    prompt:
      "Prompt: Given a connected graph node, return a deep copy (clone) of the graph.",
    code: {
      language: "js",
      content: `function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  function dfs(n) {
    if (map.has(n)) return map.get(n);
    const copy = { val: n.val, neighbors: [] };
    map.set(n, copy);
    for (const nei of n.neighbors) copy.neighbors.push(dfs(nei));
    return copy;
  }
  return dfs(node);
}`,
    },
    complexity: { time: "O(V+E)", space: "O(V)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/clone-graph/",
    },
  },
  {
    id: "graphs-pacific-atlantic",
    category: "graphs",
    title: "Pacific Atlantic Water Flow",
    subtitle: "Reverse BFS/DFS reachability.",
    difficulty: "Medium",
    tags: ["dfs", "grid"],
    prompt:
      "Prompt: Return coordinates that can reach both oceans by moving to equal-or-higher heights in reverse flow.",
    code: {
      language: "js",
      content: `function pacificAtlantic(heights) {
  const m = heights.length;
  const n = heights[0]?.length ?? 0;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));

  function dfs(r, c, seen, prev) {
    if (r < 0 || c < 0 || r >= m || c >= n) return;
    if (seen[r][c]) return;
    if (heights[r][c] < prev) return;
    seen[r][c] = true;
    const h = heights[r][c];
    dfs(r + 1, c, seen, h);
    dfs(r - 1, c, seen, h);
    dfs(r, c + 1, seen, h);
    dfs(r, c - 1, seen, h);
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0, pac, -Infinity);
    dfs(r, n - 1, atl, -Infinity);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, pac, -Infinity);
    dfs(m - 1, c, atl, -Infinity);
  }

  const out = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) out.push([r, c]);
    }
  }
  return out;
}`,
    },
    complexity: { time: "O(mn)", space: "O(mn)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    },
  },
  {
    id: "graphs-network-delay",
    category: "graphs",
    title: "Network Delay Time",
    subtitle: "Dijkstra shortest paths.",
    difficulty: "Medium",
    tags: ["dijkstra", "heap"],
    prompt:
      "Prompt: Given directed weighted edges, compute time for a signal to reach all nodes (or -1).",
    code: {
      language: "js",
      content: `function networkDelayTime(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Minimal binary heap
  const heap = [[0, k]];
  function push(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 1) {
      const p = Math.floor(i / 2);
      if (heap[p][0] <= heap[i][0]) break;
      ;[heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }
  function pop() {
    if (heap.length === 1) return null;
    if (heap.length === 2) return heap.pop();
    const top = heap[1];
    heap[1] = heap.pop();
    let i = 1;
    while (true) {
      let s = i;
      const l = i * 2;
      const r = i * 2 + 1;
      if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
      if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
      if (s === i) break;
      ;[heap[s], heap[i]] = [heap[i], heap[s]];
      i = s;
    }
    return top;
  }

  while (heap.length > 1) {
    const [d, u] = pop();
    if (d !== dist[u]) continue;
    for (const [v, w] of adj[u]) {
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        push([nd, v]);
      }
    }
  }

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    ans = Math.max(ans, dist[i]);
  }
  return ans;
}`,
    },
    complexity: { time: "O(E log V)", space: "O(V+E)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/network-delay-time/",
    },
  },
  {
    id: "graphs-rotting-oranges",
    category: "graphs",
    title: "Rotting Oranges",
    subtitle: "Multi-source BFS minute layers.",
    difficulty: "Medium",
    tags: ["bfs", "grid"],
    prompt:
      "Prompt: Return minutes until all fresh oranges rot (or -1). 0=empty,1=fresh,2=rotten.",
    code: {
      language: "js",
      content: `function orangesRotting(grid) {
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }
  let mins = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  for (let qi = 0; qi < q.length && fresh > 0; ) {
    const size = q.length - qi;
    mins++;
    for (let i = 0; i < size; i++) {
      const [r, c] = q[qi++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
        if (grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        q.push([nr, nc]);
      }
    }
  }
  return fresh === 0 ? mins : -1;
}`,
    },
    complexity: { time: "O(mn)", space: "O(mn)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/rotting-oranges/",
    },
  },
  {
    id: "graphs-accounts-merge",
    category: "graphs",
    title: "Accounts Merge",
    subtitle: "Build graph of emails, find components.",
    difficulty: "Medium",
    tags: ["dfs", "hash map"],
    prompt:
      "Prompt: Merge accounts by common emails. Return merged accounts with sorted emails.",
    code: {
      language: "js",
      content: `function accountsMerge(accounts) {
  const adj = new Map();
  const owner = new Map();
  function addEdge(a, b) {
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a).push(b);
    adj.get(b).push(a);
  }
  for (const acc of accounts) {
    const name = acc[0];
    const first = acc[1];
    for (let i = 1; i < acc.length; i++) {
      owner.set(acc[i], name);
      addEdge(first, acc[i]);
    }
  }
  const seen = new Set();
  const out = [];
  for (const email of owner.keys()) {
    if (seen.has(email)) continue;
    const stack = [email];
    const comp = [];
    seen.add(email);
    while (stack.length) {
      const cur = stack.pop();
      comp.push(cur);
      for (const nei of adj.get(cur) ?? []) {
        if (!seen.has(nei)) {
          seen.add(nei);
          stack.push(nei);
        }
      }
    }
    comp.sort();
    out.push([owner.get(email), ...comp]);
  }
  return out;
}`,
    },
    complexity: { time: "O(N log N)", space: "O(N)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/accounts-merge/",
    },
  },
  {
    id: "graphs-cheapest-flights-k",
    category: "graphs",
    title: "Cheapest Flights (K Stops)",
    subtitle: "Bellman-Ford style relaxations.",
    difficulty: "Medium",
    tags: ["dp", "graphs"],
    prompt:
      "Prompt: Find the cheapest price from src to dst with at most k stops.",
    code: {
      language: "js",
      content: `function findCheapestPrice(n, flights, src, dst, k) {
  let dist = Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i <= k; i++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < next[v]) {
        next[v] = dist[u] + w;
      }
    }
    dist = next;
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}`,
    },
    complexity: { time: "O(kE)", space: "O(V)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    },
  },
  {
    id: "graphs-word-ladder",
    category: "graphs",
    title: "Word Ladder",
    subtitle: "Shortest transformation BFS.",
    difficulty: "Hard",
    tags: ["bfs", "string"],
    prompt:
      "Prompt: Return length of shortest transformation sequence from beginWord to endWord.",
    code: {
      language: "js",
      content: `function ladderLength(beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  const q = [[beginWord, 1]];
  for (let qi = 0; qi < q.length; qi++) {
    const [word, d] = q[qi];
    if (word === endWord) return d;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (dict.has(next)) {
          dict.delete(next);
          q.push([next, d + 1]);
        }
      }
    }
  }
  return 0;
}`,
    },
    complexity: { time: "O(N * L * 26)", space: "O(N)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/word-ladder/",
    },
  },
  {
    id: "graphs-alien-dictionary",
    category: "graphs",
    title: "Alien Dictionary",
    subtitle: "Topo sort from lexicographic order.",
    difficulty: "Hard",
    tags: ["topo"],
    prompt:
      "Prompt: Given a sorted list of words in an alien language, return a valid character order.",
    code: {
      language: "js",
      content: `function alienOrder(words) {
  const adj = new Map();
  const indeg = new Map();
  for (const w of words) {
    for (const ch of w) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!indeg.has(ch)) indeg.set(ch, 0);
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i];
    const b = words[i + 1];
    if (a.length > b.length && a.startsWith(b)) return '';
    const len = Math.min(a.length, b.length);
    for (let j = 0; j < len; j++) {
      if (a[j] !== b[j]) {
        if (!adj.get(a[j]).has(b[j])) {
          adj.get(a[j]).add(b[j]);
          indeg.set(b[j], (indeg.get(b[j]) ?? 0) + 1);
        }
        break;
      }
    }
  }
  const q = [];
  for (const [ch, d] of indeg.entries()) if (d === 0) q.push(ch);
  let out = '';
  for (let i = 0; i < q.length; i++) {
    const ch = q[i];
    out += ch;
    for (const nei of adj.get(ch) ?? []) {
      indeg.set(nei, indeg.get(nei) - 1);
      if (indeg.get(nei) === 0) q.push(nei);
    }
  }
  return out.length === indeg.size ? out : '';
}`,
    },
    complexity: { time: "O(total chars)", space: "O(U)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/alien-dictionary/",
    },
  },
  {
    id: "dp-coin-change",
    category: "dp",
    title: "Coin Change",
    subtitle: "Minimum coins to make amount.",
    difficulty: "Medium",
    tags: ["1d dp"],
    prompt:
      "Prompt: Given coin denominations and amount, return the fewest coins to make amount (or -1).",
    code: {
      language: "js",
      content: `function coinChange(coins, amount) {
  const INF = amount + 1;
  const dp = Array(amount + 1).fill(INF);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}`,
    },
    complexity: { time: "O(amount * coins)", space: "O(amount)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/coin-change/",
    },
  },
  {
    id: "dp-house-robber",
    category: "dp",
    title: "House Robber",
    subtitle: "Max sum with no adjacent picks.",
    difficulty: "Medium",
    tags: ["1d dp"],
    prompt: "Prompt: Maximize loot where you cannot take adjacent houses.",
    code: {
      language: "js",
      content: `function rob(nums) {
  let prev2 = 0;
  let prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
    },
    complexity: { time: "O(n)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/house-robber/",
    },
  },
  {
    id: "dp-word-break",
    category: "dp",
    title: "Word Break",
    subtitle: "Can string be segmented?",
    difficulty: "Medium",
    tags: ["dp", "set"],
    prompt: "Prompt: Decide if s can be segmented into dictionary words.",
    code: {
      language: "js",
      content: `function wordBreak(s, wordDict) {
  const dict = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
    },
    complexity: { time: "O(n^2)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/word-break/",
    },
  },
  {
    id: "dp-lis",
    category: "dp",
    title: "Longest Increasing Subsequence",
    subtitle: "Classic DP with binary search.",
    difficulty: "Medium",
    tags: ["binary search"],
    prompt:
      "Prompt: Return length of the longest strictly increasing subsequence.",
    code: {
      language: "js",
      content: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (tails[m] < x) l = m + 1;
      else r = m;
    }
    tails[l] = x;
  }
  return tails.length;
}`,
    },
    complexity: { time: "O(n log n)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/longest-increasing-subsequence/",
    },
  },
  {
    id: "dp-climbing-stairs",
    category: "dp",
    title: "Climbing Stairs",
    subtitle: "Fibonacci DP.",
    difficulty: "Easy",
    tags: ["1d dp"],
    prompt:
      "Prompt: Each step you can climb 1 or 2 steps. How many distinct ways to reach n?",
    code: {
      language: "js",
      content: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    },
    complexity: { time: "O(n)", space: "O(1)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/climbing-stairs/",
    },
  },
  {
    id: "dp-unique-paths",
    category: "dp",
    title: "Unique Paths",
    subtitle: "Grid DP count ways.",
    difficulty: "Medium",
    tags: ["2d dp"],
    prompt:
      "Prompt: Robot in m x n grid moves only right/down. Return number of unique paths.",
    code: {
      language: "js",
      content: `function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) dp[c] += dp[c - 1];
  }
  return dp[n - 1];
}`,
    },
    complexity: { time: "O(mn)", space: "O(n)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/unique-paths/",
    },
  },
  {
    id: "dp-partition-equal",
    category: "dp",
    title: "Partition Equal Subset Sum",
    subtitle: "0/1 knapsack to target sum.",
    difficulty: "Medium",
    tags: ["knapsack"],
    prompt:
      "Prompt: Decide if array can be partitioned into two subsets with equal sum.",
    code: {
      language: "js",
      content: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
  }
  return dp[target];
}`,
    },
    complexity: { time: "O(n*sum)", space: "O(sum)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/partition-equal-subset-sum/",
    },
  },
  {
    id: "dp-lcs",
    category: "dp",
    title: "Longest Common Subsequence",
    subtitle: "2D DP on prefixes.",
    difficulty: "Medium",
    tags: ["2d dp"],
    prompt:
      "Prompt: Given two strings, return the length of their longest common subsequence.",
    code: {
      language: "js",
      content: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
    },
    complexity: { time: "O(mn)", space: "O(mn)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/longest-common-subsequence/",
    },
  },
  {
    id: "dp-edit-distance",
    category: "dp",
    title: "Edit Distance",
    subtitle: "Insert/delete/replace min ops.",
    difficulty: "Hard",
    tags: ["2d dp"],
    prompt:
      "Prompt: Return the minimum operations to convert word1 into word2.",
    code: {
      language: "js",
      content: `function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}`,
    },
    complexity: { time: "O(mn)", space: "O(mn)" },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/edit-distance/",
    },
  },
  {
    id: "js-event-loop-order",
    category: "javascript",
    title: "Event Loop Order",
    subtitle: "Predict sync/microtask/macrotask order.",
    difficulty: "Easy",
    tags: ["async"],
    prompt:
      "Prompt: Given code mixing sync logs, Promise.then, and setTimeout, predict the output order.",
    code: {
      language: "js",
      content: `console.log('A');
Promise.resolve().then(() => console.log('micro'));
setTimeout(() => console.log('macro'), 0);
console.log('B');

// Output: A, B, micro, macro`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-debounce",
    category: "javascript",
    title: "Debounce",
    subtitle: "Delay execution until idle.",
    difficulty: "Medium",
    tags: ["utility"],
    prompt:
      "Prompt: Implement debounce(fn, wait) that delays invoking fn until wait ms have passed since last call.",
    code: {
      language: "js",
      content: `function debounce(fn, wait) {
  let timer = null;
  return function debounced(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-throttle",
    category: "javascript",
    title: "Throttle",
    subtitle: "Limit calls per time window.",
    difficulty: "Medium",
    tags: ["utility"],
    prompt:
      "Prompt: Implement throttle(fn, wait) that invokes fn at most once per wait ms.",
    code: {
      language: "js",
      content: `function throttle(fn, wait) {
  let last = 0;
  let timer = null;
  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(this, args);
      return;
    }
    if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-promise-all",
    category: "javascript",
    title: "Promise.all Polyfill",
    subtitle: "Resolve when all resolve; reject fast.",
    difficulty: "Medium",
    tags: ["async"],
    prompt:
      "Prompt: Implement Promise.all behavior for an iterable of promises/values.",
    code: {
      language: "js",
      content: `function promiseAll(iterable) {
  const items = Array.from(iterable);
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      resolve([]);
      return;
    }
    const out = Array(items.length);
    let remaining = items.length;
    items.forEach((p, i) => {
      Promise.resolve(p)
        .then((v) => {
          out[i] = v;
          remaining--;
          if (remaining === 0) resolve(out);
        })
        .catch(reject);
    });
  });
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-deep-clone",
    category: "javascript",
    title: "Deep Clone (with cycles)",
    subtitle: "Clone objects/arrays safely.",
    difficulty: "Medium",
    tags: ["utility", "recursion"],
    prompt:
      "Prompt: Implement deepClone(value) that supports objects/arrays and handles circular references.",
    code: {
      language: "js",
      content: `function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  const out = Array.isArray(value) ? [] : {};
  seen.set(value, out);
  for (const key of Object.keys(value)) {
    out[key] = deepClone(value[key], seen);
  }
  return out;
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-curry",
    category: "javascript",
    title: "Curry",
    subtitle: "Turn f(a,b,c) into f(a)(b)(c).",
    difficulty: "Medium",
    tags: ["functional"],
    prompt:
      "Prompt: Implement curry(fn) supporting partial application until arity is satisfied.",
    code: {
      language: "js",
      content: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, args.concat(more));
  };
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-memoize",
    category: "javascript",
    title: "Memoize",
    subtitle: "Cache results by arguments.",
    difficulty: "Medium",
    tags: ["cache"],
    prompt:
      "Prompt: Implement memoize(fn) that caches results for identical argument lists.",
    code: {
      language: "js",
      content: `function memoize(fn) {
  const cache = new Map();
  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const val = fn.apply(this, args);
    cache.set(key, val);
    return val;
  };
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-flatten-deep",
    category: "javascript",
    title: "Flatten Deep",
    subtitle: "Flatten nested arrays recursively.",
    difficulty: "Medium",
    tags: ["recursion"],
    prompt:
      "Prompt: Implement flattenDeep(arr) that flattens arbitrarily nested arrays.",
    code: {
      language: "js",
      content: `function flattenDeep(arr) {
  const out = [];
  (function dfs(a) {
    for (const x of a) {
      if (Array.isArray(x)) dfs(x);
      else out.push(x);
    }
  })(arr);
  return out;
}`,
    },
    source: { name: "Custom" },
  },
  {
    id: "js-lru-cache",
    category: "javascript",
    title: "LRU Cache",
    subtitle: "O(1) get/put with eviction.",
    difficulty: "Hard",
    tags: ["design", "map"],
    prompt:
      "Prompt: Implement LRUCache with get(key) and put(key,value) in O(1).",
    code: {
      language: "js",
      content: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}`,
    },
    source: {
      name: "LeetCode",
      url: "https://leetcode.com/problems/lru-cache/",
    },
  },
];
