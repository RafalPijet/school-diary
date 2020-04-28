import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TableContainer, Paper, Table, TableBody} from '@material-ui/core';


const StudentsTable = props => {
    const {students} = props;
    const [page, setPage] = useState(0);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>

                    </TableBody>
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
