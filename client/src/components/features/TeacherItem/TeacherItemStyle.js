import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '58px',
        paddingLeft: style.smallSize,
        backgroundColor: theme.palette.secondary.dark,
        marginBottom: style.baseSize,
        '&:hover': {
            backgroundColor: theme.palette.action.item,
        }
    },
    names: {
        display: 'flex',
        alignItems: 'center'
    },
    subject: {
        paddingLeft: style.smallSize,
        fontSize: style.baseSize,
        color: theme.palette.primary.light
    },
    tutor: {
        width: '100%',
        fontSize: style.baseSize,
        color: theme.palette.primary.light
    },
    classes: {
        display: 'flex',
        // justifyContent: 'center',
        backgroundColor: 'inherit',
        alignItems: 'center',
        flexDirection: 'column',
        height: '50px',
        width: '130px',
        padding: `${style.smallSize} ${style.baseSize}`,
        overflow: 'auto',
        '&:hover': {
            backgroundColor: theme.palette.action.header,
        }
    },
    sum: {
        width: '100%',
        fontSize: style.baseSize
    },
    operation: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    delete: {
        color: theme.palette.action.light
    },
});

export default componentStyle;
