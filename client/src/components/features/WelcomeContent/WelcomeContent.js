import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    Slider,
    Tooltip,
    IconButton,
    Fade
} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
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
        description: "Parent or guardian's home page (dark mode)"
    },
    {
        image: showImage2,
        description: "Teacher's home page (light mode)"
    },
    {
        image: showImage3,
        description: "Principal's home page"
    },
    {
        image: showImage4,
        description: "Parent's data section"
    },
    {
        image: showImage5,
        description: "Selected student's grades viewed from their parent's account"
    },
    {
        image: showImage6,
        description: "Teachers' contact data viewed by a parent"
    },
    {
        image: showImage7,
        description: "Adding a grade from a teacher's account"
    },
    {
        image: showImage8,
        description: "Editing a grade from a teacher's account"
    },
    {
        image: showImage9,
        description: "Students' list in the teacher's mode"
    },
    {
        image: showImage10,
        description: 'Configuration panel of the selected class in the principal mode'
    },
    {
        image: showImage11,
        description: "Editable list of teachers viewed from the principal's mode"
    },
    {
        image: showImage12,
        description: 'List of teachers in the principal mode'
    },
    {
        image: showImage13,
        description: 'List of students in the principal mode'
    },
    {
        image: showImage14,
        description: 'List of parents or guardians in the principal mode'
    }
];

const WelcomeContent = () => {
    const top = 30;
    const between = 20;
    const bottom = 10;
    const [value, setValue] = useState(2);
    const [step, setStep] = useState(5);
    const [counter, setCounter] = useState(0);
    const [isReady, setIsReady] = useState(true);
    const [firstZindex, setFirstZindex] = useState(bottom);
    const [secondZindex, setSecondZindex] = useState(between);
    const [thirdZindex, setThirdZindex] = useState(top);
    const [isShowFirst, setIsShowFirst] = useState(false);
    const [isShowSecond, setIsShowSecond] = useState(false);
    const [isShowThird, setIsShowThird] = useState(false);
    const [firstValue, setFirstValue] = useState(collection[0]);
    const [secondValue, setSecondValue] = useState(collection[1]);
    const [thirdValue, setThirdValue] = useState(collection[2]);
    const [firstIsClosed, setFirstIsClosed] = useState(false);
    const [secondIsClosed, setSecondIsClosed] = useState(false);
    const [thirdIsClosed, setThirdIsClosed] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const timer = setInterval(() => {

            if (isReady) setCounter(counter => counter + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady]);

    useEffect(() => {

        if (isReady) {

            if (counter === 0) {
                setIsShowFirst(true);
            }

            if (counter === step) {
                setIsShowSecond(true);

                if (isShowSecond) setIsShowSecond(false);
            }

            if (counter === (2 * step)) {
                setIsShowThird(true);

                if (isShowThird) setIsShowThird(false);
            }

            if (counter === (3 * step)) {
                setIsShowFirst(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter, step, isReady]);

    useEffect(() => {

        if (firstIsClosed) setCounter(0);

        if (secondIsClosed) setIsShowSecond(true);

        if (thirdIsClosed) setIsShowThird(true);

    }, [firstIsClosed, secondIsClosed, thirdIsClosed]);

    const handleSlider = (event, newValue) => {
        setStep(newValue);

        if (firstZindex === bottom) {
            setCounter(3 * step);
        } else if (secondZindex === bottom) {
            setCounter(step);
        } else if (thirdZindex === bottom) {
            setCounter(2 * step);
        }
        setIsShowFirst(true);
        setIsShowSecond(true);
        setIsShowThird(true);
    };

    const changeSlide = slideNumber => {

        if (slideNumber === 1) {

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
        } else if (slideNumber === 2) {

            if (value !== (collection.length - 1)) {
                setSecondValue(collection[value + 1]);
                setValue(value => value + 1);

            } else {
                setSecondValue(collection[0]);
                setValue(0);

            }
            setSecondZindex(top);
            setFirstZindex(between);
            setThirdZindex(bottom);
        } else {

            if (value !== (collection.length - 1)) {
                setThirdValue(collection[value + 1]);
                setValue(value => value + 1);

            } else {
                setThirdValue(collection[0]);
                setValue(0);
            }
            setThirdZindex(top);
            setSecondZindex(between);
            setFirstZindex(bottom);
        }
    };

    const setSlide = slideNumber => new Promise(resolve => resolve(
        changeSlide(slideNumber)
    ));

    return (
        <Paper elevation={9} className={classes.root}>
            <Grow
                in={isShowFirst}
                timeout={1000}
                onEntered={() => setFirstIsClosed(false)}
                onExited={() => {
                    setSlide(1)
                        .then(() => setFirstIsClosed(true));
                    // setTimeout(() => setCounter(0), 500);
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
                onEntered={() => setSecondIsClosed(false)}
                onExited={() => {
                    setSlide(2)
                        .then(() => setSecondIsClosed(true));
                    // setTimeout(() => setIsShowSecond(true), 500);
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
                onEntered={() => setThirdIsClosed(false)}
                onExited={() => {
                    setSlide(3)
                        .then(() => setThirdIsClosed(true));
                    // setTimeout(() => setIsShowThird(true), 500);
                }}
            >
                <Paper elevation={9} className={classes.third} style={{zIndex: `${thirdZindex}`}}>
                    <img src={thirdValue.image} alt={thirdValue.description}/>
                    <Typography align='center' className={classes.description}>{thirdValue.description}</Typography>
                </Paper>
            </Grow>
            <div className={classes.footer}>
                <div className={classes.operation}>
                    <Tooltip
                        title={isReady ? 'pause' : 'play'}
                        placement='bottom'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={2000}
                    >
                        <span>
                            <IconButton
                                size='small'
                                onClick={() => setIsReady(!isReady)}
                            >
                                {isReady ? <PauseIcon fontSize='small'/> : <PlayArrowIcon fontSize='small'/>}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title='change speed'
                        placement='bottom'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={2000}
                    >
                        <span>
                            <Slider
                                disabled={isReady}
                                getAriaValueText={value => `${value}`}
                                className={classes.slider}
                                defaultValue={5}
                                step={1}
                                min={2}
                                max={10}
                                valueLabelDisplay="auto"
                                color='secondary'
                                value={step}
                                onChange={handleSlider}
                            />
                        </span>
                    </Tooltip>
                </div>
            </div>
        </Paper>
    )
};

export default WelcomeContent;
