import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        padding: style.smallSize,
        backgroundColor: theme.palette.secondary.dark
    },
    title: {
        padding: `${style.smallSize} 0`,
        color: theme.palette.primary.light
    },
    content: {
        height: '465px',
        overflow: 'auto'
    }
});

export default componentStyle;
