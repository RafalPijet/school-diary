import axios from 'axios';
import {API_URL} from "../config";
import {
    setUser,
    setLogin,
    loadTeachers,
    loadParents,
    updateParent,
    updateParentStudentClassName,
    loadUsersName,
    removeUserName,
    addParent
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
    setIsStudentMode
} from "./actions/valuesActions";
import store from './store';

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

export const updateUserRequest = (id, studentsList, data) => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/users/parent/${id}`, {studentsList});
            dispatch(updateParent(res.data.id, studentsList));
            dispatch(setAlertSuccess(true,
                `Student ${data.studentName} ${data.isAdd ?
                    'has been assigned' : 'is no longer assigned'} to a parent ${data.parentName}.`));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};
/*todo*/
export const deleteParentRequest = (id, page) => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/users/${id}`);
            dispatch(removeUserName(id));
            await dispatch(loadParentsRequestWithRange(page + 1, 7));
            dispatch(setAlertSuccess(true, `Parent ${res.data.name} has been removed.`));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const deleteTeacherRequest = (id, page, rowsPerPage) => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/users/${id}`);
            dispatch(removeUserName(id));
            await dispatch(loadTeachersRequestWithRange(page + 1, rowsPerPage));
            dispatch(setAlertSuccess(true, `Teacher ${res.data.name} has been removed.`));
            dispatch(stopAddingRequest());
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

export const loadParentByIdRequest = (id, isAdd) => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/parent/${id}`);
            let studentsId = res.data.students.map(student => student.id);
            let parent = res.data;

            if (studentsId.length) {
                let resNext = await axios.get(`${API_URL}/classes/students/name`, {params: {studentsId}});
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
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadTeacherByIdRequest = id => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/teacher/${id}`);
            let teacher = res.data;
            let resNext = await axios.get(`${API_URL}/classes/teachers/name`,
                {params: {teachersId: [teacher.id]}});

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
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

/*todo*/
export const loadTeachersRequestWithRange = (page, itemsPerPage) => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let start = Math.ceil((page - 1) * itemsPerPage);
            let limit = itemsPerPage;
            let teachers = await axios.get(`${API_URL}/users/teacher/${start}/${limit}`);
            let teachersId = teachers.data.map(teacher => teacher.id);
            let selectedTeachers = teachers.data;
            let res = await axios.get(`${API_URL}/classes/teachers/name`, {params: {teachersId}});
            const {teachersInClass, tutors} = res.data;
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
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const loadParentsRequestWithRange = (page, itemsPerPage) => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let studentsInClassesId = [];
            let classNames = [];
            let start = Math.ceil((page - 1) * itemsPerPage);
            let limit = itemsPerPage;
            let parents = await axios.get(`${API_URL}/users/parent/${start}/${limit}`);
            const allStudents = store.getState().students.allStudents;
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
            });

            if (studentsId.length) {
                let res = await axios.get(`${API_URL}/classes/students/name`, {params: {studentsId}});
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
            await dispatch(deleteClassInAllClasses(id));
            await dispatch(loadStudentsIdFromClasses());
            dispatch(setTutorIsUse(true));
            dispatch(setIsStudentMode(true));
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

export const getUsersNameRequest = status => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/name/${status}`);
            dispatch(loadUsersName(res.data));
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const getStudentByIdRequest = id => {
    return async dispatch => {
        dispatch(startGetingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/student/${id}`);
            let studentsId = [id];
            let student = res.data;
            let resNext = await axios.get(`${API_URL}/classes/students/name`, {params: {studentsId}});

            if (resNext.data.length) {
                student.className = resNext.data[0].name;
            } else {
                student.className = 'no assigned';
            }
            dispatch(loadAllStudents([student]));
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};
/*todo*/
export const getStudentsWithRangeRequest = (page, itemsPerPage) => {
    return async dispatch => {
        dispatch(startGetingRequest());

        try {
            let result = [];
            let start = Math.ceil((page - 1) * itemsPerPage);
            let limit = itemsPerPage;
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/students/${start}/${limit}`);
            let studentsId = res.data.map(item => item.id);
            let resNext = await axios.get(`${API_URL}/classes/students/name`, {params: {studentsId}});
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
            dispatch(stopGetingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const getStudentsNamesRequest = () => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/students/names`);
            dispatch(setFreeStudents(res.data));
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
            dispatch(setAlertSuccess(true,
                `Student ${res.data.firstName} ${res.data.lastName} has be added.`));
            dispatch(addStudent(res.data));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const updateUserRequest = (isPassword, isDataChange, userAfterChange) => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/users`, {isPassword, isDataChange, userAfterChange});
            console.log(res.data);
            dispatch(stopUpdatingRequest())
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const updateStudentRequest = (id, parent, isAdd) => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/student/parents/${id}`, {parent: parent, isAdd});

            if (isAdd) {
                let studentsId = [res.data.studentId];
                let resNext = await axios.get(`${API_URL}/classes/students/name`, {params: {studentsId}});

                if (resNext.data.length) {
                    dispatch(updateParentStudentClassName(parent.id, res.data.studentId, resNext.data[0].name));
                } else {
                    dispatch(updateParentStudentClassName(parent.id, res.data.studentId, 'none class'));
                }
            }
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const updateStudentBasicDataRequest = student => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/student/basic`,
                {
                    id: student.id, firstName: student.firstName,
                    lastName: student.lastName, birthDate: student.birthDate
                });
            dispatch(setAlertSuccess(true, `Student ${res.data.studentName} data has been changed.`));
            dispatch(updateStudent(student));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const deleteStudentRequest = studentId => {
    return async dispatch => {
        dispatch(startUpdatingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.delete(`${API_URL}/student/${studentId}`);

            if (res.data.ratings.length) {
                await axios.delete(`${API_URL}/ratings`,
                    {data: {ratingsId: res.data.ratings}})
            }
            dispatch(getStudentsNamesRequest());
            dispatch(getStudentsWithRangeRequest(1, 5));
            dispatch(setAlertSuccess(true, `Student ${res.data.studentName} has been removed.`));
            dispatch(stopUpdatingRequest());
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
