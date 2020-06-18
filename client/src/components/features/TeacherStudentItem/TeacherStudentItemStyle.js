import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '58px',
        paddingLeft: style.smallSize,
        backgroundColor: theme.palette.secondary.dark,
        marginBottom: style.baseSize,
        '&:hover': {
            backgroundColor: theme.palette.action.item,
        }
    },
    item: {
        display: 'flex',
        alignItems: 'center'
    }
});

export default componentStyle;
