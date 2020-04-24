import React from 'react';
// import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from "@material-ui/core";
import RatingSubject from '../../features/RatingSubject/RatingSubject';
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: style.smallSize
    },
    header: {
        backgroundColor: theme.palette.action.header
    }
}));

const RatingSubjectList = props => {
    const {student} = props;
    const classes = useStyles();

    return (
        <TableContainer className={classes.root}>
            <Table aria-label="sticky table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Ratings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {student.ratings.map(item => {
                        return <RatingSubject key={item.id} ratings={item}/>
                    })}
                </TableBody>
                {/*<tbody>*/}
                {/*{student.ratings.map(item => {*/}
                {/*    return <RatingSubject key={item.id} ratings={item}/>*/}
                {/*})}*/}
                {/*</tbody>*/}
            </Table>
        </TableContainer>
    )
};

RatingSubjectList.propTypes = {
    student: PropTypes.object.isRequired
};

export default RatingSubjectList;
