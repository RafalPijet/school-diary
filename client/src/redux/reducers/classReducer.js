import {
    LOAD_CLASS_BY_TEACHER_ID,
    SELECT_CLASS,
    ADD_RATING_TO_STUDENT,
    UPDATE_RATING_TO_STUDENT,
    LOAD_ALL_CLASSES,
    ADD_USER_TO_CLASS,
    UPDATE_CLASS,
    ADD_NEW_CLASS,
    UPDATE_STUDENT_IN_TEACHER_CLASS
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
        case ADD_USER_TO_CLASS:
            return {
                ...state, allClasses: state.allClasses.map(item => {

                    if (item.id === action.classContent.id) {
                        return action.classContent
                    } else {
                        return item
                    }
                })
            };
        case UPDATE_CLASS:
            return {
                ...state, allClasses: state.allClasses.map(item => {
                    if (item.id === action.classItem.id) {
                        return action.classItem;
                    } else {
                        return item;
                    }
                })
            };
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
        default:
            return state;
    }
};

export default reducer;
