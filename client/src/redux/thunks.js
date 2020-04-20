import axios from 'axios';
import {API_URL} from "../config";
import {setUser, setLogin, loadTeachers, loadParents, updateParent, deleteParent} from "./actions/usersActions";
import {
    loadClassByTeacher,
    addRatingToStudent,
    loadAllClasses,
    addUserToClass,
    updateClass
} from "./actions/classActions";
import {
    startRequest,
    stopRequest,
    errorRequest,
    startAddingRequest,
    stopAddingRequest,
    startWorkingRequest,
    stopWorkingRequest
} from "./actions/requestActions";
import {loadAllStudents, updateStudent, deleteStudent, addStudent} from "./actions/studentActions";

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

export const loadAllClassByTeacherId = teacherId => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/class/${teacherId}`);
            dispatch(loadClassByTeacher(res.data));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const updateClassRequest = classItem => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/class`, classItem);
            dispatch(updateClass(res.data));
            dispatch(stopWorkingRequest());
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
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.put(`${API_URL}/ratings/${dataPackage.ratingsId}`, dataPackage.rating);
            dispatch(stopRequest());
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
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/teachers`);
            dispatch(loadTeachers(res.data));
            dispatch(stopWorkingRequest());
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
            await axios.post(`${API_URL}/class`, payload);
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
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

export const addStudentToClassRequest = payload => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        await new Promise(resolve => setTimeout(resolve, 2000));
        let student = {
            classId: payload.classId,
            user: payload.user
        };
        const addRatings = async () => {
            for (const subject of payload.subjects) {

                try {
                    let item = {
                        studentId: payload.user.id,
                        subject: subject
                    };
                    let res = await axios.post(`${API_URL}/rating`, item);
                    student.user.ratings = [...student.user.ratings, res.data];
                } catch (err) {
                    dispatch(errorRequest(err.message));
                }
            }
        };
        await addRatings();
        try {
            await axios.put(`${API_URL}/student`, student.user);
            let res = await axios.post(`${API_URL}/class/student`, student);
            dispatch(addUserToClass(res.data));
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const addTeacherToClassRequest = payload => {
    return async dispatch => {
        dispatch(startWorkingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/class/teacher`, payload);
            dispatch(addUserToClass(res.data));
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const addStudentRequest = student => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/student`, student);
            dispatch(addStudent(res.data));
            dispatch(stopRequest());
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
