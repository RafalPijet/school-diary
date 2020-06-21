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
    spinner: {
        justifyContent: 'center'
    }
});

export default componentStyle;
