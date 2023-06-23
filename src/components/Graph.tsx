import React, { useEffect, useRef } from "react";
import { milisecondsInDay } from "../utils/ActiveCalculations";
import { drawGraph } from "../utils/graphDrawing";

interface GraphProp {
  data: [date: Date, value: number][];
  xScale: number;
  yScale: number;
}
export default function Graph(prop: GraphProp) {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const graphPoints: [x: number, y: number][] = prop.data.map(
    ([date, value]) => [date.getTime() / milisecondsInDay, value]
  );

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
          30,
          20,
          [width * 0.1, height * 0.9],
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
