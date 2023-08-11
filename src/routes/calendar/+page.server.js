/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, params}) {
 try {
  const URL = `https://lifeplanningassistant.javafxpert.repl.co/fetch_calendar_summary`;
  const res = await fetch(URL);
  const lpaEvents = await res.json();
   return { lpaEvents };
 }
 catch (error) {
  console.error(error);
  return { lpaEvents: [] };
 }
}
