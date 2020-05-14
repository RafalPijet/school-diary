import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.action.header,
        height: '480px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: style.baseSize
    },
    container: {
        padding: `0 ${style.smallSize}`,
        height: '480px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '35px',
        backgroundColor: theme.palette.action.header
    },
    classInfo: {
        padding: 0,
        height: '35px',
        backgroundColor: theme.palette.action.header
    },
    description: {
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
