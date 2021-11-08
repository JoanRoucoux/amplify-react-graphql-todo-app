import { createTheme } from '@mui/material/styles';
import typography from './typography';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  shape: {
    borderRadius: 16,
  },
  typography,
});

export default theme;
