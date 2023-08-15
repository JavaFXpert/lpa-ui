<script>
 import Calendar from '@event-calendar/core';
 import TimeGrid from '@event-calendar/time-grid';
 import Interaction from '@event-calendar/interaction';
 import List from '@event-calendar/list';

 export let data;
 //console.log(data, 'goals');
 console.log(data.goals.length, 'data.goals.length');
 console.log(data.tasks.length, 'data.tasks.length');

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
  priority: 'medium priority',
  status: 'not started'
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
  console.log(tasks, 'tasks');
  // Create a line for each task
  let tasksString = '';
  for (let i = 0; i < tasks.length; i++) {
   let b_or_p = tasks[i].for_business ? 'business' : 'personal';
   tasksString += '\n• ' + tasks[i].task_name + ', ' + b_or_p  + ', ' + tasks[i].task_hrs_float + ' hrs, ' + tasks[i].priority + ', ' + tasks[i].status;
  }

  let goal_display_date = goal.timeframe_date
  if (goal.priority == 'ongoing priority' || goal.priority == 'someday priority') {
    goal_display_date = todayStr
  }
  return {
    title: goal.goal_name + ", " + goal.priority + ", " + goal.status + ", " + tasksString,
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