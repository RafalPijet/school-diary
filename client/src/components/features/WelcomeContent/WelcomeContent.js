import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import componentStyle from "./WelcomeContentStyle";
import showImage1 from '../../../images/showImage1.png';
import showImage2 from '../../../images/showImage2.png';
import showImage3 from '../../../images/showImage3.png';
import showImage4 from '../../../images/showImage4.png';
import showImage5 from '../../../images/showImage5.png';
import showImage6 from '../../../images/showImage6.png';
import showImage7 from '../../../images/showImage7.png';
import showImage8 from '../../../images/showImage8.png';
import showImage9 from '../../../images/showImage9.png';
import showImage10 from '../../../images/showImage10.png';
import showImage11 from '../../../images/showImage11.png';
import showImage12 from '../../../images/showImage12.png';
import showImage13 from '../../../images/showImage13.png';
import showImage14 from '../../../images/showImage14.png';

const useStyles = makeStyles(theme => componentStyle(theme));

const collection = [
    {
        image: showImage1,
        description: 'Description1'
    },
    {
        image: showImage2,
        description: 'Description2'
    },
    {
        image: showImage3,
        description: 'Description3'
    },
    {
        image: showImage4,
        description: 'Description4'
    },
    {
        image: showImage5,
        description: 'Description5'
    },
    {
        image: showImage6,
        description: 'Description6'
    },
    {
        image: showImage7,
        description: 'Description7'
    },
    {
        image: showImage8,
        description: 'Description8'
    },
    {
        image: showImage9,
        description: 'Description9'
    },
    {
        image: showImage10,
        description: 'Description10'
    },
    {
        image: showImage11,
        description: 'Description11'
    },
    {
        image: showImage12,
        description: 'Description12'
    },
    {
        image: showImage13,
        description: 'Description13'
    },
    {
        image: showImage14,
        description: 'Description14'
    }
];

const WelcomeContent = props => {
    const top = 30;
    const between = 20;
    const bottom = 10;
    const [value, setValue] = useState(2);
    const [counter, setCounter] = useState(0);
    const [firstZindex, setFirstZindex] = useState(bottom);
    const [secondZindex, setSecondZindex] = useState(between);
    const [thirdZindex, setThirdZindex] = useState(top);
    const [isShowFirst, setIsShowFirst] = useState(false);
    const [isShowSecond, setIsShowSecond] = useState(false);
    const [isShowThird, setIsShowThird] = useState(false);
    const [firstValue, setFirstValue] = useState(collection[0]);
    const [secondValue, setSecondValue] = useState(collection[1]);
    const [thirdValue, setThirdValue] = useState(collection[2]);
    const classes = useStyles();

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(counter => counter + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    useEffect(() => {

        if (counter === 0) {
            setIsShowFirst(true);
        }

        if (counter === 5) {
            setIsShowSecond(true);

            if (isShowSecond) setIsShowSecond(false);
        }

        if (counter === 10) {
            setIsShowThird(true);

            if (isShowThird) setIsShowThird(false);
        }

        if (counter === 15) {
            setIsShowFirst(false);
        }
    }, [counter]);

    return (
        <Paper elevation={9} className={classes.root}>
            <Grow
                in={isShowFirst}
                timeout={1000}
                onExited={() => {

                    if (value !== (collection.length - 1)) {
                        setFirstValue(collection[value + 1]);
                        setValue(value => value + 1);
                    } else {
                        setFirstValue(collection[0]);
                        setValue(0);
                    }
                    setFirstZindex(top);
                    setThirdZindex(between);
                    setSecondZindex(bottom);
                    setCounter(0);
                }}
            >
                <Paper elevation={9} className={classes.first} style={{zIndex: `${firstZindex}`}}>
                    <img src={firstValue.image} alt={firstValue.description}/>
                    <Typography align='center' className={classes.description}>{firstValue.description}</Typography>
                </Paper>
            </Grow>
            <Grow
                in={isShowSecond}
                timeout={1000}
                onExited={() => {

                    if (value !== (collection.length - 1)) {
                        setSecondValue(collection[value + 1]);
                        setValue(value => value + 1);
                    } else {
                        setSecondValue(collection[0]);
                        setValue(0);
                    }
                    setIsShowSecond(true);
                    setSecondZindex(top);
                    setFirstZindex(between);
                    setThirdZindex(bottom);
                }}
            >
                <Paper elevation={9} className={classes.second} style={{zIndex: `${secondZindex}`}}>
                    <img src={secondValue.image} alt={secondValue.description}/>
                    <Typography align='center' className={classes.description}>{secondValue.description}</Typography>
                </Paper>
            </Grow>
            <Grow
                in={isShowThird}
                timeout={1000}
                onExited={() => {

                    if (value !== (collection.length - 1)) {
                        setThirdValue(collection[value + 1]);
                        setValue(value => value + 1);
                    } else {
                        setThirdValue(collection[0]);
                        setValue(0);
                    }
                    setIsShowThird(true);
                    setThirdZindex(top);
                    setSecondZindex(between);
                    setFirstZindex(bottom);
                }}
            >
                <Paper elevation={9} className={classes.third} style={{zIndex: `${thirdZindex}`}}>
                    <img src={thirdValue.image} alt={thirdValue.description}/>
                    <Typography align='center' className={classes.description}>{thirdValue.description}</Typography>
                </Paper>
            </Grow>
        </Paper>
    )
};

WelcomeContent.propTypes = {

};

export default WelcomeContent;
