/** @type {import('./$types').PageServerLoad} */
export async function load({fetch, params}) {
 try {
  const MISSION_URL = `
  https://lifeplanningassistant.javafxpert.repl.co/fetch_personal_mission_statement`;
  const res_mission = await fetch(MISSION_URL);
  const mission = await res_mission.json();

  const VISION_URL = `
  https://lifeplanningassistant.javafxpert.repl.co/fetch_personal_vision_statement`;
  const res_vision = await fetch(VISION_URL);
  const vision = await res_vision.json();

  const SWOT_URL = `
  https://lifeplanningassistant.javafxpert.repl.co/fetch_personal_swot_analysis`;
  const res_swot = await fetch(SWOT_URL);
  const swot = await res_swot.json();

  const GOALS_URL = `
  https://lifeplanningassistant.javafxpert.repl.co/fetch_goals_summary`;
  const res_goals = await fetch(GOALS_URL);
  const goals = await res_goals.json();

  const TASKS_URL = `
  https://lifeplanningassistant.javafxpert.repl.co/fetch_tasks_summary`;
  const res_tasks = await fetch(TASKS_URL);
  const tasks = await res_tasks.json();

   return { mission, vision, swot, goals, tasks };
 }
 catch (error) {
  console.error(error);
  return { mission: "", vision: "", swot: "", goals: [], tasks: [] };
 }
}
