import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import './RatingsOptions.scss';

class RatingOptions extends React.Component {
    state = {
        halfValue: '',
        descValue: this.props.ratingDescriptions[0],
        scaleValue: this.props.ratingScales[0]
    };

    componentWillReceiveProps(nextProps) {

        if (!nextProps.isNewRating.isNew) {
            this.setState({
                halfValue: '',
                descValue: nextProps.ratingDescriptions[0],
                scaleValue: nextProps.ratingScales[0]
            })
        }
    }

    selectHandling = async event => {
        const {setIsPlus, setDescription, setScales} = this.props;
        await this.setState({[event.target.name]: event.target.value});
        await setIsPlus(this.state.halfValue);
        await setDescription(this.state.descValue);
        await setScales(this.state.scaleValue)
    };

    render() {
        const {hidden, ratingDescriptions, ratingScales, ratingValue, cancelHandling} = this.props;
        const {halfValue, descValue, scaleValue} = this.state;
        const {selectHandling} = this;
        return (
            <div className='options-main' hidden={hidden}>
                <div className="select-main">
                    <select value={descValue} name="descValue" onChange={selectHandling}
                            title="select description of rating">
                        <optgroup label="description">
                            {ratingDescriptions.map((desc, i) => {
                                return <option key={i} value={desc}>{desc}</option>
                            })}
                        </optgroup>
                    </select>
                    <div className="second-row">
                        <select value={halfValue} name="halfValue" onChange={selectHandling}
                                title="select +/-">
                            <optgroup label="half">
                                <option value=""></option>
                                <option hidden={ratingValue === '6'} value={true}>+</option>
                                <option hidden={ratingValue === '1'} value={false}>-</option>
                            </optgroup>
                        </select>
                        <select value={scaleValue} name="scaleValue" onChange={selectHandling}
                                title="select scales of rating">
                            <optgroup label="scales">
                                {ratingScales.map((scales, i) => {
                                    return <option key={i} value={scales}>{scales}</option>
                                })}
                            </optgroup>
                        </select>
                    </div>
                </div>
                <Button variant="danger" title="abort adding rating" onClick={cancelHandling}>Cancel</Button>
            </div>
        )
    }
}

RatingOptions.propTypes = {
    studentId: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    setIsPlus: PropTypes.func.isRequired,
    isNewRating: PropTypes.object,
    ratingDescriptions: PropTypes.array.isRequired,
    ratingScales: PropTypes.array.isRequired,
    setDescription: PropTypes.func.isRequired,
    setScales: PropTypes.func.isRequired,
    ratingValue: PropTypes.string.isRequired,
    cancelHandling: PropTypes.func.isRequired
};

export default RatingOptions;
