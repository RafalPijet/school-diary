export const createActionName = (reducerName, name) => `app/${reducerName}/${name}`;

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
};

export const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

export const teacherDescription = {
    home: [
        "Hello, dear Teacher. We hope that our product will help you at work.",
        "In the Class Diaries section you can choose the classes in which you teach.",
        "While adding a new grade for a student, you can choose the grade's scale and description.",
        "Remember that you can always edit or delete an existing rating.",
        "In the Teacher's Data section you can see a list of all your students... ",
        "...and their parents or guardians' contact details.",
        "You can also edit your personal data."
    ],
    diaries: [
        "Here you can choose the diary of the class in which you teach.",
        "To add a grade to the selected student, press the green icon...",
        "...then, a window for setting the exact mark will open.",
        "Hover over the stars' icons and set the grade's value. Click on the desired one.",
        "Select the grade's scale and its description, then confirm by clicking the tick icon...",
        "...the grade has been added. Look how easy and simple it is.",
        "As you probably noticed, the grade's scale is determined by its color.",
        "If you want to check the grade's description and date of issue, hover over it.",
        "You can edit the parameters of an already issued grade.",
        "In order to do this, click on the selected grade. A window in which you can change...",
        "...the rating parameters will open. Be sure to confirm the changes by clicking the tick icon.",
        "You can also delete the selected grade in this window."
    ],
    data: [
        "In the students' list section you have a preview of all the students you teach.",
        "In addition to basic information about a given student,...",
        "...you also see contact details of his parents or guardians there.",
        "In the edit teacher's data section, you can edit your data.",
        "Remember to change your password from time to time. This is important for your and your students' safety."
    ]
};

export const parentDescription = {
    home: [
        "Hello, dear Parent. Thank you for choosing our product.",
        'Here, you can check the grades of all subjects.',
        "You are also able to contact the teachers.",
        "You can edit your data and check your children's."
    ],
    grades: [
        "If you are the parent or guardian of more than one student,...",
        "...select the one whose grades you are interested in viewing.",
        "To check the selected grade's parameters, hover over it...",
        "...you'll then see the grade's description, scale, date of issue, and the teacher who added it.",
    ],
    data: [
        "Here you can view all students you are a parent or guardian of.",
        "You can also edit your personal data."
    ],
    teachers: [
        "In this section you can see information about the class to which each...",
        "... of your children is assigned.",
        "You have access to the class teacher's contact details, as well as to the other teachers."
    ]
};

export const principalDescription = {
    home: [
        'Hello, dear Principal. Thank you for choosing our product',
        'In the Classes section you can add new classes.',
        'You can also change the list of students in each class.',
        'You can assign teachers of a certain subject to a selected class.',
        'You are able to determine who is the class teacher of each class.',
        'In the Teachers section you have a list of all teachers with their contact details...',
        '...and information about classes they teach and how many students are in them.',
        'You can remove a selected teacher from the school\'s teachers list.',
        'In the Students section you have a list of all students with information about their class...',
        '...and contact details of their parents or guardians.',
        "You can also add new students or edit the existing ones' data...",
        '...as well as remove a selected student from the school\'s student list.',
        'In the Parents section you can view information about all parents or guardians.',
        'You can assign each student to the destined parents or guardians.',
        'You can also delete an individual parent from the list.'
    ],
    classes: [
        "In this section you can add new classes and edit or delete already existing ones.",
        "In order to create a new class, select a name from the list of available ones.",
        "Then select a class teacher from the list of possible ones.",
        "After choosing the name and the class teacher, click on the 'add class' button.",
        "To edit the class, select a name from the list of available ones.",
        "In the left window you can see a list of the class's students and on the right a list of teachers.",
        "To change the student's list, click on the 'students' list change mode' button.",
        "In the left window you will then see a list of the current class students, and on the right you will...",
        "...see a list of students who are not yet assigned to any class.",
        "Select the appropriate items and use the arrow buttons to change the lists' contents.",
        "If you make a change, the 'Confirm new list content' button will turn green. Click on it to save the change.",
        "To change the teachers' list, click on the 'class teachers' list change mode' button.",
        "Editing the teachers' list is the same as in the students' case.",
        "Don't forget to save the changes by clicking on the green button.",
        "You can also change the class teacher.",
        "Select the destined one from the list and confirm it by clicking 'replace the class teacher'.",
        "To remove a selected class, click on the 'remove current class' button...",
        "...remember, you can't undo this operation!"
    ],
    teachers: [
        "You can see a list of all teachers here.",
        "As well as contact details for each one of them, a list of classes in which they teach,...",
        "...and the number of their students.",
        "You can remove a selected teacher from the teachers' list.",
        "However, remember that for this to happen, you must make sure that the teacher that is to be removed...",
        "... is not a class teacher or a teacher in any class."
    ],
    students: [
        "In the 'students' list' section you can see a list of all students in your school.",
        "You will find information about each student and their parents or guardians here.",
        "You can edit personal data about the selected student.",
        "In order to do this, click on the green 'open edit mode' icon. You can then change their name, surname and date of birth.",
        "If the data has changed, a green icon will appear in the place of the trash icon...",
        "...click on it to save the changes.",
        "In the 'add student' section you can add a new student.",
        "Enter the new student's data and save it with the green button."
    ],
    parents: [
        "This is a list of parents or guardians of all students in your school.",
        "In the basic form of display you can see the contact details of each parent or guardian.",
        "For more details, click on the chosen parent or guardian.",
        "You will then see a list of students assigned to them.",
        "You can assign individual students to the selected parent or guardian.",
        "You can also remove the selected parent or guardian by clicking the 'remove parent' button."
    ]
};

export const welcomeDescription = {
    home: [
        'Select the Login button to log in as a user.',
        'Select the Registration button to register in the system as a parent / guardian or a teacher.'
    ],
    login: [
        'Enter your email address and password.',
        'The system will check whether you are a registered user.',
        'If the password is not correct, enter it again',
        'If you have forgotten your password, you can reset it.'
    ],
    registration: [
        'Select your user type. If you are a teacher, choose your subject.',
        'Enter the remaining data and set your password.',
        'After entering all data correctly, the gray button will turn green.',
        'Press the button. If everything goes right, the system will take you to the login section.'
    ],
    reset: [
        'Set a new password for the account you want to reset',
        'Confirm new password. Remember that the passwords must be the same.',
        'Press the button. If all goes well, the system will take you to the login section'
    ]
};

export const setExpiryDate = minutes => {
    const remainingMilliseconds = minutes * 60 * 1000;
    const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
    );
    localStorage.setItem('expiryDate', expiryDate.toISOString());
}

export const clearLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
}

export const countRemainingTime = () => {
    const expiryDate = localStorage.getItem('expiryDate');
    return new Date(expiryDate).getTime() - new Date().getTime();
}
