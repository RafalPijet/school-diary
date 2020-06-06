import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.dark,
        padding: `${style.smallSize} 0`
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    addButton: {
        color: theme.palette.action.dark
    },
    removeButton: {
        color: theme.palette.action.light
    },
    tooltip: {
        backgroundColor: theme.palette.secondary.light
    },
    progress: {
        cursor: 'progress'
    }
});

export default componentStyle;
