import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'inherit',
        padding: style.smallSize
    },
    description: {
        color: theme.palette.primary.light,
        fontSize: style.baseSize
    },
    info: {
        fontWeight: 800
    }
});

export default componentStyle;
