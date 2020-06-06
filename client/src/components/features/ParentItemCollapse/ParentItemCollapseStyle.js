import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        color: theme.palette.action.light,
        backgroundColor: theme.palette.primary.light,
    },
    info: {
        backgroundColor: theme.palette.secondary.dark,
        width: '300px',
        height: '60px',
        padding: theme.spacing(1),
        overflow: 'auto'
    },
    second: {
        fontSize: style.baseSize,
        color: theme.palette.primary.light
    },
    tooltip: {
        backgroundColor: theme.palette.secondary.light
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        cursor: 'progress'
    }
});

export default componentStyle;
