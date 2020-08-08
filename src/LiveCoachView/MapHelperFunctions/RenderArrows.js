import React, { Component } from 'react'
import { Arrow } from 'react-konva';
import Konva from 'konva';


export default function RenderArrows(arrowPoints) {
  let arrowArray = []
  arrowPoints.map((arrow, i) => {
    const startpoint = arrow[0]
    const endpoint = arrow[1]
    arrowArray.push(
      <Arrow
        key={i}
        points={[startpoint[0], startpoint[1], endpoint[0], endpoint[1]]}
        fill={'red'}
        stroke={'red'}
      />
    )

  })
  return arrowArray;
}
