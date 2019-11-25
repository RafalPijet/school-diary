import React from 'react';
import PropTypes from 'prop-types';

class RatingItem extends React.Component {
    state = {
        value: "",
        inputType: "text",
        description: "",
        style: "color-black"
    };

    componentDidMount() {
        const {rating} = this.props;
        const {setColors} = this;
        this.setState({
            value: rating.value,
            description: rating.description,
        });
        setColors(rating);
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.isNewRating.isNew) {
            this.setState({
                inputType: "text",
                value: nextProps.rating.value
            })
        }

        if (nextProps.rating.description !== "") {
            this.setState({
                description: nextProps.rating.description
            })
        }
        this.setColors(nextProps.rating);
    }

    setColors = rating => {
        if (rating.scales === 2) {
            this.setState({style: "color-orange"});
        } else if (rating.scales === 3) {
            this.setState({style: "color-red"});
        } else if (rating.scales === 1) {
            this.setState({style: "color-yellow"});
        } else {
            this.setState({style: "color-black"})
        }
    };

    valueHandling = event => {
        const {setRatingValue, isNewRating} = this.props;
        this.setState({value: event.target.value});

        if (isNewRating.isNew) {
            setRatingValue(event.target.value);
        }
    };

    render() {
        const {value, inputType, description, style} = this.state;
        const {valueHandling} = this;

        return (
            <span>
                <input className={style} disabled={description !== ""} type={inputType} onClick={() => this.setState({inputType: "number"})} style={{width: "2rem"}} value={value}
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
