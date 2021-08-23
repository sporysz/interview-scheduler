import { useState } from "react";
import { Calendar, Views, SlotInfo, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import pl from 'date-fns/locale/pl';
import EVENTS from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {  createStyles, Theme,makeStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InterviewAppBar from './interviewAppBar'



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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);



  const dateChanged = (event: any) => {
    setCurrentDate(event.value);
  }


  const handleEventSelect = (event: any) => {
    setIdToDelete(event.id);
    handleClickOpen();
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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setEvents(events.filter(e => idToDelete !== (e as any).id));
    handleClose();
  }
  return (

    <div className={classes.whole}>
      <InterviewAppBar/>
      <Calendar
        selectable
        culture="pl"
        localizer={dfslocalizer}
        events={events}
        step={30}
        min={ new Date(0, 0, 0, 6, 0, 0, 0)}
        max={ new Date(0, 0, 0, 21, 30, 0, 0)}
        showMultiDayTimes={false}
        defaultView={Views.WEEK}
        defaultDate={new Date()}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSlotSelect}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        messages={plMsg}
      />
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"   onClose={handleClose} >
          usunąć zdażnie
          </DialogTitle>
        <DialogContent dividers>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            tak
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            nie
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export default App;
