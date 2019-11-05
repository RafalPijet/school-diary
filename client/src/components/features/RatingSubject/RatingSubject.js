import React from 'react';
import PropTypes from 'prop-types';

const RatingSubject = props => {
    const {ratings} = props;
    return (
        <tr>
            <th>{ratings.subject}</th>
            <td>
                {ratings.ratings.map((item, i) => {
                    return <span key={i}>{`${item}, `}</span>
                })}
            </td>
        </tr>
    )
};

export default RatingSubject;
