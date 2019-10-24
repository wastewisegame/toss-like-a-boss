import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#009E0A"
        }
      }
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: "url(../img/Lake.JPG)"
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#009E0A"
    },
    secondary: {
      main: "#nnn"
    },
    success: {
      main: "#009E0A"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    },
    text: {
      default: "#fff"
    }
  }
});

export default (theme);