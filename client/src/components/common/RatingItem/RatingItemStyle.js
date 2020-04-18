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
        fontSize: '22px',
        fontWeight: '700',
        transition: '.3s'
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
    disabled: {
        color: theme.palette.secondary.light,
        transition: '.5s'
    }
});

export default componentStyle;
