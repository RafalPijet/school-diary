import React, {useState} from 'react';
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
    TextField
} from "@material-ui/core";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import componentStyle from './ClassesPanelStyle'

const useStyles = makeStyles(theme => componentStyle(theme));

const ClassesPanel = props => {
    const {allClasses, addClass, loadTeachers, request, teachers} = props;
    const [newClass, setNewClass] = useState({
        name: 'Class ',
        mainTeacher: {},
    });
    const [isVisible, setIsVisible] = useState(false);
    const [tutor, setTutor] = useState({});
    const [availableTutors, setAvailableTutors] = useState([]);
    const [availableClassTypes, setAvailableClassTypes] = useState([]);
    const [classType, setClassType] = useState('');
    const classes = useStyles();

    const addClassHandling = () => {
        console.log('add class');
    };

    const handleTutorChange = event => {
        setTutor(event.target.value)
    };

    const handleClassType = event => {
        setClassType(event.target.value)
    };

    const handleClassName = event => {
        setNewClass({...newClass, name: event.target.value})
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <span className={classes.classType}>
                <FormControl>
                <InputLabel id='choose-class-type'>
                    choose class type
                </InputLabel>
                <Select
                    className={classes.input}
                    labelId='choose-class-type'
                    value={classType}
                    onChange={handleClassType}
                >
                    {availableClassTypes.map((item, i) => {
                        return <MenuItem key={i} value={item}/>
                    })}
                </Select>
            </FormControl>
            </span>
            <Paper variant='outlined' className={classes.addClass}>
                <TextField
                    className={classes.input}
                    value={newClass.name}
                    label='class name'
                    onChange={handleClassName}
                />
                <FormControl>
                    <InputLabel id='choose-teacher'>
                        choose teacher as tutor
                    </InputLabel>
                    <Select
                        className={classes.input}
                        labelId='choose-teacher'
                        value={tutor}
                        onChange={handleTutorChange}
                    >
                        {availableTutors.map((tutor, i) => {
                            return <MenuItem key={i} value={`${tutor.lastName} ${tutor.firstName}`}/>
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
                    <IconButton
                        className={classes.button}
                        onClick={addClassHandling}
                    >
                        <GroupAddIcon/>
                    </IconButton>
                </Tooltip>
            </Paper>
        </Paper>
    )
};

ClassesPanel.propTypes = {
    allClasses: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    addClass: PropTypes.func.isRequired
};

export default ClassesPanel;
