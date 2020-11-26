import axios from 'axios';
import { API_URL } from "../config";
import { setExpiryDate } from '../utilities/functions';
import {
    setUser,
    setLogin,
    updateUserData,
    loadTeachers,
    loadParents,
    updateParent,
    updateParentStudentClassName,
    loadUsersName,
    removeUserName,
    addParent,
    addClassnameToStudent
} from "./actions/usersActions";
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
    addStudent,
    setFreeStudents,
    setClassesStudents
} from "./actions/studentActions";
import {
    setAlertSuccess,
    setTutorIsUse,
    setIsStudentMode,
    setPath,
    setAddingIsDone
} from "./actions/valuesActions";
import store from './store';
import { clearLocalStorage, countRemainingTime } from '../utilities/functions';
let timer;

const setLogout = dispatch => {
    timer = setTimeout(() => {
        clearLocalStorage();
        dispatch(setLogin(false));
        dispatch(setPath('/'));
    }, countRemainingTime())
}

export const loadUserById = userId => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            let res = await axios.get(`${API_URL}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            let user = res.data.user;
            user.password = "";

            if (user.status === 'parent' && user.students.length) {
                user.students.map(student => {
                    student.className = 'none';
                    return student;
                });
            }
            await dispatch(setUser(user));
            dispatch(stopRequest());
            dispatch(setLogin(true));
            dispatch(setPath('/'));
            setLogout(dispatch);
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
}

export const loadUserByLogin = login => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            let res = await axios.post(`${API_URL}/users/login`, login);
            const { user, token } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id.toString());
            setExpiryDate(15);
            user.password = '';

            if (user.status === 'parent' && user.students.length) {
                user.students.map(student => {
                    student.className = 'none';
                    return student;
                });
            }
            await dispatch(stopRequest());
            await dispatch(setUser(user));
            await dispatch(setLogin(true));
            dispatch(setPath('/'));
            setLogout(dispatch);
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const resetPasswordRequest = email => {
    return async dispatch => {
        dispatch(startRequest());
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/reset`, { email });
            dispatch(setPath('/'));
            dispatch(setAlertSuccess(true, res.data.message));
            dispatch(stopRequest());
        } catch (err) {

            if (err.response !== undefined) {
                let errorInfo = err.response.data.message;

                if (err.response.data.data !== undefined) {
                    err.response.data.data.forEach(item => {
                        errorInfo += `${item.message}, `
                    })
                }
                dispatch(errorRequest(errorInfo));
            } else {
                dispatch(errorRequest(err.message));
            }
        }
    }
}

