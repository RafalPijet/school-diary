import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.action.header,
        height: '480px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: `${style.baseSize} ${style.smallSize}`,
        position: 'relative',
        height: '450px',
        marginTop: '25px'
    },
    header: {
        position: 'fixed',
        left: 0,
        top: 0,
        marginTop: '10px',
        width: '100%',
        height: '35px',
        backgroundColor: theme.palette.action.header,
        zIndex: 99
    },
    student: {
        paddingLeft: style.smallSize + ' !important'
    },
    row: {
        fontWeight: 800,
        color: theme.palette.primary.light,
        padding: `${style.smallSize} ${style.baseSize}`
    },
    classInfo: {
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        right: '6px',
        top: '7px'
    },
    tutor: {
        fontWeight: 200,
        fontSize: style.baseSize,
        color: theme.palette.primary.light
    },
    tutorContent: {
        fontWeight: 600,
        fontSize: style.titleSize,
        color: theme.palette.primary.light
    }
});

export default componentStyle;
