import { Point } from "../types/Potint";

export function drawGraph(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  unitX: number,
  unitY: number,
  gridStepX: number,
  gridStepY: number,
  origin: Point,
  points: Point[]
) {
  function drawLabel(text: string, x: number, y: number) {}
  function drawHorizontalAxis(y: number, width: number) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function drawVerticalAxis(x: number, width: number) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function drawGrid() {
    drawVerticalAxis(origin[0], 3);
    drawHorizontalAxis(origin[1], 3);
    for (let i = origin[0]; i < canvasWidth; i += gridStepX) {
      drawVerticalAxis(i, 1);
      drawLabel(String(i * unitX), i, origin[1]);
    }
    for (let i = origin[1]; i > 0; i -= gridStepY) {
      drawHorizontalAxis(i, 1);
      drawLabel(String(i * unitY), origin[0], i);
    }
  }

  function drawGraphLine() {
    if (points.length > 1) {
      let scaled = points.map(([x, y]: Point) => [
        origin[0] + x / unitX,
        origin[1] + -y / unitY,
      ]);

      // let moves: Point[] = [];
      // for (let i = 1; i < scaled.length; i++) {
      //   moves.push([
      //     scaled[i][0] - scaled[i - 1][0],
      //     scaled[i][1] - scaled[i - 1][1],
      //   ]);
      // }
      // console.log(points);
      ctx.beginPath();
      ctx.moveTo(scaled[0][0], scaled[0][1]);

      for (let i = 0; i < scaled.length; i++) {
        ctx.lineTo(scaled[i][0], scaled[i][1]);
      }
      ctx.strokeStyle = "rgb(0, 0, 150)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  drawGrid();
  drawGraphLine();
}
