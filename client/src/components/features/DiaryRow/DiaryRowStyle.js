import {style} from "../../../styles/global";

const componentStyle = theme => ({
    buttonBox: {
        display: 'inline-flex',
        width: '50px',
        height: '50px',
        alignItems: 'center',
        position: 'relative'
    },
    spinnerBox: {
        display: 'inline-flex',
        width: '30px',
        height: '30px',
        alignItems: 'center'
    },
    adding: {
        position: 'absolute',
        left: '-200px',
        top: '-16px',
        zIndex: '20',
        backgroundColor: theme.palette.action.adding
    },
    buttonAdd: {
        color: theme.palette.action.dark,
        transition: '1s'
    },
    buttonCancel: {
        color: theme.palette.action.warning,
        transform: 'rotate(45deg)',
        transition: '1s'
    },
    padding: {
        padding: style.smallSize
    },
    firstCell: {
        width: style.baseSize,
    },
    secondCell: {
        width: '200px',
        overflowX: 'auto'
    },
    thirdCell: {
        width: '720px',
    },
    names: {
        whiteSpace: 'nowrap',
        width: '200px',
    },
    ratings: {
        width: '666px',
        display: 'inline-flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        height: '40px',
    },
    previewRoot: {
        position: 'relative'
    },
    preview: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: style.smallSize,
        left: '-220px',
        top: '-15px',
        height: '80px',
        width: '200px',
        backgroundColor: 'rgba(84, 110, 122, .5)'
    },
    1: {
        color: theme.palette.scales.first
    },
    2: {
        color: theme.palette.scales.second
    },
    3: {
        color: theme.palette.scales.third
    },
    flipped: {
        position: 'absolute',
        willChange: 'transform, opacity',
    },
    showUpdate: {
        opacity: 1,
        transition: 'opacity .3s ease-in-out'
    },
    hiddenUpdate: {
        opacity: 0,
        transition: 'opacity .3s ease-in-out'
    },
    disabled: {
        color: theme.palette.secondary.light
    }
});

export default componentStyle;
