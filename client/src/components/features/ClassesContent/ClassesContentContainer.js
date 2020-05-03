import {connect} from 'react-redux';
import {getAllClasses} from "../../../redux/actions/classActions";
import ClassesContent from './ClassesContent'

const mapStateToProps = state => ({
    allClasses: getAllClasses(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContent);
