import React from 'react';
import {
  Alert,
  AlertTitle,
} from '@mui/material';

const ApiErrorMessage: React.FC = () => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    Oops! Something went wrong —
    {' '}
    <strong>please try again!</strong>
  </Alert>
);

export default ApiErrorMessage;
