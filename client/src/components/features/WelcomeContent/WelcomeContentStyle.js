import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        height: style.contentHeight,
        padding: style.baseSize,
        position: 'relative'
    },
    first: {
        position: 'absolute',
        width: 550,
        height: 360,
        top: 60,
        left: 10,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.secondary.light
    },
    second: {
        position: 'absolute',
        width: 550,
        height: 360,
        top: 10,
        left: 450,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.secondary.light
    },
    third: {
        position: 'absolute',
        width: 550,
        height: 360,
        top: 230,
        left: 215,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.secondary.light
    },
    description: {
        width: '100%',
        padding: `${style.smallSize} 0`
    }
});

export default componentStyle;
