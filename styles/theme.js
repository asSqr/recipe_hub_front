import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5efc82',
      main: '#00c853',
      dark: '#009624',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff263',
      main: '#fbc02d',
      dark: '#c49000',
      contrastText: '#000',
    },
  },
});

export default theme