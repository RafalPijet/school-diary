import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '58px',
        paddingLeft: style.smallSize,
        backgroundColor: theme.palette.secondary.light,
        marginBottom: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.action.item,
        }
    },
    item: {
        display: 'flex',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center'
    },
    parentsBox: {
        display: 'flex',
        backgroundColor: 'inherit',
        alignItems: 'center',
        flexDirection: 'column',
        height: '50px',
        width: '300px',
        padding: `${style.smallSize} ${style.baseSize}`,
        overflow: 'auto',
        '&:hover': {
            backgroundColor: theme.palette.action.header,
        }
    },
    parents: {
        display: 'inherit',
        height: '100%',
        width: '100%',
        backgroundColor: 'inherit',
        alignItems: 'center',
        flexDirection: 'column',
    }
});

export default componentStyle;
