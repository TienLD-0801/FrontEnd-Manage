import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <Dialog open={open}>
      <DialogTitle textAlign={'center'} fontSize={30} fontWeight={600}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('form.button.cancel')}</Button>
        <Button onClick={onClickSave}>{t('form.button.save')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
