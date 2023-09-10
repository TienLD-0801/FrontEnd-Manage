import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';

interface DialogUserProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onClickSave: () => void;
  children: React.ReactNode;
}

const DialogForm = ({
  open,
  title,
  children,
  onClose,
  onClickSave,
}: DialogUserProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle textAlign={'center'} fontSize={30} fontWeight={600}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClickSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
