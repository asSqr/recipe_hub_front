import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// See https://material-ui.com/ja/components/text-fields/
const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#9c786c',
    },
    '& label': {
      color: '#9c786c',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#FFC000',
    },
    '& .MuiInput-underline:hover': {
      borderBottomColor: '#FFC000',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#c79000',
    }
  },
})(TextField);

export default CustomTextField