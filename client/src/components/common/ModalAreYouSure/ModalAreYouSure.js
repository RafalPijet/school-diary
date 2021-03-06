import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    buttonRemove: {
        color: theme.palette.action.light
    }
}));

const ModalAreYouSure = props => {
    const {isOpen, isConfirm, description, ...otherProps} = props;
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                onClose={() => isConfirm(false)}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                {...otherProps}
            >
                <DialogTitle id='alert-dialog-slide-title'>
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonRemove} onClick={() => isConfirm(true)}>Delete</Button>
                    <Button color='primary' onClick={() => isConfirm(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

ModalAreYouSure.propTypes = {
    description: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isConfirm: PropTypes.func.isRequired
};

export default ModalAreYouSure;
