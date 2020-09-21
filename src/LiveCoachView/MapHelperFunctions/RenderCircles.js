import React from 'react'
import { Circle } from 'react-konva';
import Distance from './Distance.js'

export default function RenderCircles(circlePoints) {
  return circlePoints.map((line, i) => {
    const midpoint = line.startpoint;
    const endpoint = line.endpoint;
    const distance = Distance(endpoint, midpoint);
    return (
      <Circle
        key={i}
        id={i}
        type={'circle'}
        x={midpoint.x}
        y={midpoint.y}
        width={distance * 2}
        height={distance * 2}
        stroke={'blue'}
        fill={'blue'}
        opacity={0.4}
      />
    );
  })
}
