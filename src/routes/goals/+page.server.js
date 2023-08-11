/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, params}) {
 try {
  const URL = `https://lifeplanningassistant.javafxpert.repl.co/fetch_goals_summary`;
  const res = await fetch(URL);
  const goals = await res.json();
   return { goals };
 }
 catch (error) {
  console.error(error);
  return { goals: [] };
 }
}