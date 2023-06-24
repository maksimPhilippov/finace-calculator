import React, { useEffect, useRef } from "react";
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
  // console.log()
  console.log("prop.data ", prop.data);

  const graphPoints: [x: number, y: number][] = prop.data.map(
    ([date, value]) => [
      (date.getTime() - prop.startDate.getTime()) / milisecondsInDay,
      value,
    ]
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
          50,
          50,
          [width * 0.15, height * 0.9],
          graphPoints
        );
      }
    }
  }, [graphPoints]);
  console.log("graphpoints", graphPoints);
  return (
    <div>
      <canvas ref={canvas} className="graph"></canvas>
    </div>
  );
}
