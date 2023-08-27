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
  oncClickSave: () => void;
  children: React.ReactNode;
}

const DialogUser = ({
  open,
  title,
  children,
  onClose,
  oncClickSave,
}: DialogUserProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle textAlign={'center'} fontSize={30} fontWeight={600}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={oncClickSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogUser;
