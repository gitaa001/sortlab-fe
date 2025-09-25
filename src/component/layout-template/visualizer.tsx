'use client';
import { useEffect, useRef, useState } from 'react';
import { getSortingSteps, StepsResult } from '@/lib/sorting';
type Algo = 'bubble'|'insertion'|'selection'|'merge'|'quick';

interface Props {
  algorithm: Algo;
  initialSize?: number;
}

export default function Visualizer({ algorithm, initialSize = 8 }: Props) {
  const [size, setSize] = useState<number>(initialSize);
  const [valuesInput, setValuesInput] = useState<string>(''); 
  const [array, setArray] = useState<number[]>([]);
  const [snapshots, setSnapshots] = useState<number[][]>([]);
  const [actionsCount, setActionsCount] = useState(0);
  const [step, setStep] = useState(0); // current index in snapshots
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(400); 
  const timerRef = useRef<number | null>(null);
  const [highlight, setHighlight] = useState<number[]>([]);

  useEffect(() => {
    generateRandom();
    // cleanup
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateRandom() {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 10);
    setArray(arr);
    resetSteps(arr);
  }

  function resetSteps(arr: number[] = array) {
    setSnapshots([arr.slice()]);
    setActionsCount(0);
    setStep(0);
    setPlaying(false);
    setHighlight([]);
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
  }

  function applyInputValues() {
    const raw = valuesInput.trim();
    if (!raw) {
      generateRandom();
      return;
    }
    const parsed = raw.split(',').map(s => Number(s.trim())).filter(n => !Number.isNaN(n));
    const arr = parsed.length ? parsed : array;
    setArray(arr);
    setSize(arr.length);
    resetSteps(arr);
  }

  function buildStepsAndStart() {
    // ensure array state is current
    const arr = array.slice(0, size);
    const result: StepsResult = getSortingSteps(algorithm, arr);
    // snapshots[0] is initial; result.snapshots already contains snapshots
    setSnapshots(result.snapshots);
    setActionsCount(result.actions.length);
    setStep(0);
    setHighlight([]);
    // start playing
    setPlaying(true);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setStep(prev => {
        const next = prev + 1;
        if (next >= result.snapshots.length) {
          // end
          if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
          setPlaying(false);
          setHighlight([]);
          return result.snapshots.length - 1;
        }
        // update highlight: try to infer from actions list by comparing snapshots prev & next
        // simpler: when advancing, compare arrays to find changed indices
        const before = result.snapshots[prev];
        const after = result.snapshots[next];
        const changed: number[] = [];
        for (let i = 0; i < after.length; i++) {
          if (before[i] !== after[i]) changed.push(i);
        }
        setHighlight(changed);
        return next;
      });
    }, Math.max(20, speed));
  }

  function pause() {
    setPlaying(false);
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    setHighlight([]);
  }

  function resume() {
    if (snapshots.length <= 1) return;
    setPlaying(true);
    timerRef.current = window.setInterval(() => {
      setStep(prev => {
        const next = prev + 1;
        if (next >= snapshots.length) {
          if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
          setPlaying(false);
          setHighlight([]);
          return snapshots.length - 1;
        }
        // find changes between snapshots[prev] and snapshots[next]
        const before = snapshots[prev];
        const after = snapshots[next];
        const changed: number[] = [];
        for (let i = 0; i < after.length; i++) {
          if (before[i] !== after[i]) changed.push(i);
        }
        setHighlight(changed);
        return next;
      });
    }, Math.max(20, speed));
  }

  function stepForward() {
    if (step < snapshots.length - 1) {
      const next = step + 1;
      const before = snapshots[step];
      const after = snapshots[next];
      const changed: number[] = [];
      for (let i = 0; i < after.length; i++) if (before[i] !== after[i]) changed.push(i);
      setStep(next);
      setHighlight(changed);
    }
  }
  function stepBackward() {
    if (step > 0) {
      const prev = step - 1;
      const before = snapshots[step];
      const after = snapshots[prev];
      const changed: number[] = [];
      for (let i = 0; i < after.length; i++) if (before[i] !== after[i]) changed.push(i);
      setStep(prev);
      setHighlight(changed);
    }
  }

  // derived: bars to render = snapshots[step] or array
  const bars = snapshots[step] ?? array;

  return (
    <div className="space-y-6">
      {/* Input bar */}
      <div className="bg-gray-100 p-4 rounded flex flex-wrap items-center gap-4">
        <div>
          <label className="text-sm block mb-2">Array Size</label>
          <input
            type="number"
            min={2}
            max={60}
            value={size}
            onChange={(e) => setSize(Math.max(2, Math.min(60, Number(e.target.value || 0))))}
            className="border p-1 rounded w-20"
          />
        </div>

        <div className="flex-1 min-w-[260px]">
          <label className="text-sm block mb-2">Array Values <span className="text-gray-400 text-xs">(comma separated, optional)</span></label>
          <input
            type="text"
            placeholder="e.g. 7,3,9,1  (leave empty for random)"
            value={valuesInput}
            onChange={(e) => setValuesInput(e.target.value)}
            className="border p-1 rounded w-full"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 mt-6">
          <button
            className="px-3 py-1 bg-white border rounded"
            onClick={() => { applyInputValues(); }}
          >
            Apply
          </button>
          <button
            className="px-3 py-1 bg-[#471BCC] text-white rounded"
            onClick={() => { buildStepsAndStart(); }}
          >
            Run
          </button>
          <button
            className="px-3 py-1 border rounded"
            onClick={() => { resetSteps(); generateRandom(); }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Bars */}
      <div className="h-48 flex items-end justify-center gap-2">
        <div className="flex items-end gap-2 w-full max-w-2xl justify-center">
          {bars.map((val, idx) => {
            const height = Math.max(8, Math.round((val / Math.max(...bars, 1)) * 150));
            const isHighlighted = highlight.includes(idx);
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  title={`${val}`}
                  style={{ height: `${height}px`, width: '36px' }}
                  className={`transition-all ${isHighlighted ? 'bg-amber-400' : 'bg-gray-400'}`}
                />
                <span className="text-xs text-gray-600 mt-1">{val}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* step controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm">Steps</label>
          <input
            type="number"
            className="border p-1 rounded w-20"
            value={step}
            onChange={(e) => {
              const v = Math.max(0, Math.min((snapshots.length - 1) || 0, Number(e.target.value || 0)));
              setStep(v);
            }}
          />
          <span className="text-sm text-gray-500"> / {snapshots.length - 1 >= 0 ? snapshots.length - 1 : 0}</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded" onClick={stepBackward}>&lt;</button>
          {playing ? (
            <button className="px-3 py-1 border rounded" onClick={pause}>Pause</button>
          ) : (
            <button className="px-3 py-1 border rounded" onClick={resume}>Play</button>
          )}
          <button className="px-3 py-1 border rounded" onClick={stepForward}>&gt;</button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Speed</label>
          <input
            type="range"
            min={50}
            max={1000}
            value={speed}
            onChange={(e) => { setSpeed(Number(e.target.value)); if (playing) { pause(); resume(); } }}
          />
        </div>
      </div>
    </div>
  );
}
