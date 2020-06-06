import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import {Paper, TextField} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Fade from '@material-ui/core/Fade';
import componentStyle from "./SelectItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const SelectItem = props => {
    const {list, selectName, buttonName, confirmSelect, isDisabled, isAdd, parentId} = props;
    const [selectedItem, setSelectedItem] = useState(null);
    const classes = useStyles();

    useEffect(() => {

        if (isDisabled) {
            setSelectedItem(null)
        }
    }, [isDisabled]);

    const changeHandling = value => {
        setSelectedItem(value)
    };

    const buttonHandling = () => {
        confirmSelect(selectedItem)
    };

    return (
        <Paper variant='outlined' className={clsx(classes.root, isDisabled && classes.progress)}>
            <Autocomplete
                disabled={isDisabled}
                id={parentId}
                value={selectedItem}
                renderInput={params => <TextField {...params} label={selectName}/>}
                getOptionLabel={student => `${student.lastName} ${student.firstName}`}
                options={list}
                style={{width: 240, paddingLeft: '15px'}}
                size='small'
                onChange={(e, value) => changeHandling(value)}
            />
            <Tooltip
                title={buttonName}
                arrow
                classes={{tooltip: classes.tooltip}}
                placement='top'
                TransitionComponent={Fade}
                TransitionProps={{timeout: 1000}}
            >
                <span className={isDisabled ? classes.progress : ''}>
                     <IconButton
                         className={isAdd ? classes.addButton : classes.removeButton}
                         disabled={isDisabled || selectedItem === null}
                         aria-label={buttonName}
                         onClick={buttonHandling}>
                    {isAdd ? <AddIcon/> : <RemoveIcon/>}
                    </IconButton>
                </span>
            </Tooltip>
        </Paper>
    )
};

SelectItem.propTypes = {
    list: PropTypes.array.isRequired,
    selectName: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    confirmSelect: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isAdd: PropTypes.bool.isRequired,
    parentId: PropTypes.string.isRequired
};

export default SelectItem;
