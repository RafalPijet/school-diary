import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
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
import TeacherItem from "../TeacherItem/TeacherItem";
import componentStyle from "./TeachersHandlingStyle";
import TablePagination from "../../common/TablePagination/TablePagination";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeachersHandling = props => {
    const {
        teachers,
        teachersName,
        request,
        loadTeachersName,
        loadTeachers,
        loadTeacher
    } = props;
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [page, setPage] = useState(0);
    const [isReady, setReady] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [isSearch, setIsSearch] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (!teachersName.length) {
            loadTeachersName('teacher');
        }

        if (!isReady) {
            loadTeachers(page + 1, rowsPerPage);
            setReady(true);
        }

        if (selectedTeacher === null && isSearch) {
            loadTeachers(page + 1, rowsPerPage);
            setIsSearch(false);
        }

    }, [teachersName, page, rowsPerPage, selectedTeacher]);

    const handleSearch = value => {
        setSelectedTeacher(value);

        if (value !== null) {
            loadTeacher(value.id);
            setIsSearch(true);
            setPage(0);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setReady(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setReady(false);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container className={classes.info}>
                <Grid item lg={4}>
                    <Typography variant='subtitle2' color='primary'>Names/Subject</Typography>
                </Grid>
                <Grid item lg={2} style={{paddingLeft: '20px'}}>
                    <Typography variant='subtitle2' color='primary'>Phone</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography variant='subtitle2' color='primary'>Email</Typography>
                </Grid>
                <Grid item lg={1}>
                    <Typography variant='subtitle2' color='primary'>Tutor</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='right' variant='subtitle2' color='primary'>Class/Students</Typography>
                </Grid>
                <Grid item lg={1}> </Grid>
            </Grid>
            <Grid container className={clsx(classes.content,
                (request.working || request.pending) ? classes.center : '',
                teachers.length < 7 ? classes.column : '')}>
                {(request.working || request.pending) ? <Spinner/> :
                    teachers.map(teacher => {
                        return <TeacherItem key={teacher.id} teacher={teacher}/>
                    })
                }
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
                                rowsPerPageOptions={[7, 15, 25]}
                                colSpan={3}
                                count={teachersName.length}
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
        </Paper>
    )
};

TeachersHandling.propTypes = {
    teachers: PropTypes.array.isRequired,
    teachersName: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachersName: PropTypes.func.isRequired,
    loadTeachers: PropTypes.func.isRequired,
    loadTeacher: PropTypes.func.isRequired
};

export default TeachersHandling;