export const changePasswordRequest = (token, data) => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/change/password`, { token, data });
            dispatch(setAlertSuccess(true, res.data.message));
            dispatch(stopRequest());
            dispatch(setPath('/login'));
        } catch (err) {

            if (err.response !== undefined) {
                let errorInfo = err.response.data.message;

                if (err.response.data.data !== undefined) {
                    err.response.data.data.forEach(item => {
                        errorInfo += `${item.message}, `
                    })
                }
                dispatch(errorRequest(errorInfo));
            } else {
                dispatch(errorRequest(err.message));
            }
        }
    }
}

export const addUser = user => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await axios.post(`${API_URL}/users`, user);
            dispatch(stopRequest());
            dispatch(setPath('/login'));
        } catch (err) {

            if (err.response !== undefined) {
                let errorInfo = err.response.data.message;

                if (err.response.data.data !== undefined) {
                    err.response.data.data.forEach(item => {
                        errorInfo += `${item.message}, `
                    })
                }
                dispatch(errorRequest(errorInfo));
            } else {
                dispatch(errorRequest(err.message));
            }
        }
    }
};

export const updateUserRequest = (id, studentsList, data) => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.put(`${API_URL}/users/parent/${id}`, { studentsList }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(updateParent(res.data.id, studentsList));
            dispatch(setAlertSuccess(true,
                `Student ${data.studentName} ${data.isAdd ?
                    'has been assigned' : 'is no longer assigned'} to a parent ${data.parentName}.`));
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const deleteParentRequest = (id, page) => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.delete(`${API_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(removeUserName(id));
            await dispatch(loadParentsRequestWithRange(page + 1, 7));
            dispatch(setAlertSuccess(true, `Parent ${res.data.name} has been removed.`));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const deleteTeacherRequest = (id, page, rowsPerPage) => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.delete(`${API_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(removeUserName(id));
            await dispatch(loadTeachersRequestWithRange(page + 1, rowsPerPage));
            dispatch(setAlertSuccess(true, `Teacher ${res.data.name} has been removed.`));
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadAllClassesRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/class`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(loadAllClasses(res.data));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadStudentsIdFromClasses = () => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/classes/students`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setClassesStudents(res.data));
            setLogout(dispatch);
            dispatch(stopRequest());
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const loadAllClassByTeacherId = teacherId => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/classes/${teacherId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(loadClassByTeacher(res.data));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message))
        }
    }
};

export const loadClassById = id => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/class/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setSelectedClass(res.data));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadDataForClassByIdRequest = id => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/class/principal/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(updateDataInSelectedClass(res.data));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const updateTutorClassRequest = classItem => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.put(`${API_URL}/class/tutor`, classItem, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setAlertSuccess(true,
                `${res.data.name} tutor has been changed to ${res.data.mainTeacher.lastName}
                 ${res.data.mainTeacher.firstName}`));
            await dispatch(updateTutorInSelectedClass(res.data.mainTeacher));
            await dispatch(updateTutorInAllClasses(classItem.id, res.data.mainTeacher.id));
            dispatch(setTutorIsUse(true));
            setLogout(dispatch);
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const updateClassRequest = classItem => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);
        try {
            let res = await axios.put(`${API_URL}/class`, classItem, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setAlertSuccess(true,
                `${classItem.isStudents ?
                    'Students' : 'Teachers'} list of ${res.data} has been changed.`));

            if (classItem.isStudents) await dispatch(loadStudentsIdFromClasses());
            dispatch(updateListInSelectedClass(classItem.isStudents,
                classItem.isStudents ? classItem.students : classItem.subjectTeachers));
            setLogout(dispatch);
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const addRatingForStudent = (classId, dataPackage) => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.post(`${API_URL}/ratings/${dataPackage.ratingsId}`, dataPackage.rating, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(addRatingToStudent(classId, res.data));
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message))
        }
    }
};

export const updateRatingForStudent = dataPackage => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.put(`${API_URL}/ratings/${dataPackage.ratingsId}`, dataPackage.rating, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(updateRatingToStudent(dataPackage.classId, dataPackage.studentId, res.data));
            setLogout(dispatch);
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const deleteRatingForStudent = (id, _id, classId, studentId) => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.delete(`${API_URL}/ratings/${id}/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(updateRatingToStudent(classId, studentId, res.data));
            setLogout(dispatch);
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadTeachersRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/teachers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(loadTeachers(res.data));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadParentByIdRequest = (id, isAdd) => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/users/parent/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let studentsId = res.data.students.map(student => student.id);
            let parent = res.data;

            if (studentsId.length) {
                let resNext = await axios.get(`${API_URL}/classes/students/name`,
                    {
                        params: { studentsId },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                let studentsIdInClasses = resNext.data.map(item => item.id);
                parent.students = parent.students.map(student => {

                    if (studentsIdInClasses.includes(student.id)) {
                        let classItem = resNext.data.find(item => item.id === student.id);
                        student.className = classItem.name;
                    } else {
                        student.className = 'no class'
                    }
                    return student
                });
            }
            isAdd ? dispatch(addParent(parent)) : dispatch(loadParents([parent]));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadTeacherByIdRequest = id => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/users/teacher/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let teacher = res.data;
            let resNext = await axios.get(`${API_URL}/classes/teachers/name`,
                {
                    params: { teachersId: [teacher.id] },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

            if (resNext.data.tutors.length) {
                teacher.tutorClass = resNext.data.tutors[0].tutorClass
            } else {
                teacher.tutorClass = 'no assigned'
            }

            if (resNext.data.teachersInClass.length) {
                teacher.teacherClasses = resNext.data.teachersInClass.map(item => {
                    return {
                        className: item.className,
                        studentsAmount: item.studentsAmount
                    }
                })
            } else {
                teacher.teacherClasses = []
            }
            dispatch(loadTeachers([teacher]));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const loadTeachersRequestWithRange = (page, itemsPerPage) => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let start = Math.ceil((page - 1) * itemsPerPage);
            let limit = itemsPerPage;
            let teachers = await axios.get(`${API_URL}/users/teacher/${start}/${limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let teachersId = teachers.data.map(teacher => teacher.id);
            let selectedTeachers = teachers.data;
            let res = await axios.get(`${API_URL}/classes/teachers/name`,
                {
                    params: { teachersId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            const { teachersInClass, tutors } = res.data;
            let tutorsId = tutors.map(tutor => tutor.tutorId);
            await selectedTeachers.forEach(teacher => {
                let teacherClasses = [];

                if (tutorsId.includes(teacher.id)) {
                    teacher.tutorClass = tutors.find(item => item.tutorId === teacher.id).tutorClass;
                } else {
                    teacher.tutorClass = 'no assigned'
                }

                teachersInClass.forEach(item => {

                    if (item.id === teacher.id) {
                        teacherClasses = [...teacherClasses, {
                            className: item.className,
                            studentsAmount: item.studentsAmount
                        }]
                    }
                });
                teacher.teacherClasses = teacherClasses;
            });
            dispatch(loadTeachers(selectedTeachers));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};
//todo
export const loadParentsRequestWithRange = (page, itemsPerPage) => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let studentsInClassesId = [];
            let classNames = [];
            let start = Math.ceil((page - 1) * itemsPerPage);
            let limit = itemsPerPage;
            let parents = await axios.get(`${API_URL}/users/parent/${start}/${limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const allStudents = await store.getState().students.allStudents;
            console.log(allStudents);
            let studentsId = [];
            await parents.data.forEach(parent => {
                let studentsForParent = [];
                allStudents.forEach(student => {

                    if (parent.students.includes(student._id)) {
                        studentsForParent.push(student);
                        studentsId = [...studentsId, student.id]
                    }
                });
                parent.students = studentsForParent;
                // console.log(parent.students);
            });

            if (studentsId.length) {
                let res = await axios.get(`${API_URL}/classes/students/name`,
                    {
                        params: { studentsId },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                classNames = res.data;
                studentsInClassesId = classNames.map(item => item.id);
            }

            let allParents = parents.data;
            await allParents.forEach(parent => {
                parent.students = parent.students.map(student => {

                    if (studentsInClassesId.includes(student.id)) {
                        student.className = classNames.find(item => item.id === student.id).name
                    } else {
                        student.className = 'none class'
                    }
                    return student;
                })
            });
            console.log(allParents);
            dispatch(loadParents(allParents));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const addClassRequest = payload => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.post(`${API_URL}/class`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let newClass = res.data;
            newClass.mainTeacher = payload.mainTeacher;
            dispatch(addNewClass(newClass));
            dispatch(setAlertSuccess(true, `${payload.name} has been added.`));
            dispatch(setTutorIsUse(true));
            dispatch(setAddingIsDone(true));
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message))
        }
    }
};

export const deleteClassByIdRequest = id => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.delete(`${API_URL}/class/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setAlertSuccess(true, `${res.data.name} has been removed.`));
            await dispatch(deleteClassInAllClasses(id));
            await dispatch(loadStudentsIdFromClasses());
            dispatch(setTutorIsUse(true));
            dispatch(setIsStudentMode(true));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getAllStudentsRequest = () => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/students`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(loadAllStudents(res.data));
            setLogout(dispatch);
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getUsersNameRequest = status => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/users/name/${status}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(loadUsersName(res.data));
            setLogout(dispatch);
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getStudentByIdRequest = id => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/student/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let studentsId = [id];
            let student = res.data;
            let resNext = await axios.get(`${API_URL}/classes/students/name`,
                {
                    params: { studentsId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

            if (resNext.data.length) {
                student.className = resNext.data[0].name;
            } else {
                student.className = 'no assigned';
            }
            dispatch(loadAllStudents([student]));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getStudentsWithRangeRequest = (page, itemsPerPage) => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let result = [];
            let start = Math.ceil((page - 1) * itemsPerPage);
            let limit = itemsPerPage;
            let res = await axios.get(`${API_URL}/students/${start}/${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            let studentsId = res.data.map(item => item.id);
            let resNext = await axios.get(`${API_URL}/classes/students/name`,
                {
                    params: { studentsId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            await res.data.forEach(student => {
                resNext.data.forEach(item => {

                    if (student.id === item.id) {
                        result = [...result, {
                            id: student.id,
                            className: item.name,
                            firstName: student.firstName,
                            lastName: student.lastName,
                            birthDate: student.birthDate,
                            parents: student.parents
                        }]
                    }
                })
            });
            studentsId = result.map(student => student.id);
            res.data.forEach(student => {

                if (!studentsId.includes(student.id)) {
                    student.className = 'no assigned';
                    result = [...result, student];
                }
            });

            dispatch(loadAllStudents(result));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getStudentsNamesRequest = () => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/students/names`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setFreeStudents(res.data));
            setLogout(dispatch);
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getStudentsIdRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/students/onlyid`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(loadAllStudents(res.data));
            setLogout(dispatch);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getStudentsByIdRequest = studentsId => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/students/select`,
                {
                    params: { studentsId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(setFreeStudents(res.data));
            setLogout(dispatch);
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const addStudentRequest = student => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.post(`${API_URL}/student`, student, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setAlertSuccess(true,
                `Student ${res.data.firstName} ${res.data.lastName} has been added.`));
            dispatch(addStudent(res.data));
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {

            if (err.response !== undefined) {
                let errorInfo = err.response.data.message;

                if (err.response.data.data !== undefined) {
                    err.response.data.data.forEach(item => {
                        errorInfo += `${item.message}, `
                    })
                }
                dispatch(errorRequest(errorInfo));
            } else {
                dispatch(errorRequest(err.message));
            }
        }
    }
};

export const updateUserDataRequest = (isPassword, isDataChange, userAfterChange) => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.put(`${API_URL}/users`, { isPassword, isDataChange, userAfterChange },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

            if (isDataChange) {
                dispatch(updateUserData(userAfterChange));

                if (isPassword && res.data.resultPassword !== null) {
                    dispatch(setAlertSuccess(true, `${res.data.resultData}. ${res.data.resultPassword}`))
                }

                if (isPassword && res.data.resultPassword === null) {
                    dispatch(setAlertSuccess(true, res.data.resultData));
                    setTimeout(() =>
                        dispatch(errorRequest("Incorrect old password !!! Password has not been changed.")), 6000);
                }

                if (!isPassword) dispatch(setAlertSuccess(true, res.data.resultData))

            }

            if (isPassword && !isDataChange) {
                res.data.resultPassword !== null ? dispatch(setAlertSuccess(true, res.data.resultPassword)) :
                    dispatch(errorRequest("Incorrect old password !!! Password has not been changed."))
            }
            setLogout(dispatch);
            dispatch(stopUpdatingRequest())
        } catch (err) {

            if (err.response !== undefined) {
                let errorInfo = err.response.data.message;

                if (err.response.data.data !== undefined) {
                    err.response.data.data.forEach(item => {
                        errorInfo += `${item.message}, `
                    })
                }
                dispatch(errorRequest(errorInfo));
            } else {
                dispatch(errorRequest(err.message));
            }
        }
    }
};

export const updateStudentRequest = (id, parent, isAdd) => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.put(`${API_URL}/student/parents/${id}`, { parent: parent, isAdd },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

            if (isAdd) {
                let studentsId = [res.data.studentId];
                let resNext = await axios.get(`${API_URL}/classes/students/name`,
                    {
                        params: { studentsId },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                if (resNext.data.length) {
                    dispatch(updateParentStudentClassName(parent.id, res.data.studentId, resNext.data[0].name));
                } else {
                    dispatch(updateParentStudentClassName(parent.id, res.data.studentId, 'none class'));
                }
            }
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const updateStudentBasicDataRequest = student => {
    return async dispatch => {
        dispatch(startAddingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.put(`${API_URL}/student/basic`,
                {
                    id: student.id, firstName: student.firstName,
                    lastName: student.lastName, birthDate: student.birthDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(setAlertSuccess(true, `Student ${res.data.studentName} data has been changed.`));
            dispatch(updateStudent(student));
            setLogout(dispatch);
            dispatch(stopAddingRequest());
        } catch (err) {

            if (err.response !== undefined) {
                let errorInfo = err.response.data.message;

                if (err.response.data.data !== undefined) {
                    err.response.data.data.forEach(item => {
                        errorInfo += `${item.message}, `
                    })
                }
                dispatch(errorRequest(errorInfo));
            } else {
                dispatch(errorRequest(err.message));
            }
        }
    }
};

export const deleteStudentRequest = studentId => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.delete(`${API_URL}/student/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.ratings.length) {
                await axios.delete(`${API_URL}/ratings`,
                    {
                        data: { ratingsId: res.data.ratings },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
            }
            dispatch(getStudentsNamesRequest());
            dispatch(getStudentsWithRangeRequest(1, 5));
            dispatch(setAlertSuccess(true, `Student ${res.data.studentName} has been removed.`));
            setLogout(dispatch);
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const addSubjectRating = (student, subject) => {
    return async dispatch => {
        dispatch(startUpdatingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.post(`${API_URL}/rating`, { studentId: student.id, subject }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            await axios.post(`${API_URL}/student/subject`, { id: student.id, rating: res.data },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            let studentAfterChange = student;
            studentAfterChange.ratings = [...studentAfterChange.ratings, res.data];
            dispatch(updateStudentInTeacherClass(studentAfterChange));
            setLogout(dispatch);
            dispatch(stopUpdatingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message))
        }
    }
};

export const getTeacherStudentsNameRequest = classesId => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/classes/teacher/students`, {
                params: { classesId },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(loadAllStudents(res.data));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getTeacherStudentsByIdRequest = students => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let studentsId = students.map(student => student.id);
            let res = await axios.get(`${API_URL}/students/teacher`,
                {
                    params: { studentsId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            let result = [];

            if (res.data.length) {
                students.forEach(student => {
                    res.data.forEach(item => {

                        if (student.id === item.id) {
                            result = [...result, {
                                id: student.id,
                                name: student.name,
                                className: student.className,
                                birthDate: item.birthDate,
                                parents: item.parents
                            }]
                        }
                    })
                })
            }
            dispatch(setClassesStudents(result));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getClassNameForStudentByIdRequest = studentsId => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/classes/students/name`,
                {
                    params: { studentsId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            let names = res.data;

            if (names.length) {
                names.forEach(item => {
                    dispatch(addClassnameToStudent(item.id, item.name))
                })
            }
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};

export const getTeachersByClassNameRequest = name => {
    return async dispatch => {
        dispatch(startGetingRequest());
        clearTimeout(timer);
        setExpiryDate(15);

        try {
            let res = await axios.get(`${API_URL}/class/teachers`,
                {
                    params: { name },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(setSelectedClass(res.data));
            setLogout(dispatch);
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.response !== undefined ? err.response.data.message : err.message));
        }
    }
};
