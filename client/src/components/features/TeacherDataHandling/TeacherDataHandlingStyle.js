import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.secondary.light,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: style.baseSize,
        height: style.contentHeight
    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    },
});

export default componentStyle;
