import {style} from "../../../styles/global";
import image from '../../../images/teacherDesk.png';

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: style.baseSize,

    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.dark,
        width: '100%',
        height: '430px',
        marginTop: theme.spacing(1),
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    nothing: {
        height: '500px'
    }
});

export default componentStyle;
