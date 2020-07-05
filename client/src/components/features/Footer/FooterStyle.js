import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
        padding: `${style.smallSize}`,
        height: '37px',
        backgroundColor: theme.palette.secondary.light
    },
    authorBox: {
        width: 190,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    author: {
        color: theme.palette.primary.light
    },
    icon: {
        color: theme.palette.primary.light
    }
});

export default componentStyle;
