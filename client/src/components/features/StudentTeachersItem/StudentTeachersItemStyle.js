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
        fontSize: style.baseSize,
        marginRight: style.smallSize
    },
    info: {
        fontWeight: 800
    },
    tutor: {
        width: '90%',
        display: 'inline-flex',
        justifyContent: 'space-between'
    },
    teachers: {
        width: '100%',
        height: '376px',
        backgroundColor: theme.palette.secondary.dark,
        padding: style.baseSize,
        overflow: 'auto'
    }
});

export default componentStyle;
