import React from 'react';
import PropTypes from 'prop-types';
import ClassBox from '../../features/ClassBox/ClassBox';

class ClassBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadClasses(this.props.user.id);
        console.log('wow');
    }
    render() {
        const {classes} = this.props;
        return (
            <ul>
                {classes.map((diary, i) => {
                    return <ClassBox key={i} diary={diary}/>
                })}
            </ul>
        )
    }
}

ClassBoxList.propTypes = {
    classes: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    loadClasses: PropTypes.func.isRequired
};

export default ClassBoxList;
