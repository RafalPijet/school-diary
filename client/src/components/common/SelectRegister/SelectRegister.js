import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";

const SelectRegister = props => {
    const {selectTitle, isDisabled, options, takeSelected, ...otherProps} = props;
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        takeSelected(selectedItem);
        console.log('wow');
    }, [selectedItem]);

    return (
        <FormControl>
            <InputLabel id={selectTitle}>{selectTitle}</InputLabel>
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
