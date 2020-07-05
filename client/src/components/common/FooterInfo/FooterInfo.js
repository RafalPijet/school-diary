import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Fade, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        color: theme.palette.action.info,
        fontWeight: 700,
        fontSize: 16
    }
}));

const FooterInfo = props => {
    const {
        isWorking,
        description,
        delay,
        duration,
        isContentChanging,
        changeHandling
    } = props;
    const [value, setValue] = useState(0);
    const [counter, setCounter] = useState(0);
    const [infoLine, setInfoLine] = useState(description[value]);
    const [isShow, setIsShow] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        let timer = null;

        if (isWorking) {
            timer = setInterval(() => {
                setCounter(counter => counter + 1);
            }, 1000);
        } else {
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWorking]);

    useEffect(() => {

        if (isWorking) {

            if (counter === delay) setIsShow(true);

            if (counter === duration) setIsShow(false);

        } else {
            setIsShow(false);
            setCounter(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter, isWorking]);

    useEffect(() => {

        if (isContentChanging) setIsShow(false)
    }, [isContentChanging]);

    const changeInfoLine = () => {
        setCounter(0);

        if (isWorking) {

            if (value === (description.length - 1)) {
                setValue(0);
                setInfoLine(description[0]);
            } else {
                setValue(value + 1);
                setInfoLine(description[value + 1]);
            }

            if (isContentChanging) {
                changeHandling(true);
                setValue(0);
                setInfoLine(description[0]);
            }
        } else {
            setValue(0);
            setInfoLine(description[0]);
        }
    };

    return (
        <div className={classes.root}>
            <Fade
                in={isShow}
                timeout={1000}
                onExited={changeInfoLine}
            >
                <Typography className={classes.text} align='center'>
                    {infoLine}
                </Typography>
            </Fade>
        </div>
    )
};

FooterInfo.propTypes = {
    isWorking: PropTypes.bool.isRequired,
    description: PropTypes.array.isRequired,
    delay: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    isContentChanging: PropTypes.bool.isRequired,
    changeHandling: PropTypes.func.isRequired
};

export default FooterInfo
