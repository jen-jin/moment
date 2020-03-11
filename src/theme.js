import { createMuiTheme } from '@material-ui/core/styles';

let theme;

export default theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: '#1378c1',
        borderRadius: 25,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 30px',
        '&:hover': {
          backgroundColor: '#0e5b93',
        },
      },
      text: {
        color: '#1378c1'
      },
      label: {
        textTransform: 'capitalize'
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: '#1378c1'
      },
    },
    MuiCardActions: {
      root: {
        float: 'right'
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#1378c1',
          borderBottomColor: '#1378c1'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:after':{
          borderBottom: '2px solid #1378c1'
        }
      }
    },
    MuiFilledInput: {
      underline: {
        '&:after':{
          borderBottom: '2px solid #1378c1'
        }
      }
    }
  }
});