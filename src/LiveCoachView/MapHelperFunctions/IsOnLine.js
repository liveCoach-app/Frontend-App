import Distance from './Distance.js'


export default function IsOnLine (startpoint, endpoint, aPoint, slope) {

  //uses line formula to calculate top and bottom range with a buffer distance of 25
  const topRange = slope * (aPoint[0] - startpoint[0]) + startpoint[1] + 25;
  const bottomRange = slope * (aPoint[0] - startpoint[0]) + startpoint[1] - 25;

  //calculates the distance from one point to the other
  const lineDistance = Distance(startpoint, endpoint)


  if( aPoint[1] < topRange && aPoint[1] > bottomRange) {
    // The formula above will erase points that are not in between each line, this
    // checks to make sure the line is within the two points boundaries.
    if(Distance(startpoint, aPoint) < lineDistance && Distance(endpoint,aPoint) < lineDistance) {
      return true;
    }
  }
  return false;
}
