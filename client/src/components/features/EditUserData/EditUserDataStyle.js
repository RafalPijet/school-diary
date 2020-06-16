import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        height: '490px',
        marginTop: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    textField: {
        width: '250px',
        height: '70px',
        marginBottom: style.smallSize
    },
    button: {
        backgroundColor: theme.palette.action.dark
    },
    justifyEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    tooltip: {
        backgroundColor: theme.palette.secondary.light
    }
});

export default componentStyle;
