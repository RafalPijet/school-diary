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
                main: red[400],
                dark: red[600]
            },
        },
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
                main: grey[400],
                dark: grey[600]
            },
        },
    }
};

export default appThemeOptions;
