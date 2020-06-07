import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light
    },
    info: {
        padding: `${style.smallSize} 0 0 22px`,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        padding: `0 ${style.baseSize}`,
        height: '515px',
        overflow: 'auto'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px',
        marginBottom: style.smallSize
    },
});

export default componentStyle;
