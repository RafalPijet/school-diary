import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectItem from "../../common/SelectItem/SelectItem";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
// import './ParentItemCollapse.scss';
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import {checkStudentClass} from "../../../utilities/functions";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        color: theme.palette.action.light
    },
    info: {
        backgroundColor: theme.palette.secondary.dark,
        width: '240px',
        height: '88px',
        padding: theme.spacing(1),
        overflow: 'auto'
    }
}));

const ParentItemCollapse = props => {
    const {parent, allClasses, allStudents, updateUser, updateStudent, request, deleteParent} = props;
    const [parentStudents, setParentStudents] = useState([]);
    const [studentsWithoutParent, setStudentsWithoutParent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        let parentStudents = [];
        parent.students.forEach(student => {
            let item = {
                id: student.id,
                className: checkStudentClass(allClasses, student.id) !== null ?
                    checkStudentClass(allClasses, student.id) : "None class",
                firstName: student.firstName,
                lastName: student.lastName
            };
            parentStudents = [...parentStudents, item];
        });
        setParentStudents(parentStudents);
        setStudentsWithoutParent(allStudents.filter(student => student.parents.length === 0));
    }, [allClasses, allStudents, parent]);

    const getNewStudentForParent = async student => {
        parent.students.push(student);
        await updateUser(parent);
        parent.students = [];
        student.parents.push(parent);
        updateStudent(student);
    };

    const removeStudentFromParent = student => {
        let removedStudent = parent.students.find(item => item.id === student.id);
        removedStudent.parents = [];
        parent.students = parent.students.filter(item => item.id !== student.id);
        updateUser(parent);
        updateStudent(removedStudent);
    };

    const modalHandling = isDelete => {
        setIsModalOpen(false);

        if (isDelete) {
            if (parent.students.length) {
                parent.students.forEach(item => {
                    item.parents = [];
                    updateStudent(item);
                })
            }
            deleteParent(parent.id);
        }
    };

    return (
        <>
            <div className={classes.root}>
                <Tooltip
                    disabled={request.adding}
                    title='Remove parent'
                    arrow
                    placement='top'
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 1000}}
                >
                <span>
                    <IconButton
                        disabled={request.adding}
                        aria-label='remove'
                        className={classes.button}
                        onClick={() => setIsModalOpen(true)}
                    >
                    <DeleteIcon fontSize='large'/>

                </IconButton>
                </span>
                </Tooltip>
                <SelectItem
                    list={studentsWithoutParent}
                    isAdd={true}
                    selectName='unassigned students'
                    buttonName="Assign"
                    helperText='assign a student to the parent'
                    isDisabled={request.adding || !studentsWithoutParent.length}
                    confirmSelect={getNewStudentForParent}
                />
                <SelectItem
                    list={parentStudents}
                    isAdd={false}
                    selectName='assigned students'
                    buttonName='Unassign'
                    helperText='unassign a student to the parent'
                    confirmSelect={removeStudentFromParent}
                    isDisabled={request.adding || !parentStudents.length}/>
                <Paper variant='outlined' className={classes.info}>
                    {parentStudents.length ? parentStudents.map((student, i) => {
                        return (
                            <Typography key={i} variant='subtitle1'>
                                {`${i + 1}. ${student.firstName} ${student.lastName} - ${student.className}`}
                            </Typography>
                        )
                    }) : <Typography>The parent has no student assigned</Typography>}
                </Paper>
            </div>
            <ModalAreYouSure
                isOpen={isModalOpen}
                isConfirm={modalHandling}
                description={`Are you sure you want to delete the parent ${parent.lastName} ${parent.firstName}?`}
            />
        </>
    )


};

ParentItemCollapse.propTypes = {
    parent: PropTypes.object.isRequired,
    allClasses: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    deleteParent: PropTypes.func.isRequired
};

export default ParentItemCollapse;
