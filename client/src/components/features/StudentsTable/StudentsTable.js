import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {
    TableContainer,
    Grid,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
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
        deleteStudent
    } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();

    useEffect(() => {

        if (!allStudents.length) loadStudentsNames();
        loadStudentsWithRange(page + 1, rowsPerPage);
    }, [page, rowsPerPage]);

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

    return (
        <Grid container justify='center' alignItems='center' style={{height: '470px'}}>
            {request.working ? <Spinner/> :
                <>
                    <Paper className={clsx(classes.table, request.geting ? classes.spinner : '')}>
                        {request.geting ? <Spinner/> :
                            <>
                                {selectedStudents.map(student => (
                                     <StudentItem key={student.id} student={student}/>
                                ))}

                            </>
                        }
                        <ModalAreYouSure
                            description={modalYesNot.content.description}
                            isOpen={modalYesNot.isOpen}
                            isConfirm={handleDeleteStudent}/>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableFooter>
                                <TableRow>
                                    <MaterialPagination
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
    deleteStudent: PropTypes.func.isRequired
};

export default StudentsTable;
