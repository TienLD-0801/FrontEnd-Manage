import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onClickSave: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const DialogForm = ({
  open,
  title,
  children,
  onClose,
  onClickSave,
  fullWidth = true,
}: DialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} fullWidth={fullWidth}>
      <DialogTitle textAlign={'center'} fontSize={30} fontWeight={600}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('dialog.button.cancel')}</Button>
        <Button onClick={onClickSave}>{t('dialog.button.save')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
