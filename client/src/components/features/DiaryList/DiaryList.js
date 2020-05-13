import React, {useEffect} from 'react';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import componentStyle from "./DiaryListStyle";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import Paper from "@material-ui/core/Paper";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Link} from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import DiaryRow from '../../features/DiaryRow/DiaryRowContainer';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => componentStyle(theme));


const DiaryList = props => {
    const {students} = props.selectedClass;
    const {teacher, selectedClass, request, addSubjectRating} = props;
    const classes = useStyles();

    useEffect(() => {
        prepareSubjectRating();
    }, []);

    const prepareSubjectRating = () => {

        if (students.length) {
            students.forEach(student => {

                if (student.ratings.length) {
                    let ratingsSubject = student.ratings.map(rating => rating.subject);

                    if (!ratingsSubject.includes(teacher.subject)) {
                        addSubjectRating(student, teacher.subject);
                    }
                } else {
                    addSubjectRating(student, teacher.subject);
                }
            })
        }
    };

    return (
        <Paper elevation={3} className={classes.root}>
            {request.updating ? <Typography>{`Preparing data...`}</Typography> :
                <TableContainer className={classes.container}>

                    <Table aria-label="sticky table">
                        <TableHead className={classes.header}>
                            <TableRow>
                                <TableCell> </TableCell>
                                <TableCell align='left'
                                           className={clsx(classes.row, classes.student)}>Student</TableCell>
                                <TableCell align='left' className={classes.row}>
                                    Ratings
                                    <div className={classes.classInfo}>
                                        <Typography className={classes.tutor}>{'tutor: '}
                                            <Link href={`mailto:${selectedClass.mainTeacher.email}`} className={classes.tutorContent}>
                                                {selectedClass.mainTeacher.firstName} {selectedClass.mainTeacher.lastName}
                                            </Link>
                                        </Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student, i) => {
                                return <DiaryRow
                                    classId={selectedClass.id}
                                    key={student.id}
                                    student={student}
                                    i={i}
                                    teacher={teacher}
                                />
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Paper>
    )
};

DiaryList.propTypes = {
    selectedClass: PropTypes.object.isRequired,
    teacher: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    addSubjectRating: PropTypes.func.isRequired
};

export default DiaryList;
