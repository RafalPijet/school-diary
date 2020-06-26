import { grey, red, green, orange, yellow, amber, blueGrey } from "@material-ui/core/colors";
import backParentDark from '../images/backParentDark.jpg';
import backParentLight from '../images/backParentLight.jpg';

const AppTheme = {
    DARK: 'dark',
    LIGHT: 'light'
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        palette: {
            type: 'light',
            primary: {
                light: grey[600],
                main: '#000',
                dark: green[200]
            },
            secondary: {
                light: grey[300],
                main: '#009dde',
                dark: grey[200]
            },
            action: {
                light: red[500],
                main: red[500],
                dark: green[500],
                warning: orange[700],
                tab: blueGrey[100],
                adding: blueGrey[300],
                check: blueGrey[400],
                header: grey[200],
                item: grey[300]
            },
            scales: {
                first: amber[500],
                second: orange[700],
                third: red[700]
            },
            background: {
                parent: `url(${backParentLight})`
            }
        },
        typography: {
            subtitle2: {
                fontWeight: 800
            }
        }
    },
    [AppTheme.DARK]: {
        palette: {
            type: 'dark',
            primary: {
                light: grey[400],
                main: grey[100],
                dark: green[600]
            },
            secondary: {
                light: grey[800],
                main: '#009dde',
                dark: grey[700]
            },
            action: {
                light: red[300],
                main: red[500],
                dark: green[400],
                warning: orange[500],
                tab: blueGrey[700],
                adding: blueGrey[600],
                check: blueGrey[400],
                header: grey[700],
                item: grey[600]
            },
            scales: {
                first: yellow[200],
                second: orange[400],
                third: red[300]
            },
            background: {
                parent: `url(${backParentDark})`
            }
        },
        typography: {
            subtitle2: {
                fontWeight: 800
            }
        }
    }
};

export default appThemeOptions;
