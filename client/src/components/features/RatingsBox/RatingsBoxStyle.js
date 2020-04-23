import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: style.contentHeight,
        width: '100%',
        padding: `0 ${style.baseSize}`
    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    }
});

export default componentStyle;
