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
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {backgroundColor: theme.palette.action.dark}
    },
    input: {
        minWidth: '180px'
    },
    addClass: {
        width: '600px',
        height: '56px',
        display: 'inline-flex',
        justifyContent: 'space-around',
        padding: style.smallSize,
        backgroundColor: theme.palette.secondary.dark,
        alignItems: 'center'
    },
    classGrade: {
        display: 'inline-flex',
        justifyContent: 'center',
        width: '250px'
    },
    classOptions: {
        display: 'inline-flex',
        width: '180px',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    possibleNames: {
        width: '115px'
    },
    className: {
        paddingTop: '13px'
    }
});

export default componentStyle;
