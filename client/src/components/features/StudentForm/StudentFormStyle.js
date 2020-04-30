const componentStyle = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light
    },
    names: {
        paddingBottom: '14px'
    },
    button: {
        marginTop: '50px',
        backgroundColor: theme.palette.action.dark
    }
});

export default componentStyle;
