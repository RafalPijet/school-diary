import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../ParentItem/ParentItem';
import Alert from "../../common/Alert/Alert";
import componentStyle from "./ParentsHandlingStyle";
import TablePagination from "../../common/TablePagination/TablePagination";

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentsHandling = props => {
    const {
        loadParents,
        loadStudents,
        loadParentName,
        request,
        parents,
        parentsName,
        resetRequest,
        allStudents,
        clearParents,
        clearStudents,
        clearParentsName,
        alertSuccess,
        setAlertSuccess
    } = props;
    const [selectedItem, setSelectedItem] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isReady, setReady] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (!parentsName.length && !allStudents.length) {
            loadStudents();
            loadParentName();
        }

        if (allStudents.length && !isReady) {
            setReady(true);
            loadParents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allStudents.length, parents.length]);

    useEffect(() => {
        return () => {
            resetRequest();
            clearParents([]);
            clearStudents([]);
            clearParentsName([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const collapseHandling = index => {
        setSelectedItem(index);
    };

    const handleCloseAlert = () => {
        request.error ? resetRequest() : setAlertSuccess(false, '')
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
                <Grid item lg={2}>
                    <Typography variant='subtitle2' color='primary'>Last name</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography variant='subtitle2' color='primary'>First name</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography style={{paddingLeft: '26px'}} variant='subtitle2' color='primary'>Phone</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center' variant='subtitle2' color='primary'>Email</Typography>
                </Grid>
                <Grid item lg={3}>
                    <Typography style={{paddingLeft: '34px'}} variant='subtitle2' color='primary'>Students</Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.content}>
                {request.pending || request.working ? <Spinner/> :
                    parents.map((parent, i) => {
                        return <ParentItem
                            i={i}
                            key={i}
                            parent={parent}
                            selectedItem={selectedItem}
                            collapseHandling={collapseHandling}
                        />
                    })}
            </Grid>
            <TableContainer className={classes.footer} component={Paper}>
                <Autocomplete
                    id='search-parent'
                    renderInput={params => <TextField {...params} label='Search parent'/>}
                    options={parentsName}
                    getOptionLabel={parent => parent.name}
                    size='small'
                    style={{width: 300, paddingLeft: '15px'}}
                />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <MaterialPagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={parents.length}
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
                variant={request.error ? 'error' : 'success'}
                message={request.error ? request.error : alertSuccess.message}
                handleCloseHandling={handleCloseAlert}
            />
        </Paper>
    )
};

ParentsHandling.propTypes = {
    loadParents: PropTypes.func.isRequired,
    loadStudents: PropTypes.func.isRequired,
    loadParentName: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
    parentsName: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    allStudents: PropTypes.array.isRequired,
    clearParents: PropTypes.func.isRequired,
    clearStudents: PropTypes.func.isRequired,
    clearParentsName: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired
};

export default ParentsHandling;
