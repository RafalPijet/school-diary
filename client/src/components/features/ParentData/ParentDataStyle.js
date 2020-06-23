import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: style.contentHeight,
        width: '100%',
        padding: style.baseSize
    },
    students: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '160px',
        padding: style.bigSize,
        backgroundColor: theme.palette.secondary.light,
        marginBottom: theme.spacing(2),
        overflow: 'auto'
    },
    edit: {
        display: 'flex',
        width: '100%',
        height: '350px',
        justifyContent: 'center'
    },
    item: {
        width: '100%',
        backgroundColor: theme.palette.action.adding,
        padding: style.baseSize,
        margin: `${style.smallSize} 0`
    },
    center: {
        justifyContent: 'center',
    }
});

export default componentStyle;
