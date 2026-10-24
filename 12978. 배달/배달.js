class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }

  push(item) {
    const heap = this.heap;
    heap.push(item);
    let i = heap.length - 1;

    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }

  pop() {
    const heap = this.heap;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      while (true) {
        const left = i * 2 + 1;
        const right = i * 2 + 2;

        let smallest = i;

        if (left < heap.length && heap[left][0] < heap[smallest][0])
          smallest = left;
        if (right < heap.length && heap[right][0] < heap[smallest][0])
          smallest = right;
        if (smallest === i) break;
        [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
        i = smallest;
      }
    }
    return top;
  }
}

function solution(N, road, K) {
  const graph = Array.from({ length: N + 1 }, () => []);
  for (const [a, b, w] of road) {
    graph[a].push([b, w]);
    graph[b].push([a, w]);
  }
  const dist = Array(N + 1).fill(Infinity);
  dist[1] = 0;

  const pq = new MinHeap();
  pq.push([0, 1]);

  while (pq.size() > 0) {
    const [cost, u] = pq.pop();
    if (cost > dist[u]) continue;

    for (const [v, w] of graph[u]) {
      const nc = cost + w;
      if (nc < dist[v]) {
        dist[v] = nc;
        pq.push([nc, v]);
      }
    }
  }
  let count = 0;
  for (let i = 1; i <= N; i++) {
    if (dist[i] <= K) {
      count++;
    }
  }
  return count;
}
