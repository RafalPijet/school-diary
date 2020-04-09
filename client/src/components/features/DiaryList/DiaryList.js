import React from 'react';
// import {Table} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DiaryRow from '../../features/DiaryRow/DiaryRowContainer';
import {style} from "../../../styles/global";

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '300px',
        paddingTop: style.baseSize
    }
});

const DiaryList = props => {
    const {students} = props.selectedClass;
    const {teacher} = props;
    const classes = useStyles();
    return (
        <TableContainer className={classes.root}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align='left'>Student</TableCell>
                        <TableCell align='left'>Ratings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student, i) => {
                        return <DiaryRow key={student.id} student={student} i={i} teacher={teacher}/>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

DiaryList.propTypes = {
    selectedClass: PropTypes.object.isRequired,
    teacher: PropTypes.object.isRequired
};

export default DiaryList;
