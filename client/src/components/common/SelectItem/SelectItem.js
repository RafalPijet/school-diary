import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {InputLabel, MenuItem, FormHelperText, FormControl, Select, Button} from "@material-ui/core";
import './SelectItem.scss';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SelectItem = props => {
    const {list, selectName, buttonName, confirmSelect, isDisabled, helperText} = props;
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
        <div className='select-item-main'>
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
            <Button size='small' disabled={isDisabled} variant='outlined' color='primary'
                    onClick={buttonHandling}>{buttonName}</Button>
        </div>
    )
};

SelectItem.propTypes = {
    list: PropTypes.array.isRequired,
    selectName: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    confirmSelect: PropTypes.func.isRequired,
    helperText: PropTypes.string,
    isDisabled: PropTypes.bool.isRequired
};

export default SelectItem;
