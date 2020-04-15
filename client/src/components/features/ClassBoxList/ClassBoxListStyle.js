import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: style.contentHeight,
        width: '100%',
        padding: `0 ${style.baseSize}`
    },
    subjectInfo: {
        width: '100%',
        padding: `${style.smallSize} 0`,
        display: 'inline-flex',
        justifyContent: 'flex-end'
    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    }
});

export default componentStyle;
