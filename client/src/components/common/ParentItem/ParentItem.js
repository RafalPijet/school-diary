import React from 'react';
import PropTypes from 'prop-types';

class ParentItem extends React.Component {
    render() {
        const {parent, i} = this.props;
        return (
            <tr>
                <td className='text-right'>{i + 1}</td>
                <td className='text-left'>{parent.lastName}</td>
                <td className='text-left'>{parent.firstName}</td>
                <td className='text-center'>{parent.birthDate.substring(0, 10)}</td>
                <td className='text-left'><a href={`mailto:${parent.email}`}>{parent.email}</a></td>
                <td className='text-center'>
                    {parent.students.length}
                </td>
            </tr>
        )
    }
}

ParentItem.propTypes = {
    parent: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};

export default ParentItem;
