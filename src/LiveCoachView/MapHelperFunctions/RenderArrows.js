import React from 'react'
import { Arrow } from 'react-konva';


export default function RenderArrows(arrowPoints) {
  return arrowPoints.map((line, i) => {
    const startpoint = line.startpoint
    const endpoint = line.endpoint
    return(
      <Arrow
        key={i}
        id={i + 'a'}
        points={[startpoint.x, startpoint.y, endpoint.x, endpoint.y]}
        fill={'red'}
        stroke={'red'}
      />
    );
  });
}
