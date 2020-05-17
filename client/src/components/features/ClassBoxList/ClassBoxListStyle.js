import {style} from "../../../styles/global";
import image from '../../../images/teacherDesk.png'

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: style.contentHeight,
        width: '100%',
    },
    padding: {
        padding: `0 ${style.baseSize}`
    },
    image: {
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    subjectInfo: {
        width: '100%',
        padding: `${style.smallSize} 0`,
        display: 'inline-flex',
        justifyContent: 'flex-end'
    },
    tabs: {
        backgroundColor: theme.palette.action.tab,
        fontWeight: 800
    }
});

export default componentStyle;
