import axios from 'axios';
import {API_URL} from "../config";
import {setUser, setLogin, loadTeachers, loadParents, updateParent, deleteParent} from "./actions/usersActions";
import {
    loadClassByTeacher,
    addRatingToStudent,
    updateRatingToStudent,
    loadAllClasses,
    addNewClass,
    updateStudentInTeacherClass,
    setSelectedClass,
    updateDataInSelectedClass,
    updateTutorInSelectedClass,
    updateListInSelectedClass,
    updateTutorInAllClasses,
    deleteClassInAllClasses
} from "./actions/classActions";
import {
    startRequest,
    stopRequest,
    errorRequest,
    startAddingRequest,
    stopAddingRequest,
    startWorkingRequest,
    stopWorkingRequest,
    startUpdatingRequest,
    stopUpdatingRequest,
    startGetingRequest,
    stopGetingRequest
} from "./actions/requestActions";
import {
    loadAllStudents,
    updateStudent,
    deleteStudent,
    addStudent,
    setFreeStudents,
    setClassesStudents
} from "./actions/studentActions";
import {setAlertSuccess, setTutorIsUse} from "./actions/valuesActions";

export const loadUserByLogin = login => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/login`, {params: {email: login.email}});

            if (res.data !== null) {

                if (res.data.password === login.password) {
                    await dispatch(stopRequest());
                    await dispatch(setUser(res.data));
                    await dispatch(setLogin(true));
                } else {
                    dispatch(errorRequest("Wrong password!"));
                }
            } else {
                dispatch(errorRequest("User don't exist!!!"));
            }
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const addUser = user => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            await axios.post(`${API_URL}/users`, user);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(
                `${err.message.includes('code 500') ? 'Email address already exists' : err.message}`
            ))
        }
    }
};

export const updateUserRequest = user => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/users`, user);
            dispatch(updateParent(res.data));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const deleteParentRequest = id => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/users/${id}`);
            if (res.status === 200) dispatch(deleteParent(id));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadAllClassesRequest = () => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/class`);
            dispatch(loadAllClasses(res.data));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadStudentsIdFromClasses = () => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/classes/students`);
            dispatch(setClassesStudents(res.data));
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const loadAllClassByTeacherId = teacherId => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/classes/${teacherId}`);
            dispatch(loadClassByTeacher(res.data));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const loadClassById = id => {
    return async dispatch => {
        dispatch(startGetingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/class/${id}`);
            dispatch(setSelectedClass(res.data));
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadDataForClassByIdRequest = id => {
    return async dispatch => {
        dispatch(startGetingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/class/principal/${id}`);
            dispatch(updateDataInSelectedClass(res.data));
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const updateTutorClassRequest = classItem => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/class/tutor`, classItem);
            dispatch(setAlertSuccess(true,
                `${res.data.name} tutor has been changed to ${res.data.mainTeacher.lastName}
                 ${res.data.mainTeacher.firstName}`));
            await dispatch(updateTutorInSelectedClass(res.data.mainTeacher));
            await dispatch(updateTutorInAllClasses(classItem.id, res.data.mainTeacher.id));
            dispatch(setTutorIsUse(true));
            dispatch(stopUpdatingRequest());
        } catch (err) {
            console.log(err.message);
            dispatch(errorRequest(err.message));
        }
    }
};

export const updateClassRequest = classItem => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/class`, classItem);
            dispatch(setAlertSuccess(true,
                `${classItem.isStudents ?
                    'Students' : 'Teachers'} list of ${res.data} has been changed.`));

            if (classItem.isStudents) await dispatch(loadStudentsIdFromClasses());
            dispatch(updateListInSelectedClass(classItem.isStudents,
                classItem.isStudents ? classItem.students : classItem.subjectTeachers));
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const addRatingForStudent = (classId, dataPackage) => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/ratings/${dataPackage.ratingsId}`, dataPackage.rating);
            dispatch(addRatingToStudent(classId, res.data));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const updateRatingForStudent = dataPackage => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/ratings/${dataPackage.ratingsId}`, dataPackage.rating);
            dispatch(updateRatingToStudent(dataPackage.classId, dataPackage.studentId, res.data));
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const deleteRatingForStudent = (id, _id, classId, studentId) => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/ratings/${id}/${_id}`);
            dispatch(updateRatingToStudent(classId, studentId, res.data));
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const deleteRatingRequest = id => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await axios.delete(`${API_URL}/rating/${id}`);
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadTeachersRequest = () => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/teachers`);
            dispatch(loadTeachers(res.data));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadParentsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let parents = await axios.get(`${API_URL}/users/parents`);
            let students = await axios.get(`${API_URL}/students`);
            let allParents = [];
            parents.data.forEach(parent => {
                let studentsForParent = [];
                students.data.forEach(student => {

                    if (parent.students.includes(student._id)) {
                        studentsForParent.push(student);
                    }
                });
                parent.students = studentsForParent;
                allParents = [...allParents, parent]
            });
            dispatch(loadParents(allParents));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const addClassRequest = payload => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/class`, payload);
            let newClass = res.data;
            newClass.mainTeacher = payload.mainTeacher;
            dispatch(addNewClass(newClass));
            dispatch(setAlertSuccess(true, `${payload.name} has been added.`));
            dispatch(setTutorIsUse(true));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const deleteClassByIdRequest = id => {
    return async dispatch => {
        dispatch(startGetingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/class/${id}`);
            dispatch(setAlertSuccess(true, `${res.data.name} has been removed.`));
            dispatch(deleteClassInAllClasses(id));
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const getAllStudentsRequest = () => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/students`);
            dispatch(loadAllStudents(res.data));
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const getStudentsIdRequest = () => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/students/onlyid`);
            dispatch(loadAllStudents(res.data));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const getStudentsByIdRequest = studentsId => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/students/select`, {params: {studentsId}});
            dispatch(setFreeStudents(res.data));
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const addStudentRequest = student => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/student`, student);
            dispatch(addStudent(res.data));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const updateStudentRequest = student => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/student`, student);
            dispatch(updateStudent(res.data));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const deleteStudentRequest = student => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/student/${student.id}`);
            if (res.status === 200) {
                dispatch(deleteStudent(student.id));
                dispatch(stopRequest());
            }
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const addSubjectRating = (student, subject) => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/rating`, {studentId: student.id, subject});
            await axios.post(`${API_URL}/student/subject`, {id: student.id, rating: res.data});
            let studentAfterChange = student;
            studentAfterChange.ratings = [...studentAfterChange.ratings, res.data];
            dispatch(updateStudentInTeacherClass(studentAfterChange));
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};
