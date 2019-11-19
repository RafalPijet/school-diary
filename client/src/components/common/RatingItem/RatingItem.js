import React from 'react';
import PropTypes from 'prop-types';

class RatingItem extends React.Component {
    state = {
        value: "",
        inputType: "text",
    };

    componentDidMount() {
        const {rating} = this.props;
        this.setState({value: rating.value});
    }

    componentWillReceiveProps(nextProps) {

        // if (this.state.inputType === "text") {
            console.log(nextProps.rating);
            this.setState({value: nextProps.rating.value});
        // }
    }

    valueHandling = event => {
        this.setState({value: event.target.value})
    };

    typeHandling = isNumber => {
        const {ratingValueHandling} = this.props;
        const {value} = this.state;
        // isNumber ? this.setState({inputType: "number"}) : this.setState({inputType: "text"});

        if (!isNumber) {
            ratingValueHandling(value);
        } else {
            this.setState({inputType: "number"});
        }
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
    rating: PropTypes.object.isRequired,
    ratingValueHandling: PropTypes.func.isRequired
};

export default RatingItem;
