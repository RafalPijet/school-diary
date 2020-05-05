import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    IconButton,
    Tooltip,
    Fade,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Typography
} from "@material-ui/core";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Spinner from "../../common/Spinner/Spinner";
import componentStyle from './ClassesPanelStyle'

const useStyles = makeStyles(theme => componentStyle(theme));

const ClassesPanel = props => {
    const {allClasses, addClass, loadTeachers, request, teachers, availableNames, getClassGrade, getPossibleTutors} = props;
    const [newClass, setNewClass] = useState({
        name: '',
        mainTeacher: 'unselected',
    });
    const [isPossible, setIsPossible] = useState(false);
    const [availableTutors, setAvailableTutors] = useState([]);
    const [availableClassNames, setAvailableClassNames] = useState([]);
    const [classGrade, setClassGrade] = useState('none');
    const classes = useStyles();

    useEffect(() => {
        setIsPossible(newClass.mainTeacher !== 'unselected');

        if (teachers.length === 0) loadTeachers();
        prepareData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableNames.grade, availableNames.type, classGrade, teachers, newClass.mainTeacher, allClasses]);

    const prepareData = () => {
        let result = [];
        let possibleTutors = [];
        availableNames.grade.forEach(grade => {
            availableNames.type.forEach(type => {
                result = [...result, `${grade} ${type}`]
            })
        });
        allClasses.forEach(item => {
            result = result.filter(name => name !== item.name.substring(6, item.name.length));
        });

        if (classGrade !== 'none') {
            result = result.filter(name => name.substring(0, 1) === classGrade)
        }
        setAvailableClassNames(result);
        setNewClass({...newClass, name: result[0]});
        let existedTutors = allClasses.map(item => item.mainTeacher.id);
        teachers.forEach(teacher => {

            if (!existedTutors.includes(teacher.id)) {
                possibleTutors = [...possibleTutors, teacher];
                setAvailableTutors(possibleTutors);
                getPossibleTutors(possibleTutors);
            }
        });
    };

    const addClassHandling = () => {
        newClass.name = `Class ${newClass.name}`;
        addClass(newClass);
        setNewClass({name: '', mainTeacher: 'unselected'});
    };

    const handleTutorChange = event => {
        setNewClass({...newClass, mainTeacher: event.target.value});
    };

    const handleClassGrade = event => {
        setClassGrade(event.target.value);
        getClassGrade(event.target.value);
    };

    const handleClassName = event => {
        setNewClass({...newClass, name: event.target.value})
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <span className={classes.classGrade}>
                <FormControl>
                <InputLabel id='choose-class-grade'>
                    sort by class grade
                </InputLabel>
                <Select
                    className={classes.input}
                    labelId='choose-class-grade'
                    value={classGrade}
                    onChange={handleClassGrade}
                >
                    <MenuItem value='none'>none</MenuItem>
                    {availableNames.grade.map(item => {
                        return <MenuItem key={item} value={item}>{`${item}th`}</MenuItem>
                    })}
                </Select>
            </FormControl>
            </span>
            <Paper variant='outlined' className={classes.addClass}>
                {request.adding ? <Spinner/> :
                    <>
                        <span className={classes.classOptions}>
                    <Typography className={classes.className} variant='subtitle1'>Class</Typography>
                    <FormControl className={classes.possibleNames}>
                        <InputLabel id='class-names'>possible names</InputLabel>
                        <Select
                            labelId='class-names'
                            value={newClass.name}
                            onChange={handleClassName}
                        >
                            {availableClassNames.map(name => {
                                return <MenuItem key={name} value={name}>{name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </span>
                        <FormControl>
                            <InputLabel id='choose-teacher'>
                                choose teacher as tutor
                            </InputLabel>
                            <Select
                                className={classes.input}
                                labelId='choose-teacher'
                                value={newClass.mainTeacher}
                                onChange={handleTutorChange}
                            >
                                <MenuItem value='unselected'>unselected</MenuItem>
                                {availableTutors.map(item => {
                                    return <MenuItem key={item.id}
                                                     value={item}>{`${item.lastName} ${item.firstName}`}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <Tooltip
                            title='Add class'
                            placement='bottom'
                            arrow
                            TransitionComponent={Fade}
                            enterDelay={1000}
                        >
                    <span>
                    <IconButton
                        className={classes.button}
                        onClick={addClassHandling}
                        disabled={!isPossible}
                    >
                        <GroupAddIcon/>
                    </IconButton>
                        </span>
                        </Tooltip>
                    </>
                }
            </Paper>
        </Paper>
    )
};

ClassesPanel.propTypes = {
    allClasses: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    addClass: PropTypes.func.isRequired,
    availableNames: PropTypes.object.isRequired,
    getClassGrade: PropTypes.func.isRequired,
    getPossibleTutors: PropTypes.func.isRequired
};

export default ClassesPanel;
