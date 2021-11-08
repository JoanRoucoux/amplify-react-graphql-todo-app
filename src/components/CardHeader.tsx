import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import SignOutButton from './SignOutButton';

const CardHeader: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography
          color="textPrimary"
          variant="h2"
        >
          Todo List
        </Typography>
      </Grid>
      <Grid item>
        <SignOutButton />
      </Grid>
    </Grid>
  </Box>
);

export default CardHeader;
