import React, { useEffect, useRef, useState } from "react";
import { milisecondsInDay } from "../utils/ActiveCalculations";
import { drawGraph } from "../utils/graphDrawing";

interface GraphProp {
  data: [date: Date, value: number][];
  xScale: number;
  yScale: number;
  startDate: Date;
}
export default function Graph(prop: GraphProp) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  // const [size, setSize] = useState<[x: number, y: number]>([0, 0]);

  const graphPoints: [x: number, y: number][] = prop.data.map(
    ([date, value]) => [
      (date.getTime() - prop.startDate.getTime()) / milisecondsInDay,
      value,
    ]
  );

  useEffect(() => {
    const diagram = canvas.current?.parentElement;

    if (diagram !== null && diagram !== undefined) {
      const base = diagram.offsetWidth * 0.9;

      // setSize([base, base / 2]);

      if (canvas.current !== null) {
        canvas.current.width = Math.round(base);
        canvas.current.height = Math.round(base / 2);
      }
    }
  }, []);

  useEffect(() => {
    if (canvas.current !== null) {
      const ctx = canvas.current.getContext("2d");
      const width = canvas.current.offsetWidth;
      const height = canvas.current.offsetHeight;
      if (ctx !== null) {
        drawGraph(
          ctx,
          width,
          height,
          prop.xScale,
          prop.yScale,
          50,
          50,
          [Math.round(width * 0.15), Math.round(height * 0.9)],
          graphPoints
        );
      }
    }
  }, [graphPoints]);
  return (
    <div>
      <canvas ref={canvas} className="graph"></canvas>
    </div>
  );
}
