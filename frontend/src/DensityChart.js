import * as d3 from "d3"; // we will need d3.js
import { useMemo, useState } from 'react';
import { Legend } from "./Legend";
import './App.css';

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };

function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map(function (x) {
      return [
        x,
        d3.mean(V, function (v) {
          return kernel(x - v);
        }),
      ];
    });
  };
}
function kernelEpanechnikov(k) {
  return function (v) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}

export function Density({width, height, data, round}) {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const [selectedPath, setSelectedPath] = useState(null);
  const COLORS = [d3.schemeBlues[3], d3.schemeGreens[3], d3.schemePurples[3]]

  const allGroupNames = data ? Object.keys(data) : [];


  const colorScale = d3
    .scaleOrdinal()
    .domain(allGroupNames)
    .range(COLORS);

  const xScale = useMemo(() => {
    const max = 0;
    const min = 100;
    const range = max - min;
    return d3
      .scaleLinear()
      .domain([min - range * 0.2, max + range * 0.2]) // Add 20%: smoothing ends up out of the data bounds when drawing
      .range([10, boundsWidth])
  }, [data, width]);

  // Function that computes a kernel density based on an array of number
  const densityGenerator = kernelDensityEstimator(
    kernelEpanechnikov(2),
    xScale.ticks(40)
  );

  // Compute densities for all groups before drawing.
  // We need all densities to be able to know the max of the Y axis
  const densityData = Object.entries(data).map((group, i) => {
    return Object.entries(group[1]).map((g2, i) => {
      const density = densityGenerator(g2[1]);
      let num_bombs = 0
      for (let c in g2[0]) {
        num_bombs = num_bombs + parseInt(c)
      }
      return {
        name: group[0],
        num_bombs: g2[0],
        density,
      };
    })
  }).flat();

  const allYMax = densityData.map((group) =>
    Math.max(...group.density.map((d) => d[1]))
  );
  const yMax = Math.max(...allYMax);

  const yScale = useMemo(() => {
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, yMax]);
  }, [data, height]);

  const pathGenerator = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
    .curve(d3.curveBasis);

  const allShapes = densityData.map((group, i) => {
    const path = pathGenerator(group.density);
    return (
      <path
        key={i}
        d={path?path:undefined}
        fill="white"
        opacity={(selectedPath == i ? 1 : 0.4)}
        stroke={colorScale(group.name)[parseInt(group.num_bombs) + 1]}
        strokeWidth={selectedPath == i ? 4 : 2}
        strokeLinejoin="round"
        onMouseEnter={() => { setSelectedPath(i) }}
        onMouseLeave={() => { setSelectedPath(null) }}
      />
    );
  });
  // @ts-ignore
  return (
    <div className="graph">
      <div className="legend">
        <Legend
          title='Human'
          colorScale={d3.scaleOrdinal().domain(d3.range(round).map(String)).range(COLORS[0])} />
        <Legend
          title='ChatGPT-4'
          colorScale={d3.scaleOrdinal().domain(d3.range(round).map(String)).range(COLORS[1])} />
        <Legend
          title='ChatGPt-3'
          colorScale={d3.scaleOrdinal().domain(d3.range(round)).range(COLORS[2])} />
      </div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top]})`}
        >
          {allShapes}
        </g>
      </svg>
      {/* {selectedPath ? densityData[selectedPath].name : ""} */}
    </div>
  );
};