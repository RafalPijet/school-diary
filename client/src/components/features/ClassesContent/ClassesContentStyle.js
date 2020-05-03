import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: style.baseSize
    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    }
});

export default componentStyle;
