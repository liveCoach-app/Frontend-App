import React, { Component } from 'react'
import { Circle } from 'react-konva';
import Konva from 'konva';
import Distance from './Distance.js'

export default function RenderCircles(circlePoints) {
  let circleArray = []
  circlePoints.map((circle, i) => {
    const midpoint = circle[0]
    const endpoint = circle[1]
    const distance = Distance(endpoint, midpoint)
    circleArray.push(
      <Circle
        key={i}
        x={midpoint[0]}
        y={midpoint[1]}
        width={distance * 2}
        height={distance * 2}
        stroke={'blue'}
      />
    )
  })
  return circleArray;
}
