import {
    LOAD_CLASS_BY_TEACHER_ID,
    SELECT_CLASS,
    ADD_RATING_TO_STUDENT,
    UPDATE_RATING_TO_STUDENT,
    LOAD_ALL_CLASSES,
    ADD_NEW_CLASS,
    UPDATE_STUDENT_IN_TEACHER_CLASS,
    UPDATE_DATA_IN_SELECTED_CLASS,
    UPDATE_TUTOR_IN_SELECTED_CLASS,
    UPDATE_TUTOR_IN_ALL_CLASSES,
    UPDATE_LIST_IN_SELECTED_CLASS,
    DELETE_CLASS_IN_ALL_CLASSES
} from "../actions/classActions";

const initialState = {
    allClasses: [],
    teacherAllClass: [],
    selectedClass: {},
    availableNames: {
        grade: ['4', '5', '6', '7', '8'],
        type: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CLASS_BY_TEACHER_ID:
            return {...state, teacherAllClass: action.allClass};
        case LOAD_ALL_CLASSES:
            return {...state, allClasses: action.allClasses};
        case SELECT_CLASS:
            return {...state, selectedClass: action.classItem};
        case ADD_RATING_TO_STUDENT:

            if (state.selectedClass.id === action.classId) {
                return {
                    ...state, selectedClass: {
                        ...state.selectedClass,
                        students: state.selectedClass.students.map(student => {
                            student.ratings.forEach(rating => {

                                if (rating.id === action.rating.id) {
                                    student.ratings[student.ratings.indexOf(rating)] = action.rating;
                                }
                            });
                            return student
                        })
                    }
                };
            }
            break;
        case UPDATE_RATING_TO_STUDENT:

            if (state.selectedClass.id === action.classId) {
                return {
                    ...state, selectedClass: {
                        ...state.selectedClass,
                        students: state.selectedClass.students.map(student => {

                            if (student.id === action.studentId) {
                                student.ratings = student.ratings.map(rating => {
                                    return (rating.id === action.rating.id) ? action.rating : rating
                                });
                            }
                            return student;
                        })
                    }
                }
            }
            break;
        case ADD_NEW_CLASS:
            return {
                ...state, allClasses: [...state.allClasses, action.newClass]
            };
        case UPDATE_STUDENT_IN_TEACHER_CLASS:
            return {
                ...state, selectedClass:
                    {
                        ...state.selectedClass, students: state.selectedClass.students.map(student => {
                            return (student.id === action.student.id) ? action.student : student
                        })
                    }
            };
        case UPDATE_DATA_IN_SELECTED_CLASS:
            return {
                ...state, selectedClass: {
                    ...state.selectedClass,
                    students: action.data.students,
                    subjectTeachers: action.data.subjectTeachers
                }
            };
        case UPDATE_TUTOR_IN_SELECTED_CLASS:
            return {
                ...state, selectedClass: {
                    ...state.selectedClass, mainTeacher: action.tutor
                }
            };
        case UPDATE_TUTOR_IN_ALL_CLASSES:
            return {
                ...state, allClasses: state.allClasses.map(item => {

                    if (item.id === action.classId) {
                        item.mainTeacher = {id: action.tutorId};
                    }
                    return item;
                })
            };
        case UPDATE_LIST_IN_SELECTED_CLASS:
            return {
                ...state, selectedClass: {
                    ...state.selectedClass,
                    [action.isStudent ? 'students' : 'subjectTeachers']: action.list
                }
            };
        case DELETE_CLASS_IN_ALL_CLASSES:
            return {...state, allClasses: state.allClasses.filter(item => item.id !== action.id)};
        default:
            return state;
    }
};

export default reducer;
