import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.secondary.dark,
        padding: style.baseSize,
        marginBottom: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    },
    info: {
        fontWeight: 800
    },
});

export default componentStyle;
