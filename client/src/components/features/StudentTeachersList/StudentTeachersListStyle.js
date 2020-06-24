import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: style.contentHeight,
        width: '100%',
        padding: style.baseSize
    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    },
    center: {
        justifyContent: 'center'
    },
    email: {
        color: theme.palette.action.warning,
        fontSize: style.middleSize
    },
    content: {
        marginTop: style.baseSize,
        display: 'flex',
        height: '510px',
        width: '100%',
        backgroundColor: theme.palette.secondary.dark,
        padding: style.baseSize
    }
});

export default componentStyle;
