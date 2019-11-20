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

        if (!nextProps.isNewRating.isNew) {
            this.setState({
                inputType: "text",
                value: nextProps.rating.value
            })
        }
    }

    valueHandling = event => {
        const {setRatingValue, isNewRating} = this.props;
        this.setState({value: event.target.value});

        if (isNewRating.isNew) {
            setRatingValue(event.target.value);
        }
    };

    render() {
        const {value, inputType} = this.state;
        const {valueHandling} = this;
        return (
            <span>
                <input type={inputType} onClick={() => this.setState({inputType: "number"})} style={{width: "2rem"}} value={value}
                       onChange={valueHandling} min={1} max={6}/>
            </span>
        )
    }
}

RatingItem.propTypes = {
    rating: PropTypes.object.isRequired,
    isNewRating: PropTypes.object.isRequired,
    setRatingValue: PropTypes.func.isRequired
};

export default RatingItem;
