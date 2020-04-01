import { grey, red } from "@material-ui/core/colors";

const AppTheme = {
    DARK: 'dark',
    LIGHT: 'light'
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        palette: {
            type: 'light',
            primary: {
                light: red[200],
                main: '#000',
                dark: red[600]
            },
            secondary: {
                light: red[200],
                main: '#009dde',
                dark: red[600]
            },
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
                dark: grey[600]
            },
            secondary: {
                light: grey[200],
                main: '#009dde',
                dark: grey[700]
            },
        },
        typography: {
            subtitle2: {
                fontWeight: 800
            }
        }
    }
};

export default appThemeOptions;
