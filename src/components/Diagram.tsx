import { useCallback, useMemo, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import {
  MoneyActionImpact,
  milisecondsInDay,
} from "../utils/ActiveCalculations";
import Graph from "./Graph";

interface DiagramProp {
  actionsList: MoneyAction[];
}
export default function Diagram(prop: DiagramProp) {
  console.log("diagram rerender");
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date(24 * 60 * 60 * 1000 * 1000));

  const reports = prop.actionsList.map((action) =>
    MoneyActionImpact(action, startDate, endDate)
  );

  function initGraphData() {
    let result: [date: Date, value: number][] = [];
    for (
      let day = new Date(startDate);
      day.getTime() < endDate.getTime();
      day.setTime(day.getTime() + milisecondsInDay)
    ) {
      result.push([new Date(day), 0]);
    }
    return result;
  }

  function calculateGraphData() {
    const data: [date: Date, value: number][] = initGraphData();
    reports.forEach((report) => {
      report.forEach((element, index) => {
        data[index][1] += element[1];
      });
    });
    return data;
  }

  const graphData = calculateGraphData();

  return (
    <div className="diagram">
      <Graph data={graphData} xScale={1} yScale={1000} />
    </div>
  );
}
