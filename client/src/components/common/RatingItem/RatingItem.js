import React from 'react';
import PropTypes from 'prop-types';

class RatingItem extends React.Component {
    state = {
        value: "",
        inputType: "text",
        possibleRatings: ["1", "1+", "2-", "2", "2+", "3-", "3", "3+", "4-", "4", "4+", "5-", "5", "5+", "6-", "6"]
    };

    componentDidMount() {
        const {rating} = this.props;
        this.setState({value: rating.value});
    }

    valueHandling = event => {
        this.setState({value: event.target.value})
    };

    typeHandling = isNumber => {
        isNumber ? this.setState({inputType: "number"}) : this.setState({inputType: "text"})
    };

    render() {
        const {value, inputType} = this.state;
        const {valueHandling, typeHandling} = this;
        return (
            <span>
                <input type={inputType} onClick={() => typeHandling(true)} style={{width: "2rem"}} value={value}
                       onChange={valueHandling} onBlur={() => typeHandling(false)} min={1} max={6}/>
            </span>
        )
    }
}

RatingItem.propTypes = {
    rating: PropTypes.object.isRequired
};

export default RatingItem;
