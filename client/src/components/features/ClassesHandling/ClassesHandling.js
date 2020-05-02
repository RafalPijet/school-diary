import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import Spinner from "../../common/Spinner/Spinner";
import ClassesPanel from "../ClassesPanel/ClassesPanelContainer";
import ClassBox from "../ClassBox/ClassBoxContainer";
import componentStyle from "./ClassesHandlingStyle";

const useStyles = makeStyles(theme => componentStyle(theme));


const ClassesHandling = props => {
    const {request, loadAllClasses, resetRequest} = props;
    const classes = useStyles();

    useEffect(() => {
        resetRequest();
        loadAllClasses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Paper variant='outlined' className={classes.root}>
            {request.pending && <Spinner/>}
            {request.success &&
            <>
                <ClassesPanel/>
                {/*<ClassBox/>*/}
            </>
            }
        </Paper>
    )
};

ClassesHandling.propTypes = {
    request: PropTypes.object.isRequired,
    loadAllClasses: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired
};

export default ClassesHandling;
