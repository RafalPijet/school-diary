import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Grid,
    Typography,
    TableContainer,
    Table,
    TableFooter,
    TableRow,
    TablePagination as MaterialPagination,
    TextField
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import Spinner from "../../common/Spinner/Spinner";
import componentStyle from "./TeachersHandlingStyle";
import TablePagination from "../../common/TablePagination/TablePagination";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeachersHandling = props => {
    const {teachersName, request, loadTeachersName, loadTeachers} = props;
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();

    useEffect(() => {

        if (!teachersName.length) {
            loadTeachersName('teacher');
        }

        loadTeachers(page + 1, rowsPerPage);
    }, [teachersName, page, rowsPerPage]);

    const handleSearch = value => {
        setSelectedTeacher(value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container className={classes.info}>
                <Grid item lg={1}>
                    <Typography variant='subtitle2' color='primary'>Pos</Typography>
                </Grid>
                <Grid item lg={4}>
                    <Typography variant='subtitle2' color='primary'>Names - subject</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center' variant='subtitle2' color='primary'>Phone</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center' variant='subtitle2' color='primary'>Email</Typography>
                </Grid>
                <Grid item lg={1}>
                    <Typography align='center' variant='subtitle2' color='primary'>Tutor</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center' variant='subtitle2' color='primary'>Classes</Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.content}>
                {(request.working || request.pending) && <Spinner/>}
            </Grid>
            <TableContainer className={classes.footer} component={Paper}>
                <Autocomplete
                    hidden={!teachersName.length}
                    id='search-teacher'
                    renderInput={params => <TextField {...params} label='Search teacher'/>}
                    options={teachersName}
                    getOptionLabel={teacher => teacher.name}
                    size='small'
                    style={{width: 300, paddingLeft: '15px'}}
                    onChange={(e, value) => handleSearch(value)}
                />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <MaterialPagination
                                hidden={!teachersName.length}
                                rowsPerPageOptions={[10, 20, 30]}
                                colSpan={3}
                                count={teachersName.length}
                                rowsPerPage={7}
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
        </Paper>
    )
};

TeachersHandling.propTypes = {
    teachersName: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachersName: PropTypes.func.isRequired,
    loadTeachers: PropTypes.func.isRequired
};

export default TeachersHandling;
