import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import './ClassesPanel.scss';

class ClassesPanel extends React.Component {
    state = {
        name: 'Class ',
        isVisible: false,
        mainTeacher: {},
        availableTeachers: [],
        buttonStyle: 'success'
    };

    componentDidMount() {
        const {loadTeachers} = this.props;
        loadTeachers();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.teachers.length && nextProps.allClasses.length) {
            this.availableTeachersHandling(nextProps.teachers, nextProps.allClasses);
        }
    }

    availableTeachersHandling = async (teachers, classes) => {
        let mainTeachersString = classes.map(item => JSON.stringify(item.mainTeacher));
        let availableTeachers = [];
        await teachers.forEach(item => !mainTeachersString.includes(JSON.stringify(item)) ?
            availableTeachers = [...availableTeachers, item] : []
        );
        this.setState({availableTeachers});

        if (availableTeachers.length) this.setState({mainTeacher: availableTeachers[0]});
    };

    formHandling = async event => {
        const {checkClassName} = this;
        event.target.name === 'mainTeacher' ?  await this.setState({[event.target.name]: JSON.parse(event.target.value)}) :
        await this.setState({[event.target.name]: event.target.value});

        (checkClassName(this.state.name)) ? this.setState({buttonStyle: 'success'}) : this.setState({buttonStyle: 'danger'});
    };

    checkClassName = name => {
        const {allClasses} = this.props;
        let result = true;
        allClasses.forEach(item => {
           if (item.name === name || name === 'Class ') {
               result = false;
           }
        });
        return result;
    };

    buttonHandling = async () => {
        const {isVisible, mainTeacher} = this.state;
        const {checkClassName} = this;
        const {addClass, request, loadAllClasses} = this.props;

        if (!isVisible) this.setState({isVisible: true, buttonStyle: 'danger'});

        if (isVisible && checkClassName(this.state.name)) {
            let payload = {
                name: this.state.name,
                mainTeacher: mainTeacher
            };
            await addClass(payload);

            if (!request.adding) {
                await loadAllClasses();
                await this.setState({isVisible: false});
            }
        }
    };

    render() {
        const {allClasses, request} = this.props;
        const {name, isVisible, mainTeacher, availableTeachers, buttonStyle} = this.state;
        const {formHandling, buttonHandling} = this;

        return (
            <div className='panel-main'>
                <h4>{`classes amount: ${allClasses.length}`}</h4>
                <span hidden={!isVisible}>name: <input disabled={request.adding} name='name' type="text" value={name}
                                                       onChange={formHandling}/></span>
                <span hidden={!isVisible}>
                    <select disabled={request.adding} name="mainTeacher" value={JSON.stringify(mainTeacher)} onChange={formHandling}>
                        <optgroup label='main teachers available'>
                            {availableTeachers.map((item, i) => {
                                return <option key={i} value={JSON.stringify(item)}>{`${item.firstName} ${item.lastName}`}</option>
                            })}
                        </optgroup>
                    </select>
                </span>
                <Button disabled={request.working || request.adding || request.pending}
                        variant={(request.working || request.adding || request.pending) ? 'off' : `${buttonStyle}`}
                        onClick={buttonHandling}>{isVisible ? 'Add class' : 'New class'}</Button>
            </div>
        )
    }
}

ClassesPanel.propTypes = {
    allClasses: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    loadTeachers: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    addClass: PropTypes.func.isRequired,
    loadAllClasses: PropTypes.func.isRequired
};

export default ClassesPanel;
