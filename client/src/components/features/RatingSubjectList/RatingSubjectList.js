import React from 'react';
import clsx from "clsx";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";
import RatingSubject from '../../features/RatingSubject/RatingSubject';
import componentStyle from './RatingSubjectListStyle';

const useStyles = makeStyles(theme => componentStyle(theme));

const RatingSubjectList = props => {
    const {student} = props;
    const classes = useStyles();

    return (
        <TableContainer className={classes.root}>
            <Table aria-label="sticky table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={clsx(classes.title, classes.subject)}>Subject</TableCell>
                        <TableCell align='center' className={classes.title}>Ratings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {student.ratings.map(item => {
                        return <RatingSubject key={item.id} rating={item}/>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

RatingSubjectList.propTypes = {
    student: PropTypes.object.isRequired
};

export default RatingSubjectList;
