import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import componentStyle from './ParentDataStyle';

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentData = props => {
    const {request, user, getClassesName} = props;
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {

        if (Object.values(user.students).length && !isReady) {
            let studentsId = user.students.map(student => student.id);
            getClassesName(studentsId);
            setIsReady(true);
        }
    }, [user, isReady]);

    const classes = useStyles();
    return (
        <Paper variant='outlined' className={classes.root}>

        </Paper>
    )
};

ParentData.propTypes = {
    request: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getClassesName: PropTypes.func.isRequired
};

export default ParentData;
