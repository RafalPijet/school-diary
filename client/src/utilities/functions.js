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
        "Hello dear teacher. We hope that working with our product will help you at work.",
        "In the Class Diaries section you can choose the class in which you teach.",
        "By adding a new grade for a student, you can choose the grade scale and description.",
        "Remember that you can edit or delete any existing rating.",
        "In the Teacher Data section you have a preview of all your students... ",
        "...and contact details with their parents or guardians.",
        "You can also edit your personal data."
    ],
    diaries: [
        "Here you can choose the diary of the school class in which you teach.",
        "To add a grade to the selected student, press the green icon...",
        "...the window for setting the rating value will open.",
        "Hover over the stars icons and set the rating value. Click the desired value.",
        "Select the rating scale and its description, and then confirm by clicking the confirmation icon...",
        "...rating has been added. See how easy it is.",
        "As you noticed, the scale of the rating is determined by its color.",
        "If you want to check the rating description and date of issue,...",
        "...hover over the selected rating with the mouse pointer, and you will see a preview of this data.",
        "You can edit the parameters of an already issued student grade.",
        "To do this, click on the selected student's grade. A window will open in which you can change...",
        "...the rating parameters. Be sure to confirm the changes by clicking the icon confirming the changes.",
        "You can also delete the selected student grade in this window."
    ],
    data: [
        "In the students list section you have a preview of all the students you teach.",
        "In addition to basic information about a given student,...",
        "...you also have contact details of his parents or guardians.",
        "In the edit teacher data section, you can edit your data.",
        "Remember to change your password from time to time. This is important for your and your students' safety."
    ]
};

export const parentDescription = {
    home: [
        "Hello dear parent. Thank you for choosing our product",
        'You can check the grades in all subjects',
        "You have access to contact the teachers in the class and the tutor",
        "You can edit your details and check student details"
    ],
    ratings: [
        "If you are the parent or guardian of more students, select the one whose school grades you are interested in.",
        "To check the evaluation parameters, hover over the selected one...",
        "...you'll then see a preview of the grade description, scale, date of issue, and the teacher who added it.",
    ],
    data: [
        "Here you can view all students you are a parent or guardian of.",
        "You can also edit your personal data."
    ],
    teachers: [
        "In this section you have information about the school class in which each...",
        "... of your children or pupils is located.",
        "You have access to the class tutor contact details",
        "You also have contact details for any teacher who teaches your child or student."
    ]
};

export const principalDescription = {
    home: [
        'Hello dear principal. Thank you for choosing our product',
        'In the Classes section you can add new school classes.',
        'You can also configure the composition of students in the class.',
        'You can assign teachers of a given subject to a selected class',
        'You determine which teacher is the class tutor',
        'In the Teachers section you have a preview of all teachers with contact details...',
        '...and information in which they teach classes and how many students they have',
        'You can remove an individual teacher from the school\'s teachers list',
        'In the Students section you have a preview of all students with information about their class...',
        '...and contact details for their parents or guardians.',
        'You can also add new students or edit existing data...',
        '...including removing a selected student from the school\'s student list.',
        'In the Parents section you can view information about all parents or guardians.',
        'You can assign each student to the appropriate student or students',
        'You can delete an individual parent from the list'
    ],
    classes: [
        "In this section you create new school classes and configure, delete existing classes",
        "To create a new class, select a name from the list of possible names.",
        "Then select a class tutor from the list of possible tutors who are not yet class tutors",
        "After choosing the name and tutor, click 'add class'",
        "To change the class configuration, select a name from the list of available classes.",
        "In the left window you can see a list of class students and in the right a list of teachers.",
        "To change the student list, click the 'students list change mode' button.",
        "In the left window you will then see a list of class students, and in the right list you will...",
        "...see available students who are not yet assigned to any class.",
        "Select the appropriate items and use the arrow buttons to change the contents of the lists.",
        "If you make a change, the 'Confirm new list content' button will light up green. Click to confirm the change.",
        "To change the teacher list, click the 'class teachers list change mode' button.",
        "The configuration of the teacher list is the same as for students.",
        "Don't forget to confirm the changes by clicking on the green button.",
        "You can also change the tutor.",
        "Select the appropriate one from the list and confirm by clicking 'replace tutor'.",
        "To remove the selected class, click the 'remove current class' button...",
        "...remember, this operation is irreversible!"
    ],
    teachers: [
        "Here you have a list of all teachers.",
        "You have contact details for each teacher, a list of classes in which he teaches,...",
        "...and the number of students he teaches.",
        "You can remove a selected teacher from the teacher list.",
        "Remember, however, that for this to happen, you must ensure that the teacher to be removed...",
        "... is not an tutor or a teacher in any class."
    ],
    students: [
        "In the 'students list' section you have a list of all students in your school.",
        "Here you will find information about each student and his parents or guardians.",
        "You can edit personal data about the selected student.",
        "To do this, click the green 'open edit mode' icon. You can then change your name, surname and date of birth.",
        "If the data has changed, a green icon will appear in place of the trash icon to confirm the changes...",
        "...click it to save the changes.",
        "In the 'add student' section you can add a new student.",
        "Enter the new student data and confirm with the green button."
    ],
    parents: [
        "This is a list of parents or guardians of all students in your school.",
        "In the basic form of display you have access to the contact details of each parent or guardian.",
        "For details, click on the selected parent or guardian.",
        "You will then see a list of students of the parent or guardian.",
        "You can assign individual students to the selected parent or guardian.",
        "You can also remove the selected parent or guardian by clicking the 'remove parent' button."
    ]
};

export const welcomeDescription = {
    home: [
        'Select the Login button to log in as a user.',
        'Select the Registration button to register in the system as a parent / guardian or teacher.'
    ],
    login: [
        'Enter email address and password.',
        'The system will check whether you are a registered user.',
        'If the password is not correct, enter it again'
    ],
    registration: [
        'Select the user type. If you are a teacher, choose your subject.',
        'Enter the remaining data and set your password.',
        'If you enter all the data correctly, the system will display the readiness with a green button color.',
        'Press the button. If everything goes correctly, the system will take you to the login section.'
    ]
};

