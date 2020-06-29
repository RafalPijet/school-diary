import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Fade, Typography} from "@material-ui/core";
import componentStyle from "./FooterInfoStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const FooterInfo = props => {
    const {description, delay, duration} = props;
    const [value, setValue] = useState(0);
    const [counter, setCounter] = useState(0);
    const [infoLine, setInfoLine] = useState(description[value]);
    const [isShow, setIsShow] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(counter => counter + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (counter === delay) setIsShow(true);

        if (counter === duration) setIsShow(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const changeInfoLine = () => {
        setCounter(0);

        if (value === (description.length - 1)) {
            setValue(0);
            setInfoLine(description[0]);
        } else {
            setValue(value + 1);
            setInfoLine(description[value + 1]);
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
    description: PropTypes.array.isRequired,
    delay: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
};

export default FooterInfo
