import React from 'react';
import PropTypes from 'prop-types';
import './RatingsOptions.scss';

class RatingOptions extends React.Component {
    state = {
        plus: false,
        empty: true,
        minus: false
    };

    componentWillReceiveProps(nextProps) {

        if (!nextProps.isNewRating.isNew) {
            this.setState({
                plus: false,
                empty: true,
                minus: false
            })
        }
    }

    changeHandling = event => {
        const {setIsPlus} = this.props;
        if (event.target.id === 'plus') {
            this.setState({
                plus: true,
                empty: false,
                minus: false
            })
        } else if (event.target.id === 'minus') {
            this.setState({
                plus: false,
                empty: false,
                minus: true
            })
        } else {
            this.setState({
                plus: false,
                empty: true,
                minus: false
            })
        }
        setIsPlus(event.target.value);
    };

    render() {
        const {studentId, hidden} = this.props;
        const {plus, empty, minus} = this.state;
        const {changeHandling} = this;
        return (
            <div className='options-main' hidden={hidden}>
                <div className='plus-or-minus'>
                    <span>+<input onChange={changeHandling} type='radio' name={studentId}
                                  value={true} checked={plus} title="value +" id='plus'/></span>
                    <span>=<input onChange={changeHandling} type='radio' name={studentId}
                                  value={'undefined'} checked={empty} title="only value" id='empty'/></span>
                    <span>-<input onChange={changeHandling} type='radio' name={studentId}
                                  value={false} checked={minus} title="value -" id='minus'/></span>
                </div>
            </div>
        )
    }
}

RatingOptions.propTypes = {
    studentId: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    setIsPlus: PropTypes.func.isRequired,
    isNewRating: PropTypes.object
};

export default RatingOptions;
