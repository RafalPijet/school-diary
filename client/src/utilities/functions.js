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

export const prepareStudentsData = (students, classes) => {
    let studentsList = [];
    students.forEach(student => {
        let studentItem = {};
        let className = 'none';
        studentItem.id = student.id;
        studentItem.firstName = student.firstName;
        studentItem.lastName = student.lastName;
        studentItem.birthDate = student.birthDate;
        studentItem.parent = student.parents.length ? `${student.parents[0].firstName} ${student.parents[0].lastName}` :
            'unassigned';
        classes.forEach(item => {
            item.students.forEach(studentInClass => {
                if (studentInClass.id === student.id) {
                    className = item.name;
                }
            })
        });
        studentItem.class = className;
        studentsList = [...studentsList, studentItem];
    });
    return studentsList;
};

export const sortByNameFromAToZ = (a, b) => {
    let comparision = 0;

    if (a.name > b.name) {
        comparision = 1;
    } else if (a.name < b.name) {
        comparision = -1;
    }
    return comparision
};

export const sortByLastnameFromAToZ = (a, b) => {
    let comparision = 0;

    if (a.lastName > b.lastName) {
        comparision = 1;
    } else if (a.lastName < b.lastName) {
        comparision = -1;
    }
    return comparision
}

