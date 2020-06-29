import React, {useState} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";
import {Paper, ButtonBase, Typography} from "@material-ui/core";
import componentStyle from "./ButtonImageStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const ButtonImage = props => {
    const {title, path, top, bottom, right, left, image, width, height, setPath} = props;
    const [topTitle,] = useState(top || 0);
    const [bottomTitle,] = useState(bottom || 0);
    const [leftTitle,] = useState(left || 0);
    const [rightTitle,] = useState(right || 0);
    const [value, setValue] = useState('/');
    const classes = useStyles();

    const buttonHandling = () => {
        setTimeout(() => {
            setValue(path);
            setPath(path);
        },300);
    };

    return (
        <Paper elevation={9} className={classes.root}>
            <ButtonBase
                name={title}
                focusRipple
                onClick={buttonHandling}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: width,
                    height: height
                }}
            >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image})`
                        }}
                    />
                <span className={classes.imageBackdrop}/>
                <span className={classes.imageButton} style={{
                    bottom: bottomTitle, top: topTitle, right: rightTitle, left: leftTitle
                }}>
                        <Typography
                            component='span'
                            variant='subtitle1'
                            color='inherit'
                            className={classes.imageTitle}
                        >
                            {title}
                        </Typography>
                    </span>
            </ButtonBase>
            <Redirect to={value}/>
        </Paper>
    )
};

ButtonImage.propStyles = {
    title: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    path: PropTypes.string.isRequired,
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    setPath: PropTypes.func.isRequired
};

export default ButtonImage;
