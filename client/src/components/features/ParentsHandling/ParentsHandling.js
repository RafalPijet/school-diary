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
import clsx from "clsx";
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../ParentItem/ParentItem';
import Alert from "../../common/Alert/Alert";
import componentStyle from "./ParentsHandlingStyle";
import TablePagination from "../../common/TablePagination/TablePagination";

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentsHandling = props => {
    const {
        loadParents,
        loadParent,
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
    const [selectedParent, setSelectedParent] = useState(null);
    const [page, setPage] = useState(0);
    const [isReady, setReady] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (!parentsName.length && !allStudents.length) {
            loadStudents();
            loadParentName('parent');
        }

        if (allStudents.length && !isReady) {
            setReady(true);
            loadParents(page + 1, 7);
        }

        if (request.pending) setSelectedItem(0);

        if (selectedParent === null && isSearch) {
            loadParents(page + 1, 7);
            setIsSearch(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allStudents.length, parents.length, page, request.pending, selectedParent]);

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
        setReady(false);
        setPage(newPage);
    };

    const handleSearch = value => {
        setSelectedParent(value);

        if (value !== null) {
            loadParent(value.id);
            setIsSearch(true);
            setPage(0);
        }
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
            <Grid container className={clsx(classes.content,
                !request.working && !request.pending && parents.length < 7 ? classes.noFull : '',
                (request.pending || request.working) ? classes.spinner : '')}>
                {request.pending || request.working ? <Spinner/> :
                    parents.map((parent, i) => {
                        return <ParentItem
                            i={i}
                            key={i}
                            parent={parent}
                            page={page}
                            selectedItem={selectedItem}
                            collapseHandling={collapseHandling}
                        />
                    })}
            </Grid>
            <TableContainer className={classes.footer} component={Paper}>
                <Autocomplete
                    hidden={request.working}
                    id='search-parent'
                    renderInput={params => <TextField {...params} label='Search parent'/>}
                    options={parentsName}
                    getOptionLabel={parent => parent.name}
                    size='small'
                    style={{width: 300, paddingLeft: '15px'}}
                    onChange={(e, value) => handleSearch(value)}
                />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <MaterialPagination
                                hidden={request.working || selectedParent !== null}
                                rowsPerPageOptions={[7]}
                                colSpan={3}
                                count={parentsName.length}
                                rowsPerPage={7}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
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
    loadParent: PropTypes.func.isRequired,
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
