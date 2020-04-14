import { grey, red, green, orange, yellow, amber, blueGrey } from "@material-ui/core/colors";

const AppTheme = {
    DARK: 'dark',
    LIGHT: 'light'
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        palette: {
            type: 'light',
            primary: {
                light: grey[100],
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
                header: grey[200]
            },
            scales: {
                first: amber[500],
                second: orange[700],
                third: red[700]
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
                header: grey[700]
            },
            scales: {
                first: yellow[200],
                second: orange[400],
                third: red[300]
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
