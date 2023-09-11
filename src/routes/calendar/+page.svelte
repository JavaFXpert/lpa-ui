<script>
 import Calendar from '@event-calendar/core';
 import TimeGrid from '@event-calendar/time-grid';
 import Interaction from '@event-calendar/interaction';
 import List from '@event-calendar/list';

 export let data;
 console.log(data, 'lpaEvents');
 console.log(data.lpaEvents.length, 'data.lpaEvents.length');

 let events = [];
 // iterate over data using a for loop
 for (let i = 0; i < data.lpaEvents.length; i++) {
  console.log(data.lpaEvents[i], 'data.lpaEvents[i]');
  events.push(lpaEvent2calendarEvent(data.lpaEvents[i]));
 }
 
 console.log(events, 'events');


 let plugins = [TimeGrid, List, Interaction];
 let options = {
  buttonText: {close: 'Close', dayGridMonth: 'month', listDay: 'list', listMonth: 'month', listWeek: 'list', listYear: 'list', resourceTimeGridDay: 'day', resourceTimeGridWeek: 'week', timeGridDay: 'day', timeGridWeek: 'week', today: 'today'},
  headerToolbar: {start: 'title', center: 'timeGridDay, timeGridWeek, listMonth', end: 'today prev,next'},
  view: 'listMonth',
  "events": events,
  slotMinTime: '07:00:00',
  slotMaxTime: '21:00:00',
  slotDuration: '00:15:00',
  slotEventOverlap: false,
};

 function lpaEvent2calendarEvent(lpaEvent) {
  let startDateTime = createDateFromString(lpaEvent.timestamp);
  console.log(startDateTime, 'startDateTime');

  // Add event duration to the startDateTime
  // First, create a number from the duration as a string
  let durationNumber = Number(lpaEvent.duration_hrs);

  // get the hour and minute from the timestamp into two separate variables
  let [hour, minute] = lpaEvent.timestamp.split(' ')[1].split(':').map(Number);

  // add the integer portion of duration_number to the hour and minute
  hour += Math.floor(durationNumber);

  // add the decimal portion of duration_number to the minute
  minute += durationNumber % 1 * 60;

  // Reassemble the timestamp
  let endTimestamp = lpaEvent.timestamp.split(' ')[0] + ' ' + hour + ':' + minute + ':00';

  console.log(endTimestamp, 'endTimestamp');

  let waiting = lpaEvent.event_or_task == 'task' && 
    lpaEvent.status && 
    lpaEvent.status.toLowerCase() == 'waiting';
  
  let bgColor = mixColor(lpaEvent.business_or_personal, lpaEvent.event_or_task, waiting);

  return {
    title: lpaEvent.name,
    start: lpaEvent.timestamp,
    end: endTimestamp,
    allDay: false,
    backgroundColor: bgColor,
    textColor: 'white'
  }
 }  

 function mixColor(business_or_personal, event_or_task, waiting) {
  // We want business events to be black and personal events to be blue
  // We want tasks to be lighter shades of the same colors
  // If the status for business task is 'waiting', then we want it to be light orange.
  // If the status for personal task is 'waiting', then we want it to be yellow.
  if (business_or_personal.toLowerCase() == 'business') {
   return event_or_task.toLowerCase() == 'event' ? 'black' : waiting ? 'lightgray' : 'gray';
  }
  else {
   return event_or_task.toLowerCase() == 'event' ? 'darkblue' : waiting ? 'lightblue' :  'blue';
  }

  let color = event_or_task == 'event' ? 'black' : 'blue';
  if (business_or_personal == 'business') {
   color = event_or_task == 'event' ? 'black' : 'red';
  }
  return color;
 }

 function createDateFromString(dateStr) {
    // Split the string into date and time components
    const [datePart, timePart] = dateStr.split(' ');

    // Extract the year, month, and day from the date part
    const [year, month, day] = datePart.split('-').map(Number);

    // Extract the hour, minute, and second from the time part
    const [hour, minute, second] = timePart.split(':').map(Number);

    // Create and return a new Date object
    // Note: In JavaScript, the month is 0-indexed, so we subtract 1 from the month
    return new Date(year, month - 1, day, hour, minute, second);
 }
</script>

<Calendar {plugins} {options} />