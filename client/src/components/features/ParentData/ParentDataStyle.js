import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: style.contentHeight,
        width: '100%',
        padding: style.baseSize
    },
});

export default componentStyle;
