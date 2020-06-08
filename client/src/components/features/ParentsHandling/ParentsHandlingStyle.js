import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light
    },
    info: {
        padding: `${style.smallSize} 0 0 22px`,
    },
    content: {
        // display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: `0 ${style.baseSize}`,
        height: '515px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px',
        marginBottom: style.smallSize
    },
    spinner: {
        justifyContent: 'center !important'
    },
    noFull: {
        justifyContent: 'flex-start !important'
    }
});

export default componentStyle;
