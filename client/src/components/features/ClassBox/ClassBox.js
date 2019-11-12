import React from 'react';
import PropTypes from 'prop-types';
import './ClassBox.scss';

class ClassBox extends React.Component {
    state = {
        isActive: false
    };

    componentDidMount() {
        const {selectedClass, diary} = this.props;
        selectedClass.id === diary.id ? this.setState({isActive: true}) : this.setState({isActive: false});
    }

    componentWillReceiveProps(nextProps) {
        nextProps.selectedClass.id !== this.props.diary.id ? this.setState({isActive: false}) :
            this.setState({isActive: true});
    }

    activeHandling = () => {
        const {setSelectedClass, diary} = this.props;
        setSelectedClass(diary);
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
    diary: PropTypes.object.isRequired,
    selectedClass: PropTypes.object.isRequired,
    setSelectedClass: PropTypes.func.isRequired
};

export default ClassBox;
