import {style} from "../../../styles/global";

const componentStyle = theme => ({
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: style.contentHeight,
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
