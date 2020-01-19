import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {prepareStudentsData} from "../../../utilities/functions";
import StudentItem from "../StudentItem/StudentItem";
import Spinner from "../../common/Spinner/Spinner";

const StudentsList = props => {
    const {students, classes, loadClasses, loadStudents, request} = props;
    const [studentsData, setStudentsData] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        console.log('useEffect - first');
        loadStudents();
        loadClasses()
    }, [loadStudents, loadClasses]);

    useEffect(() => {
        console.log('useEffect - second');
        setStudentsData(prepareStudentsData(students, classes));
        if (request.success && !request.working) setIsReady(true);
    }, [students, classes]);

    return (
        <div>
            <div className='col-12 parents-main'>
                <span className='text-left col-1'>Pos</span>
                <span className='text-left col-2'>Last name</span>
                <span className='text-left col-2'>First name</span>
                <span className='text-center col-2'>Birth date</span>
                <span className='text-center col-3'>Parent</span>
                <span className='text-center col-2'>Class</span>
            </div>
            {isReady ? studentsData.map((student, i) => {
                return <StudentItem key={i} student={student} i={i}/>
            }) : <Spinner/>}
        </div>
    )
};

StudentsList.propTypes = {
    students: PropTypes.array.isRequired,
    classes: PropTypes.array.isRequired,
    loadStudents: PropTypes.func.isRequired,
    loadClasses: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default StudentsList;
