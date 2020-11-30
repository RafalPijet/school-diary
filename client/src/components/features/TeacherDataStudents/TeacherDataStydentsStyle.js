import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '490px',
        marginTop: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark
    },
    item: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        color: theme.palette.primary.light
    },
    table: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        height: '369px',
        margin: `${style.baseSize} 0`,
        overflow: 'auto',
        backgroundColor: theme.palette.secondary.dark
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px'
    },
    center: {
        justifyContent: 'center'
    },
    email: {
        color: theme.palette.action.warning,
        fontSize: style.middleSize,
        textAlign: 'center'
    }
});

export default componentStyle;
