



export default async function makeFetchRequest(path, fetchMethod, fetchBody) {

  const base = "https://lca.devlabs-projects.info/"
  const endpoint = base.concat(path);


  let response = ''

  if(fetchBody !== '') {
    response = await fetch(
      endpoint, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchBody),
      }
    )
  }
  else {
    response = await fetch(
      endpoint, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const jsonResponse = await response.json();
  return jsonResponse;
}
