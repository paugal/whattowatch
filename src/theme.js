import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF5757 ',
      contrastText: '#3A3A3A',
    },
    secondary: {
      main: '#F4D06F',
      contrastText: '#3A3A3A',
    },
  },
});

export default theme;