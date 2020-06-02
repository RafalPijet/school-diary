import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {
    TextField,
    TableContainer,
    Grid,
    Paper,
    Table,
    TableRow,
    TableFooter,
    Typography,
    TablePagination as MaterialPagination
} from '@material-ui/core';
import Spinner from "../../common/Spinner/Spinner";
import TablePagination from "../../common/TablePagination/TablePagination";
import StudentItem from "../StudentItem/StudentItemContainer";
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import componentStyle from './StudentsTableStyle'

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentsTable = props => {
    const {
        selectedStudents,
        allStudents,
        loadStudentsNames,
        loadStudentsWithRange,
        request,
        modalYesNot,
        setModalYesNot,
        deleteStudent,
        getStudent
    } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [studentIdUpdated, setStudentIdUpdated] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const classes = useStyles();

    useEffect(() => {

        if (!allStudents.length) loadStudentsNames();
        if (selectedStudent === null) loadStudentsWithRange(page + 1, rowsPerPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, selectedStudent]);

    const handleDeleteStudent = isConfirm => {
        const {studentId} = modalYesNot.content.data;

        if (isConfirm) deleteStudent(studentId);
        setModalYesNot(false, {
            description: '',
            data: {}
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getStudentIdUpdated = studentId => {
        setStudentIdUpdated(studentId);
    };

    const handleSearch = value => {
        setSelectedStudent(value);

        if (value !== null) getStudent(value.id)
    };

    return (
        <Grid container justify='center' alignItems='center' style={{height: '470px'}}>
            {request.working ? <Spinner/> :
                <>
                    <Paper className={classes.header}>
                        <Grid container style={{padding: '8px 14px'}}>
                            <Grid item lg={6}>
                                <Typography className={classes.title} variant='subtitle2' display='inline'>
                                    student's name
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
                            <Grid item lg={2} className={classes.item}>
                                <Typography className={classes.title} variant='subtitle2' display='inline'>
                                    operations
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={clsx(classes.table, request.geting ? classes.spinner : '')}>
                        {request.geting ? <Spinner/> :
                            <>
                                {selectedStudents.map(student => (
                                     <StudentItem
                                         key={student.id}
                                         student={student}
                                         studentIdUpdated={studentIdUpdated}
                                         getStudentIdUpdated={getStudentIdUpdated}
                                     />
                                ))}

                            </>
                        }
                        <ModalAreYouSure
                            description={modalYesNot.content.description}
                            isOpen={modalYesNot.isOpen}
                            isConfirm={handleDeleteStudent}/>
                    </Paper>
                    <TableContainer className={classes.footer} component={Paper}>
                        <Autocomplete
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
                                        hidden={selectedStudent !== null}
                                        rowsPerPageOptions={[5, 10, 25]}
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
                </>
            }
        </Grid>
    )
};

StudentsTable.propTypes = {
    selectedStudents: PropTypes.arrayOf(PropTypes.shape({
        parents: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        className: PropTypes.string,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired
    })),
    loadStudentsWithRange: PropTypes.func.isRequired,
    loadStudentsNames: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    allStudents: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    modalYesNot: PropTypes.object.isRequired,
    setModalYesNot: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    getStudent: PropTypes.func.isRequired
};

export default StudentsTable;
