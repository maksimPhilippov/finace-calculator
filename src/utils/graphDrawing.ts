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
  function drawLabel(text: string, x: number, y: number) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText(text, x, y);
  }
  function clear(clearColor: string) {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
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
    const labelsXShift = 35;
    const labelsYSHift = 12;
    drawVerticalAxis(origin[0], 2);

    drawHorizontalAxis(origin[1], 2);
    for (let i = origin[0] + gridStepX; i < canvasWidth; i += gridStepX) {
      drawVerticalAxis(i, 1);
      drawLabel(String((i - origin[0]) * unitX), i, origin[1] + labelsYSHift);
    }
    for (let i = origin[1]; i > 0; i -= gridStepY) {
      drawHorizontalAxis(i, 1);
      drawLabel(String(-(i - origin[1]) * unitY), origin[0] - labelsXShift, i);
    }
  }

  function infoToGraph([x, y]: Point) {
    return [origin[0] + x / unitX, origin[1] + -y / unitY];
  }

  function drawGraphLine() {
    if (points.length > 1) {
      let scaled = points.map(infoToGraph);

      ctx.beginPath();
      ctx.moveTo(scaled[0][0], scaled[0][1]);

      for (let i = 0; i < scaled.length; i++) {
        ctx.lineTo(scaled[i][0], scaled[i][1]);
      }
      ctx.strokeStyle = "rgb(0, 100, 0)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  clear("rgb(255, 255, 255)");
  drawGrid();
  drawGraphLine();
}
