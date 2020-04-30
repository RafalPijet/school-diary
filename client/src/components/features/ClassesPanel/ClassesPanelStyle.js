import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary.dark,
        padding: style.smallSize
    },
    button: {
        outline: 'none !important',
        '&:hover': {backgroundColor: theme.palette.action.dark}
    }
});

export default componentStyle;
