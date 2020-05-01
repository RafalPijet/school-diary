import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.action.adding,
        padding: style.smallSize
    },
    button: {
        outline: 'none !important',
        '&:hover': {backgroundColor: theme.palette.action.dark}
    },
    input: {
        minWidth: '180px'
    },
    addClass: {
        width: '600px',
        display: 'inline-flex',
        justifyContent: 'space-around',
        padding: style.smallSize,
        backgroundColor: theme.palette.secondary.dark
    },
    classType: {
        display: 'inline-flex',
        justifyContent: 'center',
        width: '250px'
    }
});

export default componentStyle;
