export default function Distance (start, end) {
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  return distance;
}
