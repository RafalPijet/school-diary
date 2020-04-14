import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        height: '300px',
        padding: style.smallSize,
        position: 'relative'
    },
    header: {
        backgroundColor: theme.palette.action.header
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
