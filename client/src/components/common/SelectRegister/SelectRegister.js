import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    disabled: {
        color: theme.palette.secondary.dark
    }
}));

const SelectRegister = props => {
    const {selectTitle, isDisabled, options, takeSelected, ...otherProps} = props;
    const [selectedItem, setSelectedItem] = useState(isDisabled === undefined ? options[0] : '');
    const classes = useStyles();

    useEffect(() => {

        if (isDisabled !== undefined && isDisabled) {
            setSelectedItem('')
        }
        takeSelected(selectedItem);
    }, [selectedItem, isDisabled, takeSelected]);

    return (
        <FormControl>
            <InputLabel
                className={isDisabled ? classes.disabled : ''}
                id={selectTitle}>{selectTitle}
            </InputLabel>
            <Select
                {...otherProps}
                labelId={selectTitle}
                id={`select-${selectTitle}`}
                disabled={isDisabled}
                value={selectedItem}
                onChange={event => setSelectedItem(event.target.value)}
                >
                {options.map((item, i) => {
                    return <MenuItem key={i} value={item}>{item}</MenuItem>

                })}
            </Select>
        </FormControl>
    )
};

SelectRegister.propTypes = {
    selectTitle: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    takeSelected: PropTypes.func.isRequired
};

export default SelectRegister;
