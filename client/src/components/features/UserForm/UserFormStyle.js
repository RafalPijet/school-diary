import {style} from '../../../styles/global';

const componentStyle = theme => ({
    root: {
        height: style.contentHeight
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectRow: {
        display: 'inherit',
        justifyContent: 'space-between',
        width: '400px',
        margin: '5px 0'
    },
    textRow: {
        display: 'inherit',
        flexDirection: 'inherit',
        justifyContent: 'center',
        width: '400px'
    },
    select: {
        minWidth: '150px'
    },
    margin: {
        margin: '5px 0',
        height: 70
    },
    button: {
        marginTop: '50px',
        backgroundColor: theme.palette.action.dark
    }
});

export default componentStyle;
