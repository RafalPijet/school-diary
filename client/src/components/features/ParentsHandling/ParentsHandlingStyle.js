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
        height: '572px'
    }
});

export default componentStyle;
