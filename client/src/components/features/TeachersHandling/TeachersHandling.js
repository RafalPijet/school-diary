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
import Alert from "../../common/Alert/Alert";
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import TeacherItem from "../TeacherItem/TeacherItemContainer";
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
        loadTeacher,
        resetRequest,
        modalYesNot,
        setModalYesNot,
        alertSuccess,
        setAlertSuccess,
        deleteTeacher,
        clearTeachers,
        clearTeachersName
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teachersName, page, rowsPerPage, selectedTeacher]);

    useEffect(() => {
        return () => {
            clearTeachersName([]);
            clearTeachers([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const errorHandling = async () => {
        await resetRequest();
        await setPage(0);
        await loadTeachersName('teacher');
        loadTeachers(page + 1, rowsPerPage);
    };

    const alertHandling = () => {
        setAlertSuccess(false, '')
    };

    const deleteHandling = async isDelete => {
        let teacherId = await modalYesNot.content.data.id;
        setModalYesNot(false, {
            description: '',
            data: {}
        });

        if (isDelete) deleteTeacher(teacherId, page, rowsPerPage)
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container className={classes.info}>
                <Grid item lg={4}>
                    <Typography className={classes.description} color='primary'>Names/Subject</Typography>
                </Grid>
                <Grid item lg={2} style={{paddingLeft: '20px'}}>
                    <Typography className={classes.description} color='primary'>Phone</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography className={classes.description} color='primary'>Email</Typography>
                </Grid>
                <Grid item lg={1}>
                    <Typography className={classes.description} color='primary'>Class teacher</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='right' className={classes.description} color='primary'>Class/Students</Typography>
                </Grid>
                <Grid item lg={1}> </Grid>
            </Grid>
            <Grid container className={clsx(classes.content,
                (request.working || request.pending) ? classes.center : '',
                teachers.length < 7 ? classes.column : '')}>
                {(request.working || request.pending) ? <Spinner/> :
                    isReady && teachers.length && teachers.map(teacher => {
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
                                hidden={!teachersName.length || isSearch}
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
            <Alert
                isOpenAlert={request.error !== null || alertSuccess.isOpen}
                variant={alertSuccess.isOpen ? 'success' : 'error'}
                message={alertSuccess.isOpen ? alertSuccess.message : request.error}
                handleCloseHandling={alertSuccess.isOpen ? alertHandling : errorHandling}
            />
            <ModalAreYouSure
                description={modalYesNot.content.description}
                isOpen={modalYesNot.isOpen}
                isConfirm={deleteHandling}
            />
        </Paper>
    )
};

TeachersHandling.propTypes = {
    teachers: PropTypes.array.isRequired,
    teachersName: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachersName: PropTypes.func.isRequired,
    loadTeachers: PropTypes.func.isRequired,
    loadTeacher: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    modalYesNot: PropTypes.object.isRequired,
    setModalYesNot: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired,
    deleteTeacher: PropTypes.func.isRequired,
    clearTeachers: PropTypes.func.isRequired,
    clearTeachersName: PropTypes.func.isRequired
};

export default TeachersHandling;
