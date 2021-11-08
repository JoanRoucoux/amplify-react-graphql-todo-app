import React from 'react';
import {
  Link,
  Typography,
} from '@mui/material';

const Copyright: React.FC = () => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    sx={{ mt: 4 }}
  >
    {'See project on '}
    <Link
      color="inherit"
      href="https://github.com/JoanRoucoux/amplify-react-graphql-todo-app"
    >
      Github
    </Link>
    .
  </Typography>
);

export default Copyright;
