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
            top: '-33px',
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
    }
});

export default componentStyle;
