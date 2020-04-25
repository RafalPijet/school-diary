import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        padding: style.smallSize
    },
    header: {
        backgroundColor: theme.palette.action.header
    },
    title: {
        paddingTop: style.smallSize,
        paddingBottom: style.smallSize,
        color: theme.palette.primary.light
    },
    subject: {
        width: '250px'
    }
});

export default componentStyle;
