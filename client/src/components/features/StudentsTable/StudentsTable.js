import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination as MaterialPagination
} from '@material-ui/core';
import TablePagination from "../../common/TablePagination/TablePagination";

const StudentsTable = props => {
    const {students} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {(rowsPerPage > 0 ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                            students).map(student => (
                            <TableRow key={student.id}>
                                <TableCell component='th' scope='row'>
                                    {`${student.lastName} ${student.firstName}`}
                                </TableCell>
                                <TableCell align='center'>
                                    {student.birthDate.substring(0, 10)}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <MaterialPagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={students.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
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
        </div>
    )
};

StudentsTable.propTypes = {
    students: PropTypes.arrayOf(PropTypes.shape({
        ratings: PropTypes.array.isRequired,
        parents: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired
    }))
};

export default StudentsTable;
