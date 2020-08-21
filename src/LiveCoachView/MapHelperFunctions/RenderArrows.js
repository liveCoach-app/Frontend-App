import React from 'react'
import { Arrow } from 'react-konva';



/*
  Here we use the start and endpoint values to draw an arrow going through these two points
*/
export default function RenderArrows(arrowPoints) {

  return arrowPoints.map((line, i) => {
    const startpoint = line.startpoint
    const endpoint = line.endpoint

    return(
      <Arrow
        key={i}
        id={i}
        type={'arrow'}
        points={[startpoint.x, startpoint.y, endpoint.x, endpoint.y]}
        fill={'red'}
        stroke={'red'}
      />
    );
  });
}
