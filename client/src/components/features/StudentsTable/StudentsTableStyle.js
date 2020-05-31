const componentStyle = theme => ({
    table: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        height: '408px',
        marginBottom: theme.spacing(1),
        overflow: 'auto',
        backgroundColor: theme.palette.secondary.dark
    },
    spinner: {
        justifyContent: 'center'
    }
});

export default componentStyle;
