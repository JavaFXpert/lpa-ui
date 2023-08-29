/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, params}) {
 try {
  const URL = `
  https://life-planning-assistant-javafxpert.replit.app/fetch_goals_summary`;
  const res = await fetch(URL);
  const goals = await res.json();

  const TASKS_URL = `
  https://life-planning-assistant-javafxpert.replit.app/fetch_tasks_summary`;
  const res_tasks = await fetch(TASKS_URL);
  const tasks = await res_tasks.json();

   return { goals, tasks };
 }
 catch (error) {
  console.error(error);
  return { goals: [], tasks: [] };
 }
}
