import React from 'react';
import PropTypes from 'prop-types';
import './RatingsOptions.scss';

class RatingOptions extends React.Component {
    render() {
        const {studentId, hidden, plusOrMinus} = this.props;
        return (
            <div className='options-main' hidden={hidden}>
                <div className='plus-or-minus'>
                    <span>+<input onChange={event => plusOrMinus(event)} type='radio' name={studentId} value="+"/></span>
                    <span>-<input onChange={event => plusOrMinus(event)} type='radio' name={studentId} value="-"/></span>
                </div>
            </div>
        )
    }
}

RatingOptions.propTypes = {
    studentId: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    plusOrMinus: PropTypes.func.isRequired
};

export default RatingOptions;
