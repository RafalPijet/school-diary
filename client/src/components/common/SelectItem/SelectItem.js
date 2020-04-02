import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Fade from '@material-ui/core/Fade';
import {InputLabel, MenuItem, FormHelperText, FormControl, Select} from "@material-ui/core";
// import './SelectItem.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.dark
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    addButton: {
        color: theme.palette.action.dark
    },
    removeButton: {
        color: theme.palette.action.light
    }
}));

const SelectItem = props => {
    const {list, selectName, buttonName, confirmSelect, isDisabled, helperText, isAdd} = props;
    const [selectedItem, setSelectedItem] = useState(list[0]);
    const classes = useStyles();

    useEffect(() => {
        setSelectedItem(list[0]);
    }, [setSelectedItem, list]);

    const changeHandling = e => {
        setSelectedItem(JSON.parse(e.target.value));
    };

    const buttonHandling = () => {
        confirmSelect(selectedItem)
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel id={selectName}>{selectName}</InputLabel>
                <Select
                    labelId={selectName}
                    id={`select-${selectName}`}
                    disabled={isDisabled}
                    value={selectedItem ? JSON.stringify(selectedItem) : ''}
                    onChange={changeHandling}
                >
                    {list.map(item => {
                        return <MenuItem
                            key={item.id}
                            value={JSON.stringify(item)}>
                            {`${item.firstName} ${item.lastName}`}
                        </MenuItem>
                    })}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            <Tooltip
                title={buttonName}
                arrow
                placement='top'
                TransitionComponent={Fade}
                TransitionProps={{timeout: 1000}}
            >
                <span>
                     <IconButton
                         className={isAdd ? classes.addButton : classes.removeButton}
                         disabled={isDisabled}
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
    helperText: PropTypes.string,
    isDisabled: PropTypes.bool.isRequired,
    isAdd: PropTypes.bool.isRequired
};

export default SelectItem;
