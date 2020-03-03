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
        }
      },
      label: {
        textTransform: 'capitalize',
      },
    }
  }
});