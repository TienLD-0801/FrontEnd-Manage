import { MENU_LANGUAGE } from '@/shared/constants/constant';
import { Menu, MenuItem } from '@mui/material';

interface LanguageDropdownProps {
  anchorEl: Element | null;
  open: boolean;
  handleClose: () => void;
  active: string;
  onChooseLanguage: (value: string) => void;
}

const LanguageDropdown = ({
  anchorEl,
  open,
  active,
  handleClose,
  onChooseLanguage,
}: LanguageDropdownProps) => {
  return (
    <Menu
      autoFocus={false}
      className="language-menu"
      anchorEl={anchorEl}
      id="language-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          mt: 2,
          ml: 0,
          p: 0,
          pb: 0,
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          '& .MuiAvatar-root': {
            mr: 4,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            right: 120,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      {MENU_LANGUAGE.map((language) => {
        return (
          <MenuItem
            id={language.value}
            onClick={() => onChooseLanguage(language.value)}
            key={language.id}
            sx={{
              background:
                active === language.value ? 'rgb(237, 231, 246)' : null,
              ':hover': { background: 'rgb(237, 231, 246)' },
              pl: 2,
              pr: 2,
              mb: language.id === '1' ? 1 : 0,
            }}
          >
            {language.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default LanguageDropdown;
