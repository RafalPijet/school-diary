import {style} from "../../../styles/global";

const componentStyle = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80px',
        width: '200px',
        padding: style.smallSize
    },
    ratingRow: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    valueBox: {
        display: 'inline-flex',
        width: '30px',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: style.smallSize,
        paddingBottom: style.smallSize
    },
    buttonBox: {
        padding: style.smallSize
    },
    scales1: {
        fontSize: style.middleSize,
        fontWeight: 700,
        paddingLeft: theme.spacing(1),
        color: theme.palette.scales.first
    },
    scales2: {
        fontSize: style.middleSize,
        fontWeight: 700,
        paddingLeft: theme.spacing(1),
        color: theme.palette.scales.second
    },
    scales3: {
        fontSize: style.middleSize,
        fontWeight: 700,
        paddingLeft: theme.spacing(1),
        color: theme.palette.scales.third
    },
    0: {
        color: theme.palette.scales.first,
        textAlign: 'center'
    },
    1: {
        color: theme.palette.scales.second,
        textAlign: 'center'
    },
    2: {
        color: theme.palette.scales.third,
        textAlign: 'center'
    }
});

export default componentStyle;
