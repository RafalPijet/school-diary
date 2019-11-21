import React from 'react';
import PropTypes from 'prop-types';
import {UncontrolledTooltip} from 'reactstrap';
import './RatingSubject.scss';

const RatingSubject = props => {
    const {ratings} = props;
    return (
        <tr>
            <th>{ratings.subject}</th>
            <td>
                {ratings.ratings.map((item, i) => {
                    let number = Math.round(Math.random() * 10000000);
                    return (
                        <span key={i}>
                        <span id={"Tooltip" + number}>{`${item.value}, `}</span>
                        <UncontrolledTooltip placement='right' target={"Tooltip" + number}>
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
};

RatingSubject.propTypes = {
  ratings: PropTypes.object.isRequired
};

export default RatingSubject;
