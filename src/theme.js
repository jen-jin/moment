import { createMuiTheme } from '@material-ui/core/styles';

let theme;

export default theme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#87B6CA80',
      },
      barColorPrimary: {
        backgroundColor: '#1378C1',
      }
    },
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
      outlined: {
        color: '#1378c1',
        borderRadius: 25,
        border: '1px solid #1378c1',
        height: 30,
        padding: '0 30px'
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