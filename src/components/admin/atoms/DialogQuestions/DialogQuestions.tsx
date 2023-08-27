import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface DialogQuestionProps {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
  handleAgree: () => void;
}

const DialogQuestions = ({
  title,
  content,
  open,
  handleClose,
  handleAgree,
}: DialogQuestionProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" textAlign={'center'}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAgree}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogQuestions;
