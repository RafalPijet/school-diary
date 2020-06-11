import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light
    },
    info: {
        padding: `${style.smallSize} ${style.baseSize} 0 22px`,
    },
    content: {
        justifyContent: 'flex-start',
        padding: `10px ${style.baseSize} 0`,
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
    column: {
        flexDirection: 'column',
    },
    center: {
        justifyContent: 'center !important'
    }
});

export default componentStyle;
