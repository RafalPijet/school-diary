import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Paper,
    Grid,
    Typography,
    TableContainer,
    Table,
    TableFooter,
    TableRow,
    TextField,
    TablePagination as MaterialPagination
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import Spinner from "../../common/Spinner/Spinner";
import TablePagination from "../../common/TablePagination/TablePagination";
import TeacherStudentItem from "../TeacherStudentItem/TeacherStudentItem";
import componentStyle from "./TeacherDataStydentsStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherDataStudents = props => {
    const {
        request,
        teacherAllClass,
        loadTeacherStudentsName,
        allStudents,
        loadTeacherStudents,
        classesStudents,
        clearAllStudents,
        clearClassesStudents
    } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const classes = useStyles();

    useEffect(() => {

        if (teacherAllClass.length) {
            let classesId = teacherAllClass.map(classItem => classItem.id);
            loadTeacherStudentsName(classesId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherAllClass]);

    useEffect(() => {

        if (allStudents.length && selectedStudent === null) {
            let studentsByRange = allStudents.slice(page * rowsPerPage,
                page * rowsPerPage + rowsPerPage);
            loadTeacherStudents(studentsByRange);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allStudents.length, page, rowsPerPage, selectedStudent]);

    useEffect(() => {
        return () => {
            clearClassesStudents([]);
            clearAllStudents([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = value => {
        setSelectedStudent(value);

        if (value !== null) loadTeacherStudents([value]);
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <Grid container style={{padding: '8px 14px'}}>
                <Grid item lg={4}>
                    <Typography className={classes.title} variant='subtitle2' display='inline'>
                        student name
                    </Typography>
                </Grid>
                <Grid item lg={2} className={classes.item}>
                    <Typography className={classes.title} variant='subtitle2' display='inline'>
                        birth date
                    </Typography>
                </Grid>
                <Grid item lg={2} className={classes.item}>
                    <Typography className={classes.title} variant='subtitle2' display='inline'>
                        class
                    </Typography>
                </Grid>
                <Grid item lg={4} className={classes.item}>
                    <Typography className={classes.title} variant='subtitle2' display='inline'>
                        parents
                    </Typography>
                </Grid>
                <div className={clsx(classes.table, (request.geting || !classesStudents.length) ? classes.center : '')}>
                    {request.geting ? <Spinner/> :
                        classesStudents.length ?
                            classesStudents.map(student => {
                                return <TeacherStudentItem key={student.id} student={student}/>
                            }) :
                            !allStudents.length ?
                                <Typography align='center' style={{fontSize: 18}}>
                                    You have no students assigned!
                                </Typography> : <Spinner/>
                    }
                </div>
                <TableContainer className={classes.footer} component={Paper}>
                    <Autocomplete
                        disabled={!allStudents.length}
                        id='search-student'
                        options={allStudents}
                        getOptionLabel={student => student.name}
                        style={{width: 300, paddingLeft: '15px'}}
                        size='small'
                        onChange={(e, value) => handleSearch(value)}
                        renderInput={params => <TextField {...params} label="Search student"/>}
                    />
                    <Table>
                        <TableFooter>
                            <TableRow>
                                <MaterialPagination
                                    hidden={selectedStudent !== null || !allStudents.length}
                                    rowsPerPageOptions={[6, 12, 20]}
                                    colSpan={3}
                                    count={allStudents.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {'aria-label': 'rows per page'},
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePagination}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Paper>
    )
};

TeacherDataStudents.propTypes = {
    request: PropTypes.object.isRequired,
    teacherAllClass: PropTypes.array.isRequired,
    loadTeacherStudentsName: PropTypes.func.isRequired,
    allStudents: PropTypes.array.isRequired,
    loadTeacherStudents: PropTypes.func.isRequired,
    classesStudents: PropTypes.array.isRequired,
    clearAllStudents: PropTypes.func.isRequired,
    clearClassesStudents: PropTypes.func.isRequired
};

export default TeacherDataStudents;
