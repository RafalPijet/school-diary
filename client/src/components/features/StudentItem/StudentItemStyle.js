import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        padding: `${style.smallSize} ${style.baseSize}`,
        marginBottom: theme.spacing(1)
    },
    buttons: {
        display: 'inline-flex',
        justifyContent: 'space-around'
    },
    button: {
        outline: 'none !important'
    },
    names: {
        display: 'flex',
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    delete: {
        color: theme.palette.action.light
    },
    edit: {
        color: theme.palette.action.dark
    },
    close: {
        color: theme.palette.action.warning
    },
    progress: {
        cursor: 'progress'
    }
});

export default componentStyle;
