



export default async function makeFetchRequest(endpoint, fetchMethod) {
  const response = await fetch(endpoint, {
    method: fetchMethod,
  })
  const jsonResponse = await response.json();
  return jsonResponse;
}
