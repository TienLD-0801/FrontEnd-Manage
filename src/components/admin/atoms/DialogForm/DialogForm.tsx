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
  onClickSave?: () => void;
  children?: React.ReactNode;
  fullWidth?: boolean;
  colorTitle?: string;
  fontWeight?: number;
  type?: 'default' | 'warning';
  classNameDialog?: string;
}

const DialogForm = ({
  colorTitle,
  open,
  title,
  children,
  onClose,
  onClickSave,
  fontWeight = 600,
  fullWidth = true,
  type = 'default',
  classNameDialog,
}: DialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} fullWidth={fullWidth} className={classNameDialog}>
      <DialogTitle
        textAlign={'center'}
        color={colorTitle}
        fontSize={30}
        fontWeight={fontWeight}
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {type === 'default' ? (
          <>
            <Button onClick={onClose}>{t('dialog.button.cancel')}</Button>
            <Button onClick={onClickSave}>{t('dialog.button.save')}</Button>
          </>
        ) : (
          <Button onClick={onClose}>{t('dialog.button.close')}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
