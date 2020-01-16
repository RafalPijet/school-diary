import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import './SelectItem.scss';

const SelectItem = props => {
    const {list, selectName, buttonName, confirmSelect, isDisabled} = props;
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        setSelectedItem(list[0]);
    }, [setSelectedItem, list]);

    const changeHandling =  e => {
        setSelectedItem(JSON.parse(e.target.value));
    };

    const buttonHandling = () => {
        confirmSelect(selectedItem)
    };

    return (
        <div>
            <select className='select-item-main' disabled={isDisabled} name={selectName} value={JSON.stringify(selectedItem)} onChange={changeHandling}>
                <optgroup label={selectName}>
                    {list.map((item, i) => {
                        return <option key={i} value={JSON.stringify(item)}>
                            {`${item.firstName} ${item.lastName}`}
                        </option>
                    })}
                </optgroup>
            </select>
            <Button
                variant={isDisabled ? 'danger progress-votes' : 'success not-progress'}
                disabled={isDisabled}
                onClick={buttonHandling}>
                {buttonName}
            </Button>
        </div>
    )
};

SelectItem.propTypes = {
    list: PropTypes.array.isRequired,
    selectName: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    confirmSelect: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default SelectItem;
