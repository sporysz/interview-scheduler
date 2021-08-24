import { useState } from "react";
import { Calendar, Views, SlotInfo, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import pl from 'date-fns/locale/pl';
import EVENTS from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import InterviewAppBar from './interviewAppBar'
import EditDialog from "./EditDialog";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: 200,
    },
    whole: {
      height: 800,
    },
  }),
);

let defaultMessages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'All Day',
  week: 'Week',
  work_week: 'Work Week',
  day: 'Day',
  month: 'Month',
  previous: 'Back',
  next: 'Next',
  yesterday: 'Yesterday',
  tomorrow: 'Tomorrow',
  today: 'Today',
  agenda: 'Agenda',

  noEventsInRange: 'nie ma zdarzeń w tym zakresie',

  showMore: (total: any): string => `+${total || ""} więcej`,
}

const plMsg = { ...defaultMessages, today: "dziś", previous: "poprzedni", next: "następny", week: "tydzień", month: "miesiąc", day: "dzień", allDay: '' };

const locales = {
  'pl': pl
};

const dfslocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});




function App() {

  const classes = useStyles();

  const [events, setEvents] = useState(EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<any>(new Object());
  const [openEdit, setOpenEdit] = useState<boolean>(false);



  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
    setOpenEdit(true);
  }


  const handleSlotSelect = (event: SlotInfo) => {
    const title = window.prompt('New Event name') || " ";
    if (title) { }
    setEvents([
      ...events,
      {
        start: event.start as Date,
        end: event.end as Date,
        title: title,
        id: Math.random(),
      },
    ]);
  }

  const addEmailToSelectedEvent = (email: string) => {
   setSelectedEvent({...selectedEvent,email: email});
  }


 const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
      //  borderRadius: '6px',
      //  opacity: 18,
      //  color: 'black',
      //  border: '2px',
     //   display: 'block'
    };
    if (event.email != null) {
      style.backgroundColor = 'lightgrey';
    }
    return {
        style: style
    };
};

  const handleDelete = () => {

    setEvents(events.filter(e => selectedEvent !== null && selectedEvent.id !== (e as any).id));

  }
  return (

    <div className={classes.whole}>
      <InterviewAppBar />
      <Calendar
        selectable
        culture="pl"
        localizer={dfslocalizer}
        events={events}
        step={30}
        min={new Date(0, 0, 0, 6, 0, 0, 0)}
        max={new Date(0, 0, 0, 21, 30, 0, 0)}
        showMultiDayTimes={false}
        defaultView={Views.WEEK}
        defaultDate={new Date()}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSlotSelect}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        messages={plMsg}
        eventPropGetter={(eventStyleGetter)}
      />
   <EditDialog onDelete={handleDelete} open={openEdit} title={selectedEvent.title} addEmail={addEmailToSelectedEvent} setOpen={setOpenEdit} />
    </div>
  );
}

export default App;
