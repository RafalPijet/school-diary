const componentStyle = theme => ({
    root: {
        width: '100%',
        margin: `${theme.spacing(.2)}px 0`
    },
    item: {
        backgroundColor: theme.palette.secondary.dark
    },
    select: {
        width: '100%',
        margin: `${theme.spacing(1)}px 0`
    },
    selected: {
        fontWeight: '800'
    }
});

export default componentStyle;
