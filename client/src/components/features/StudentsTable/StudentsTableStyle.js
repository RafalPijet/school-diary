const componentStyle = theme => ({
    header: {
        width: '100%',
        backgroundColor: theme.palette.secondary.dark
    },
    item: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        color: theme.palette.primary.light
    },
    table: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        height: '369px',
        marginBottom: theme.spacing(1),
        overflow: 'auto',
        backgroundColor: theme.palette.secondary.dark
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px'
    },
    spinner: {
        justifyContent: 'center'
    }
});

export default componentStyle;
