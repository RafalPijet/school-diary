import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import './ClassesPanel.scss';

class ClassesPanel extends React.Component {
    state = {
        name: 'Class ',
        isVisible: false
    };

    componentDidMount() {
        const {loadTeachers} = this.props;
        loadTeachers();
    }

    nameHandling = event => (
        this.setState({name: event.target.value})
    );

    buttonHandling = () => {
        this.setState({isVisible: !this.state.isVisible});
    };

    render() {
        const {allClasses, request} = this.props;
        const {name, isVisible} = this.state;
        const {nameHandling, buttonHandling} = this;

        return (
            <div className='panel-main'>
                <h4>{`classes amount: ${allClasses.length}`}</h4>
                <span hidden={!isVisible}>name: <input type="text" value={name} onChange={nameHandling}/></span>
                <span hidden={!isVisible}>
                    <select name="main-teacher" id="">
                        <optgroup label='main teacher'>
                            <option value="first">first</option>
                        </optgroup>
                    </select>
                </span>
                <Button disabled={request.working} variant={request.working ? 'off' : 'success'}
                        onClick={buttonHandling}>{isVisible ? 'Add class' : 'New class'}</Button>
            </div>
        )
    }
}

ClassesPanel.propTypes = {
    allClasses: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachers: PropTypes.func.isRequired
};

export default ClassesPanel;
