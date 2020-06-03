const componentStyle = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        color: theme.palette.action.light
    },
    info: {
        backgroundColor: theme.palette.secondary.dark,
        width: '240px',
        height: '88px',
        padding: theme.spacing(1),
        overflow: 'auto'
    }
});

export default componentStyle;
