import { Logout, Settings, AccountCircleOutlined } from '@mui/icons-material';
import { Divider, Menu, MenuItem, Typography } from '@mui/material';

interface ProfileDropdownProps {
  anchorEl: Element | null;
  open: boolean;
  handleClose: () => void;
  name: string;
  email: string;
  onClickLogout: () => void;
}

const ProfileDropdown = ({
  anchorEl,
  open,
  handleClose,
  name,
  email,
  onClickLogout,
}: ProfileDropdownProps) => {
  return (
    <Menu
      autoFocus={false}
      className="profile-menu"
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          mt: 1,
          ml: 0,
          p: 2,
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
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      {/* Map data later */}
      <MenuItem
        disableRipple
        sx={{ p: 0, pb: 1, ':hover': { background: '#FFFFFF' } }}
      >
        <Typography
          variant="inherit"
          textOverflow={'ellipsis'}
          color={'black'}
          fontWeight={600}
        >
          {name}
        </Typography>
      </MenuItem>
      <MenuItem
        disableRipple
        sx={{ p: 0, pb: 1, ':hover': { background: '#FFFFFF' } }}
      >
        <Typography variant="inherit" textOverflow={'ellipsis'}>
          {email}
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{
          p: 0,
          mb: 2,
          mt: 2,
        }}
      >
        <AccountCircleOutlined sx={{ fontSize: 40, mr: 2 }} />
        Profile
      </MenuItem>
      <MenuItem sx={{ p: 0, mb: 2, mt: 2 }}>
        <Settings sx={{ fontSize: 40, mr: 2 }} /> Settings
      </MenuItem>
      <MenuItem sx={{ p: 0, mb: 2 }} onClick={onClickLogout}>
        <Logout sx={{ fontSize: 40, mr: 2 }} />
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;
