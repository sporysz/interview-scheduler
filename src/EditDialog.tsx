import React from 'react';
import { withStyles ,WithStyles, Theme, createStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,

    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      left: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    deleteButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.secondary.light,

    },
    title: {
      marginLeft: theme.spacing(4),
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  onDelete: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, onDelete, ...other } = props;
  return (
    <MuiDialogTitle  className={classes.root} {...other}>
            {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6" className={classes.title}>{children}</Typography>
      {onDelete ? (
        <IconButton aria-label="delete" className={classes.deleteButton} onClick={onDelete}>
          <Delete/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


export interface EditDialogProps  {
  onDelete: () => void;
  open: boolean;
  setOpen:(open: boolean) => void;
  title: string;
  addEmail:(email: string) => void;
}

export default function EditDialog(props: EditDialogProps)  {
  const {title, onDelete,open, setOpen, ...other } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

 

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" onClose={handleClose} onDelete={handleDelete} >
      title
    </DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>
        Czy usunąć zdarzenie?
      </Typography>
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
  );
};
