import React from 'react';
import PropTypes from 'prop-types';
import './ClassBox.scss';

class ClassBox extends React.Component {
    state = {
        isActive: false
    };

    activeHandling = () => {
        this.setState({isActive: true});
        setTimeout(() => console.log(this.state.isActive), 1000);
    };

    render() {
        const {name, mainTeacher, students} = this.props.diary;
        const {activeHandling} = this;
        const {isActive} = this.state;
        return (
            <li className={`box-main ${isActive ? 'box-active' : ''}`} onClick={() => activeHandling()}>
                <h4 className="text-center">{name}</h4>
                <h6>{`class teacher: ${mainTeacher.firstName} ${mainTeacher.lastName}`}</h6>
                <h6 className="text-center">{`students: ${students.length}`}</h6>
            </li>
        )
    }
}

ClassBox.propTypes = {
    diary: PropTypes.object.isRequired
};

export default ClassBox;
