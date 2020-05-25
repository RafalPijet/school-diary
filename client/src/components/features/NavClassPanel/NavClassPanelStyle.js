const componentStyle = theme => ({
    root: {
        width: '100%',
        margin: '7px',
        backgroundColor: theme.palette.secondary.dark
    },
    buttons: {
        outline: 'none !important',
        color: theme.palette.primary.main
    },
    second: {
        display: 'flex',
        height: '95px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectTutor: {
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    descTutor: {
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'center',
    },
    selectInput: {
        width: '250px'
    },
    replaceButton: {
        outline: 'none !important',
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {backgroundColor: theme.palette.action.dark}
    },
    tooltip: {
        backgroundColor: theme.palette.secondary.light
    },
    buttonsActive: {
        outline: 'none !important',
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.action.dark
        }
    },
    buttonDelete: {
        outline: 'none !important',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.action.light,
        '&:hover': {
            color: theme.palette.action.main
        }
    },
    searchField: {
        padding: '5px'
    },
    progress: {
        cursor: 'progress !important'
    }
});

export default componentStyle;
