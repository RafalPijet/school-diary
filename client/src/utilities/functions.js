export const createActionName = (reducerName, name) => `app/${reducerName}/${name}`;

export const checkStudentClass = (classes, studentId) => {
    let className = null;
    classes.forEach(item => {
        item.students.forEach(student => {
            if (student.id === studentId) {
                className = item.name;
            }
        })
    });
    return className
};
