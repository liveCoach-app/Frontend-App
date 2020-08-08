export default function Distance (start, end) {
  const startsqrt = (end[0] - start[0]) * (end[0] - start[0]);
  const endsqrt = (end[1] - start[1]) * (end[1] - start[1]);
  const distance = Math.sqrt(startsqrt + endsqrt);
  return distance;
}
