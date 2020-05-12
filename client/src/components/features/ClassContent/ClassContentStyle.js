import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        margin: 'auto',
    },
    paper: {
        width: 434,
        height: 270,
        overflow: 'auto',
        transition: '.5s'
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    description: {
        padding: style.smallSize
    },
    moreWidth: {
        width: 474,
        transition: '.5s'
    },
    duplicate: {
        color: '#ff3838'
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default componentStyle;
