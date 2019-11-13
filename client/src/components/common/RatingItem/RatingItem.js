import React from 'react';
import PropTypes from 'prop-types';

class RatingItem extends React.Component {
    state = {
        value: "",
        possibleRatings: ["1", "1+", "2-", "2", "2+", "3-", "3", "3+", "4-", "4", "4+", "5-", "5", "5+", "6-", "6"]
    };

    componentDidMount() {
        const {rating} = this.props;
        this.setState({value: rating.value});
    }

    valueHandling = event => {
        this.setState({value: event.target.value})
    };

    render() {
        const {value} = this.state;
        return (
            <span>
                <input style={{width: "2rem"}} value={value} onChange={this.valueHandling}/>
            </span>
        )
    }
}

RatingItem.propTypes = {
    rating: PropTypes.object.isRequired
};

export default RatingItem;
