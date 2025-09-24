// lib/sorting.ts
export type ActionType = 'compare' | 'swap' | 'overwrite';
export type Action = {
  type: ActionType;
  indices: number[];        // indices involved (1 or 2)
  values?: number[];        // for overwrite: new value(s)
};

export type StepsResult = {
  actions: Action[];        // list of actions (compare/swap/overwrite)
  snapshots: number[][];    // snapshot[0] = initial array, snapshot[i] = array after actions[i-1]
};

/** Utility: push compare action and snapshot */
function pushCompare(actions: Action[], snapshots: number[][], arr: number[], i: number, j: number) {
  actions.push({ type: 'compare', indices: [i, j] });
  snapshots.push(arr.slice());
}

/** Utility: push swap and snapshot */
function pushSwap(actions: Action[], snapshots: number[][], arr: number[], i: number, j: number) {
  actions.push({ type: 'swap', indices: [i, j] });
  const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  snapshots.push(arr.slice());
}

/** Utility: push overwrite and snapshot */
function pushOverwrite(actions: Action[], snapshots: number[][], arr: number[], idx: number, value: number) {
  actions.push({ type: 'overwrite', indices: [idx], values: [value] });
  arr[idx] = value;
  snapshots.push(arr.slice());
}

export function getSortingSteps(algorithm: string, inputArr: number[]): StepsResult {
  const a = inputArr.slice();
  const n = a.length;
  const actions: Action[] = [];
  const snapshots: number[][] = [a.slice()];

  if (algorithm === 'bubble') {
    for (let k = 0; k < n - 1; k++) {
      for (let i = 0; i < n - k - 1; i++) {
        pushCompare(actions, snapshots, a, i, i + 1);
        if (a[i] > a[i + 1]) {
          pushSwap(actions, snapshots, a, i, i + 1);
        }
      }
    }
  } else if (algorithm === 'selection') {
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        pushCompare(actions, snapshots, a, minIdx, j);
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) pushSwap(actions, snapshots, a, i, minIdx);
    }
  } else if (algorithm === 'insertion') {
    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;
      // compare keys to find position
      while (j >= 0) {
        pushCompare(actions, snapshots, a, j, i);
        if (a[j] > key) {
          // shift a[j] to a[j+1]
          pushOverwrite(actions, snapshots, a, j + 1, a[j]);
          j--;
        } else {
          break;
        }
      }
      pushOverwrite(actions, snapshots, a, j + 1, key);
    }
  } else if (algorithm === 'merge') {
    // iterative merge sort helper (recursive merge to capture steps)
    function mergeSort(l: number, r: number) {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      mergeSort(l, m);
      mergeSort(m + 1, r);

      // merge stage
      const left: number[] = [];
      const right: number[] = [];
      for (let i = l; i <= m; i++) left.push(a[i]);
      for (let j = m + 1; j <= r; j++) right.push(a[j]);
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
        pushCompare(actions, snapshots, a, l + i, m + 1 + j);
        if (left[i] <= right[j]) {
          pushOverwrite(actions, snapshots, a, k, left[i]);
          i++;
        } else {
          pushOverwrite(actions, snapshots, a, k, right[j]);
          j++;
        }
        k++;
      }
      while (i < left.length) {
        pushOverwrite(actions, snapshots, a, k, left[i]);
        i++; k++;
      }
      while (j < right.length) {
        pushOverwrite(actions, snapshots, a, k, right[j]);
        j++; k++;
      }
    }
    mergeSort(0, n - 1);
  } else if (algorithm === 'quick') {
    function quickSort(l: number, r: number) {
      if (l >= r) return;
      let pivot = a[r];
      let i = l - 1;
      for (let j = l; j < r; j++) {
        pushCompare(actions, snapshots, a, j, r);
        if (a[j] < pivot) {
          i++;
          pushSwap(actions, snapshots, a, i, j);
        }
      }
      pushSwap(actions, snapshots, a, i + 1, r);
      const p = i + 1;
      quickSort(l, p - 1);
      quickSort(p + 1, r);
    }
    quickSort(0, n - 1);
  } else {
    // default: no-op
  }

  return { actions, snapshots };
}
