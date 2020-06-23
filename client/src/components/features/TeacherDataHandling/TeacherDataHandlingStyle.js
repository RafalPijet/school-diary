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
    edit: {
        display: 'flex',
        width: '100%',
        height: '490px',
        marginTop: theme.spacing(1),
    }
});

export default componentStyle;
