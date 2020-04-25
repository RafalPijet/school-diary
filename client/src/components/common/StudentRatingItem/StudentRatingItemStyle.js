const componentStyle = theme => ({
    root: {
        display: 'inline-flex',
        width: '30px',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingNumber: {
        padding: `0 ${theme.spacing(1)}px`,
        cursor: 'pointer',
        transition: '.3s'
    },
    ratingNumberBig: {
        padding: `0 ${theme.spacing(1)}px`,
        cursor: 'pointer',
        fontSize: '22px',
        fontWeight: '700',
        transition: '.5s'
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
    tooltip: {
        backgroundColor: theme.palette.action.adding
    }
});

export default componentStyle;
