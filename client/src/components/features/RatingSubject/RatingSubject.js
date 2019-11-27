import React from 'react';
import PropTypes from 'prop-types';
import {UncontrolledTooltip} from 'reactstrap';
import './RatingSubject.scss';

class RatingSubject extends React.Component {

    setColors = scales => {

        if (scales === 2) {
            return "color-orange";
        } else if (scales === 3) {
            return "color-red";
        } else {
            return "color-yellow";
        }
    };

    render() {
        const {ratings} = this.props;
        const {setColors} = this;
        return (
            <tr>
                <th>{ratings.subject}</th>
                <td>
                    {ratings.ratings.map((item, i) => {
                        return (
                            <span key={i}>
                        <span className={`rating-item ${setColors(item.scales)}`} id={"Tooltip" + i}>{item.value}</span>
                        <UncontrolledTooltip placement='top' target={"Tooltip" + i}>
                            <div>
                                <p className="m-0 text-justify">{`scales: ${item.scales}`}</p>
                                <p className="m-0 text-justify">{`description: ${item.description}`}</p>
                                <p className="m-0 text-justify">{`date: ${item.date.substring(0, 10)}`}</p>
                                <p className="m-0 text-justify">{`teacher: ${item.teacher}`}</p>
                            </div>
                        </UncontrolledTooltip>
                    </span>
                        )
                    })}
                </td>
            </tr>
        )
    }
}

RatingSubject.propTypes = {
    ratings: PropTypes.object.isRequired
};

export default RatingSubject;
