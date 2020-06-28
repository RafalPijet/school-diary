import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        height: 35,
        width: '100%',
        paddingTop: style.baseSize
    },
    text: {
        color: theme.palette.action.info,
        fontWeight: 700,
        fontSize: 18
    }
});

export default componentStyle;
