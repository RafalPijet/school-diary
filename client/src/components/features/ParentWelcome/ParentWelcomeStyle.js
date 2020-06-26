import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: style.contentHeight,
        width: '100%',
        padding: style.baseSize,
        backgroundImage: theme.palette.background.parent
    }
});

export default componentStyle;
