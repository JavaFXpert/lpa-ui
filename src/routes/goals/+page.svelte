<script>
 import Calendar from '@event-calendar/core';
 import TimeGrid from '@event-calendar/time-grid';
 import Interaction from '@event-calendar/interaction';
 import List from '@event-calendar/list';

 export let data;
 //console.log(data, 'goals');
 console.log(data.goals.length, 'data.goals.length');

 let events = [];
 // iterate over data using a for loop
 for (let i = 0; i < data.goals.length; i++) {
  console.log(data.goals[i], 'data.goals[i]');
  events.push(goal2calendarEvent(data.goals[i]));
 }
 
 console.log(events, 'events');


 let plugins = [TimeGrid, List, Interaction];
 let options = {
  view: 'listYear',
  "events": events
 };

 function goal2calendarEvent(goal) {
  return {
    title: goal.goal_name,
    start: goal.timeframe_date,
    end: goal.timeframe_date,
    allDay: true,
    backgroundColor: goal.priority == 'high_priority' ? 'red' : 'green',
    borderColor: goal.status == 'completed' ? 'black' : 'blue',
    textColor: 'white'
  }
 }  
</script>

<Calendar {plugins} {options} />