import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/Button";

const SelectItem = props => {
    const {list, selectName, buttonName, confirmSelect} = props;
    const [selectedItem, setSelectedItem] = useState(list[0]);

    const changeHandling = e => {
        setSelectedItem(JSON.parse(e.target.value));
    };

    const buttonHandling = () => {
        confirmSelect(selectedItem)
    };

    return (
        <div>
            <select name={selectName} value={selectedItem} onChange={changeHandling}>
                <optgroup label={selectName}>
                    {list.map((item, i) => {
                        return <option key={i} value={JSON.stringify(item)}>
                            {`${item.firstName} ${item.lastName}`}
                        </option>
                    })}
                </optgroup>
            </select>
            <Button variant='success' onClick={buttonHandling}>{buttonName}</Button>
        </div>
    )
};

SelectItem.propTypes = {
    list: PropTypes.array.isRequired,
    selectName: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    confirmSelect: PropTypes.func.isRequired
};

export default SelectItem;
