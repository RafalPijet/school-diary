import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from "@material-ui/core/Typography";

const SlideTransition = props => {
    return <Slide {...props} direction='left'/>
};

const useStyles = makeStyles(theme => ({
    rootMessage: {
        backgroundColor: 'inherit',
        color: '#fff'
    },
    success: {
        backgroundColor: theme.palette.action.dark
    },
    error: {
        backgroundColor: theme.palette.action.light
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const MessageContent = props => {
    const {message, className, variant} = props;
    const classes = useStyles();
    return (
        <div className={classes.row}>
            {variant === 'success' ? <DoneIcon className={className} /> :
                <ErrorIcon className={className} />}
            <Typography
                className={className}
                style={{paddingLeft: '10px'}}
            >
                {message}
            </Typography>
        </div>
    )
};

const Alert = props => {
    const {message, isOpenAlert, variant, handleCloseHandling, duration} = props;
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setIsOpen(isOpenAlert)
    }, [isOpenAlert]);

    return (
        <div>
            <Snackbar
                open={isOpen}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                TransitionComponent={SlideTransition}
                autoHideDuration={duration || 5000}
                onClose={() => setIsOpen(false)}
                onExited={handleCloseHandling}
            >
                <SnackbarContent
                    className={classes[variant]}
                    message={<MessageContent
                        message={message}
                        variant={variant}
                        className={classes.rootMessage}/>}
                />
            </Snackbar>
        </div>
    )
};

Alert.propTypes = {
    message: PropTypes.string,
    isOpenAlert: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    handleCloseHandling: PropTypes.func,
    duration: PropTypes.number
};

export default Alert;
