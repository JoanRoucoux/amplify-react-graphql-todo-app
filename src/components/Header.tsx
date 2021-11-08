import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

const Header: React.FC = () => (
  <AppBar
    position="absolute"
    elevation={0}
    sx={{
      position: 'relative',
      borderBottom: (t) => `1px solid ${t.palette.divider}`,
    }}
  >
    <Toolbar>
      <Typography
        variant="h3"
        color="inherit"
        noWrap
      >
        Amplify React GraphQL Todo Application
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
