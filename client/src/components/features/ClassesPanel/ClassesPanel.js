import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, IconButton, Tooltip, Fade} from "@material-ui/core";
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
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Tooltip
                title='Add class'
                placement='bottom'
                arrow
                TransitionComponent={Fade}
                enterDelay={1000}
            >
                <IconButton
                    className={classes.button}

                >
                    <GroupAddIcon/>
                </IconButton>
            </Tooltip>
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
