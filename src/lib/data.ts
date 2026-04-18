export interface Algorithm {
  slug: string;
  name: string;
  category: string;
  description: string;
  complexity: { time: string; space: string };
  useCases?: string[];
  pros?: string[];
  cons?: string[];
}

export const algorithms: Algorithm[] = [
  // ─── Sorting ─────────────────────────────────────────────────────────────
  {
    slug: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    description: "A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they're in the wrong order. Best for learning how sorting works. Stable, in-place, O(n²) time.",
    complexity: { time: "O(n²)", space: "O(1)" },
  },
  {
    slug: "selection-sort",
    name: "Selection Sort",
    category: "sorting",
    description: "Sorts by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning. Minimizes swaps to O(n). Simple but O(n²) time.",
    complexity: { time: "O(n²)", space: "O(1)" },
  },
  {
    slug: "insertion-sort",
    name: "Insertion Sort",
    category: "sorting",
    description: "Builds the sorted array one element at a time by inserting each into its correct position. Efficient for small or nearly sorted arrays. Stable, adaptive, O(n²) worst case.",
    complexity: { time: "O(n²)", space: "O(1)" },
  },
  {
    slug: "quick-sort",
    name: "Quick Sort",
    category: "sorting",
    description: "A fast divide-and-conquer algorithm that selects a pivot, partitions elements around it, and recursively sorts sub-arrays. The most widely used general-purpose sorting algorithm. O(n log n) average.",
    complexity: { time: "O(n log n)", space: "O(log n)" },
  },
  {
    slug: "merge-sort",
    name: "Merge Sort",
    category: "sorting",
    description: "A divide-and-conquer algorithm that splits the array in half, recursively sorts both halves, and merges them. Guarantees O(n log n) in all cases. Stable and predictable.",
    complexity: { time: "O(n log n)", space: "O(n)" },
  },

  // ─── Searching ───────────────────────────────────────────────────────────
  {
    slug: "linear-search",
    name: "Linear Search",
    category: "searching",
    description: "Sequentially checks each element until the target is found or the list ends. Works on unsorted arrays. O(n) time — simple but slow for large datasets.",
    complexity: { time: "O(n)", space: "O(1)" },
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    category: "searching",
    description: "Searches a sorted array by repeatedly dividing the search interval in half. Extremely efficient at O(log n). Requires sorted input. Used in databases and dictionaries.",
    complexity: { time: "O(log n)", space: "O(1)" },
  },

  // ─── Graph ───────────────────────────────────────────────────────────────
  {
    slug: "bfs",
    name: "Breadth First Search",
    category: "graph",
    description: "Graph traversal that explores all neighbors level by level using a queue (FIFO). Finds the shortest path in unweighted graphs. Used in social networks, web crawlers, and GPS.",
    complexity: { time: "O(V + E)", space: "O(V)" },
  },
  {
    slug: "dfs",
    name: "Depth First Search",
    category: "graph",
    description: "Graph traversal that explores as deep as possible along each branch before backtracking, using a stack or recursion. Used in maze solving, topological sorting, and cycle detection.",
    complexity: { time: "O(V + E)", space: "O(V)" },
  },
];
