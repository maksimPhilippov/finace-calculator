import { useMemo, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import {
  MoneyActionImpact,
  milisecondsInDay,
} from "../utils/ActiveCalculations";
import Graph from "./Graph";
import DatePicker from "./DatePicker";
import { GraphTypes } from "../types/GraphTypes";
import GraphTypeSelector from "./GraphTypeSelector";

interface DiagramProp {
  actionsList: MoneyAction[];
}
export default function Diagram(prop: DiagramProp) {
  const [startDate, setStartDate] = useState(
    new Date(milisecondsInDay * 365 * 40)
  );
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + milisecondsInDay * 1000)
  );
  const [moneyScale, setMoneyScale] = useState(1000);
  const [timeScale, setTimeScale] = useState(1);
  const [graphType, setGraphType] = useState(GraphTypes.cash);

  const reports = useMemo(() => {
    return prop.actionsList.map((action) =>
      MoneyActionImpact(action, startDate, endDate)
    );
  }, [startDate, endDate, prop.actionsList]);

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
    let value = 0;
    reports.forEach((report) => {
      report.forEach((element, index) => {
        switch (graphType) {
          case GraphTypes.cash:
            value = element[1];
            break;
          case GraphTypes.capital:
            value = element[2];
            break;
          default:
            value = element[1] + element[2];
            break;
        }
        data[index][1] += value;
      });
    });
    return data;
  }

  const graphData = useMemo(() => calculateGraphData(), [reports, graphType]);

  return (
    <div className="diagram">
      <div>
        Start date:
        <DatePicker
          value={startDate}
          setter={(date) => setStartDate(date)}
          enabled={true}
        />
      </div>
      <div>
        End date:
        <DatePicker
          value={endDate}
          setter={(date) => setEndDate(date)}
          enabled={true}
        />
      </div>
      <div>
        Type of graph:
        <GraphTypeSelector currentValue={graphType} setChose={setGraphType} />
      </div>
      <div>
        Scale time axis:
        <input
          type="text"
          value={timeScale}
          className="scaler"
          onChange={(e) => {
            let scale = parseInt(e.target.value);
            if (Number.isNaN(scale)) {
              scale = 1;
            } else if (scale < 1) {
              scale = 1;
            } else if (scale > 10000) {
              scale = 10000;
            }
            setTimeScale(scale);
          }}
        />
      </div>
      <div>
        Scale money axis
        <input
          type="text"
          value={moneyScale}
          className="scaler"
          onChange={(e) => {
            let scale = parseInt(e.target.value);
            if (Number.isNaN(scale)) {
              scale = 1;
            } else if (scale < 1) {
              scale = 1;
            } else if (scale > 10000000) {
              scale = 10000000;
            }
            setMoneyScale(scale);
          }}
        />
      </div>
      <Graph
        startDate={startDate}
        data={graphData}
        xScale={timeScale}
        yScale={moneyScale}
      />
    </div>
  );
}
