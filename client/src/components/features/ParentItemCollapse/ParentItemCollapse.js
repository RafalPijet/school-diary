import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import SelectItem from "../../common/SelectItem/SelectItem";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "../../common/Spinner/Spinner";
import {Paper, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import componentStyle from "./ParentItemCollapseStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentItemCollapse = props => {
    const {parent, allStudents, updateUser, updateStudent, request, deleteParent} = props;

    const [studentsWithoutParent, setStudentsWithoutParent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [parentStudentsId, setParentStudentsId] = useState(parent.students.map(student => student.id));
    const classes = useStyles();

    useEffect(() => {
        setParentStudentsId(parent.students.map(student => student.id));
    }, [parent.students]);

    useEffect(() => {
        let freeStudents = allStudents.filter(student => !parentStudentsId.includes(student.id));
        setStudentsWithoutParent(freeStudents);

    }, [allStudents, parent.students, parentStudentsId]);

    const getNewStudentForParent = async student => {
        let students = [...parent.students, student];
        await updateUser(parent.id, students);
        updateStudent(student.id, parent, true);
    };

    const removeStudentFromParent = async student => {
        let students = parent.students.filter(item => item.id !== student.id);
        await updateUser(parent.id, students);
        updateStudent(student.id, parent, false);
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
                    classes={{tooltip: classes.tooltip}}
                    placement='top-start'
                    TransitionComponent={Fade}
                    TransitionProps={{timeout: 1000}}
                >
                <span className={request.adding ? classes.progress : ''}>
                    <IconButton
                        disabled={request.adding}
                        aria-label='remove'
                        className={classes.button}
                        onClick={() => setIsModalOpen(true)}
                    >
                    <DeleteIcon fontSize='small'/>

                </IconButton>
                </span>
                </Tooltip>
                <SelectItem
                    parentId={`${parent.id} add`}
                    list={studentsWithoutParent}
                    isAdd={true}
                    selectName='unassigned students'
                    buttonName="Assign"
                    isDisabled={request.adding}
                    confirmSelect={getNewStudentForParent}
                />
                <SelectItem
                    parentId={parent.id}
                    list={parent.students}
                    isAdd={false}
                    selectName='assigned students'
                    buttonName='Unassign'
                    confirmSelect={removeStudentFromParent}
                    isDisabled={request.adding}/>
                <Paper variant='outlined' className={clsx(classes.info, request.adding && classes.spinner)}>
                    {request.adding ? <Spinner/> :
                        parent.students.length ? parent.students.map((student, i) => {
                            return (
                                <div key={i}>
                                    <Typography className={classes.second} display='inline'>
                                        {`${i + 1}. `}
                                    </Typography>
                                    <Typography variant='subtitle2' display='inline'>
                                        {`${student.firstName} ${student.lastName}`}
                                    </Typography>
                                    <Typography className={classes.second} display='inline'>
                                        {` ${student.birthDate.substring(0, 10)}, ${student.className}`}
                                    </Typography>
                                </div>
                            )
                        }) : <Typography variant='subtitle2'>The parent has no student assigned</Typography>}
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
    allStudents: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    deleteParent: PropTypes.func.isRequired
};

export default ParentItemCollapse;
