import React from 'react';
import { Auth } from 'aws-amplify';
import { IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

const SignOutButton: React.FC = () => {
  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.signOut()
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <IconButton
      aria-label="sign out"
      onClick={handleSignOut}
    >
      <LogoutIcon />
    </IconButton>
  );
};

export default SignOutButton;
