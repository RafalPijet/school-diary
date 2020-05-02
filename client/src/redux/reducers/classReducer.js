import {
    LOAD_CLASS_BY_TEACHER_ID,
    SELECT_CLASS,
    ADD_RATING_TO_STUDENT,
    UPDATE_RATING_TO_STUDENT,
    LOAD_ALL_CLASSES,
    ADD_USER_TO_CLASS,
    UPDATE_CLASS,
    ADD_NEW_CLASS
} from "../actions/classActions";

const initialState = {
    allClasses: [],
    teacherAllClass: [],
    selectedClass: {},
    availableNames: {
        grade: ['1', '2', '3', '4', '5', '6', '7', '8'],
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
            return {...state, selectedClass: action.diary};
        case ADD_RATING_TO_STUDENT:
            return {
                ...state, teacherAllClass: state.teacherAllClass.map(classItem => {

                    if (classItem.id === action.classId) {
                        classItem.students.map(student => {
                            student.ratings.forEach(rating => {
                                if (rating.id === action.rating.id) {
                                    student.ratings[student.ratings.indexOf(rating)] = action.rating;
                                    return {...classItem.students, student}
                                }
                            });
                            return {...classItem.students, student}
                        })
                    } else {
                        return classItem
                    }
                    return classItem
                })
            };
        case UPDATE_RATING_TO_STUDENT:
            return {
                ...state, teacherAllClass: state.teacherAllClass.map(classItem => {

                    if (classItem.id === action.classId) {
                        classItem.students.map(student => {

                            if (student.id === action.studentId) {
                                student.ratings = student.ratings.map(rating => {
                                    return (rating.id === action.rating.id) ? action.rating : rating
                                });
                            }
                            return {...classItem.students, student};
                        })
                    }
                    return classItem;
                })
            };
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
        default:
            return state;
    }
};

export default reducer;
