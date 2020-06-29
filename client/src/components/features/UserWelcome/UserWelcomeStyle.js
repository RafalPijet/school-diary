import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        width: '100%',
        padding: style.baseSize,
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 535,
    },
    parent: {
        backgroundImage: theme.palette.background.parent
    },
    teacher: {
        backgroundImage: theme.palette.background.teacher
    },
    principal: {
        backgroundImage: theme.palette.background.principal
    }
});

export default componentStyle;
