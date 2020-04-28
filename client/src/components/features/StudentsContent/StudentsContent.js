import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import StudentsTable from "../StudentsTable/StudentsTableContainer";

const useStyles = makeStyles({
    root: {
        height: '480px'
    }
});

const StudentsContent = props => {
    const {isAdding} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {isAdding ? <div>Adding</div> : <StudentsTable/>}
        </div>
    )
};

StudentsContent.propTypes = {
  isAdding: PropTypes.bool.isRequired
};

export default StudentsContent;
