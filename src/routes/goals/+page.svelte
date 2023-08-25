<script>
 import Calendar from '@event-calendar/core';
 import TimeGrid from '@event-calendar/time-grid';
 import Interaction from '@event-calendar/interaction';
 import List from '@event-calendar/list';

 export let data;
 //console.log(data, 'goals');
 console.log(data.goals.length, 'data.goals.length');
 console.log(data.tasks.length, 'data.tasks.length');

 let SHOW_URGENCY_FACTOR = true;
 let SHOW_COMPLETED_TASKS = false;

 let events = [];
 // iterate over data using a for loop
 for (let i = 0; i < data.goals.length; i++) {
  console.log(data.goals[i], 'data.goals[i]');
  events.push(goal2calendarEvent(data.goals[i]));
 }
 for (let i = 0; i < data.tasks.length; i++) {
  console.log(data.tasks[i], 'data.tasks[i]');
  //events.push(goal2calendarEvent(data.goals[i]));
 }
 
 // Add the Inbox
let today = new Date();
let todayStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let inbox = {
  id: null,
  goal_name: 'Inbox',
  timeframe_date: todayStr,
  priority: '',
  status: '',
  urgency_factor: 0.0
 }
 events.push(goal2calendarEvent(inbox));

 console.log(events, 'events');


 let plugins = [TimeGrid, List, Interaction];
 let options = {
  view: 'listYear',
  "events": events,
  slotMinTime: '06:00:00',
 };

 function goal2calendarEvent(goal, todayStr) {
  // Find the tasks associated with the goal
  let tasks = data.tasks.filter(task => task.goal_id == goal.id);
  if (!SHOW_COMPLETED_TASKS) {
   tasks = tasks.filter(task => task.status.toLowerCase() != 'completed');
  }
  // Sort the tasks by priority, where high_priority is first, then medium_priority, then low_priority
  tasks.sort((a, b) => {
   if (a.priority.startsWith('high') && !b.priority.startsWith('high')) {
    return -1;
   } else if (a.priority.startsWith('medium') && b.priority.startsWith('low')) {
    return -1;
   } else if (a.priority.startsWith('low') && b.priority.startsWith('medium')) {
    return 1;
   } else {
    return 0;
   }
  });
  console.log(tasks, 'tasks');
  // Create a line for each task
  let tasksString = '';
  for (let i = 0; i < tasks.length; i++) {
   let b_or_p = tasks[i].for_business ? 'business' : 'personal';
   tasksString += '\n• ' + tasks[i].task_name + ', ' + b_or_p  + ', ' + tasks[i].task_hrs_float + ' hrs, ' + tasks[i].priority + ', ' + tasks[i].status;
  }

  let goal_display_date = goal.timeframe_date;
  let goal_status_str = ", " + goal.status;
  let urgency_factor_str = SHOW_URGENCY_FACTOR ? ", urg: " + goal.urgency_factor.toFixed(2) : '';
  let proj_compl_str = ", projected completion: " + goal.projected_completion;
  let float_days_str = ", float: " + goal.num_float_days + " days";
  if (goal.priority == 'ongoing priority' || goal.priority == 'someday priority') {
    goal_display_date = todayStr;
    goal_status_str = '';
    proj_compl_str = '';
    float_days_str = '';
  }

  let goal_header = goal.goal_name + ", " + goal.priority + goal_status_str + urgency_factor_str + proj_compl_str  + float_days_str;
  if (goal.goal_name == 'Inbox') {
    goal_header = 'Inbox:';
  }
  return {
    title: goal_header + tasksString,
    start: goal_display_date,
    end: goal_display_date,
    allDay: true,
    backgroundColor: goal.priority == 'high_priority' ? 'red' : 'green',
    borderColor: goal.status == 'completed' ? 'black' : 'blue',
    textColor: 'white'
  }
 }  
</script>

<Calendar {plugins} {options} />