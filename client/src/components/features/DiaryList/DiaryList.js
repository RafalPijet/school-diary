import React from 'react';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import componentStyle from "./DiaryListStyle";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Link} from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DiaryRow from '../../features/DiaryRow/DiaryRowContainer';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => componentStyle(theme));


const DiaryList = props => {
    const {students} = props.selectedClass;
    const {teacher, selectedClass} = props;
    const classes = useStyles();
    console.log(props.selectedClass);
    return (
        <TableContainer className={classes.root}>
            <div className={classes.classInfo}>
                <Typography className={classes.tutor}>{'tutor: '}
                    <Link href={`mailto:${selectedClass.mainTeacher.email}`} className={classes.tutorContent}>
                        {selectedClass.mainTeacher.firstName} {selectedClass.mainTeacher.lastName}
                    </Link>
                </Typography>
            </div>
            <Table aria-label="sticky table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align='left' className={clsx(classes.row, classes.student)}>Student</TableCell>
                        <TableCell align='left' className={classes.row}>Ratings</TableCell>
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
