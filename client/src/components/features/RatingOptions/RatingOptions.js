import React from 'react';
import PropTypes from 'prop-types';
import './RatingsOptions.scss';

class RatingOptions extends React.Component {
    render() {
        const {studentId, hidden, setIsPlus} = this.props;
        return (
            <div className='options-main' hidden={hidden}>
                <div className='plus-or-minus'>
                    <span>+<input onChange={event => setIsPlus(event.target.value)} type='radio' name={studentId}
                                  value={true} defaultChecked={false} title="value+"/></span>
                    <span>=<input onChange={event => setIsPlus(event.target.value)} type='radio' name={studentId}
                                  value={'undefined'} defaultChecked={true} title="only value"/></span>
                    <span>-<input onChange={event => setIsPlus(event.target.value)} type='radio' name={studentId}
                                  value={false} defaultChecked={false} title="value-"/></span>
                </div>
            </div>
        )
    }
}

RatingOptions.propTypes = {
    studentId: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    setIsPlus: PropTypes.func.isRequired
};

export default RatingOptions;
