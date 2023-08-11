<script>
 import Calendar from '@event-calendar/core';
 import TimeGrid from '@event-calendar/time-grid';
 import Interaction from '@event-calendar/interaction';
 import List from '@event-calendar/list';

 let plugins = [TimeGrid, List, Interaction];
 let options = {
  view: 'listYear',
  "events": [
    {
      "title": "Dentist Appointment",
      "description": "Regular dental check-up.",
      "location": "123 Dental St, Toothville",
      "start": "2023-09-01T09:00:00Z",
      "end": "2023-09-01T10:00:00Z",
      "allDay": true,
      "recurring": {
        "frequency": "YEARLY",
        "interval": 1,
        "count": 10
      },
      extendedProps: {
        "priority": "high"
      }
    },
    {
      "title": "Birthday Party",
      "description": "John's 30th Birthday Bash!",
      "location": "Party Palace, Fun City",
      "start": "2023-09-10T19:00:00Z",
      "end": "2023-09-11T01:00:00Z",
      "allDay": false
    },
    {
      "title": "Conference",
      "description": "Tech and Innovation 2023",
      "location": "Tech Tower, Silicon Valley",
      "start": "2023-09-20T08:00:00Z",
      "end": "2023-09-22T18:00:00Z",
      "allDay": true
    }

   ]
 };
</script>

<Calendar {plugins} {options} />