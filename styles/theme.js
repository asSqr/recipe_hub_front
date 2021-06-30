import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff24e',
      main: '#ffc000',
      dark: '#c79000',
      contrastText: '#260e04',
    },
    secondary: {
      light: '#5efc82',
      main: '#00c853',
      dark: '#009624',
      contrastText: '#fff',
    },
  },
});

export default theme