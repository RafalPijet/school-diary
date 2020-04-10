import React from 'react';
import PropTypes from 'prop-types';
import RatingItem from '../../common/RatingItem/RatingItem';
import Button from '../../common/Button/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RatingOptions from '../../features/RatingOptions/RatingOptionsContainer';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

// import './DiaryRow.scss';

class DiaryRow extends React.Component {
    state = {
        studentRatings: [],
        studentId: "",
        ratingsId: "",
        ratingValue: "",
        plusOrMinus: "",
        anchorEl: null
    };

    componentDidMount() {
        const {student, teacher} = this.props;
        const {actualizeRatings} = this;
        actualizeRatings(student, teacher)
    }

    componentWillReceiveProps(nextProps) {
        const {actualizeRatings} = this;

        if (nextProps.isPlus !== null) {
            nextProps.isPlus ? this.setState({plusOrMinus: "+"}) : this.setState({plusOrMinus: "-"})
        } else {
            this.setState({plusOrMinus: ""})
        }

        if (nextProps.isNewRating.isNew) {
            this.setState({ratingValue: nextProps.ratingValue});
        }

        if (!nextProps.isNewRating.isNew) {
            actualizeRatings(nextProps.student, nextProps.teacher);
        }
    }

    handleClick = event => {
        // console.log(event.currentTarget);
        this.setState(this.state.anchorEl ? null : event.currentTarget)
    };

    open = Boolean(this.state.anchorEl);

    id = this.open ? 'transitions-popper' : undefined;

    actualizeRatings = (student, teacher) => {
        student.ratings.forEach(item => {

            if (teacher.subject === item.subject) {
                this.setState({
                    studentRatings: item.ratings,
                    ratingsId: item.id,
                    studentId: student.id
                });
            }
        });
    };

    addRating = () => {
        const {teacher, setIsNewRating, isNewRating} = this.props;
        const {studentId} = this.state;

        if (!isNewRating.isNew) {
            let rating = {
                value: "",
                description: "",
                scales: 0,
                date: new Date(),
                teacher: `${teacher.firstName} ${teacher.lastName}`
            };
            this.setState({
                studentRatings: [...this.state.studentRatings, rating]
            });
            setIsNewRating(true, studentId);
        }
    };

    cancelHandling = () => {
        const {studentRatings} = this.state;
        const {setIsNewRating, setIsPlus, setRatingValue, setDescription, setScales} = this.props;
        studentRatings.pop();
        this.setState({studentRatings: studentRatings});
        setIsNewRating(false, "");
        setIsPlus(null);
        setRatingValue("");
        setDescription("");
        setScales(1);
    };

    enterRating = () => {
        const {ratingValue, plusOrMinus, studentRatings, ratingsId} = this.state;
        const {
            setIsNewRating, setIsPlus, setRatingValue, selectedDescription,
            selectedScales, setDescription, setScales, addRating
        } = this.props;

        if (ratingValue !== '' && (plusOrMinus !== "+" || ratingValue !== "6")
            && (plusOrMinus !== "-" || ratingValue !== "1")) {
            let newRating = studentRatings.pop();
            newRating.value = ratingValue + plusOrMinus;
            newRating.description = selectedDescription;
            newRating.scales = selectedScales;
            let dataPackage = {
                rating: newRating,
                ratingsId: ratingsId
            };
            addRating(dataPackage);
            setIsNewRating(false, "");
            setIsPlus(null);
            setRatingValue("");
            setDescription("");
            setScales(1);
        }
    };

    render() {
        const {student, i, isNewRating, setRatingValue, request} = this.props;
        const {studentRatings, studentId} = this.state;
        const {addRating, enterRating, cancelHandling} = this;

        return (
            <TableRow hover>
                <TableCell align='center'>{i + 1}</TableCell>
                <TableCell align='left'>{`${student.firstName} ${student.lastName}`}</TableCell>
                <TableCell align='left'>{studentRatings.map(rating => {
                    return (
                        <React.Fragment key={rating._id}>
                            <RatingItem rating={rating} onClick={this.handleClick} aria-describedby={this.id}/>
                            <Popper id={this.id} open={this.open} anchorEl={this.state.anchorEl} transition>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <div>The content of the Popper.</div>
                                    </Fade>
                                )}
                            </Popper>
                        </React.Fragment>

                    )
                })}
                    <span className='buttons-main'>
                    <Button disabled={(isNewRating.isNew && studentId !== isNewRating.studentId) || request.adding}
                            variant={((isNewRating.isNew && studentId !== isNewRating.studentId) || request.adding) ? "off" : "success"}
                            title={isNewRating.isNew ? "Enter rating" : "Add rating"}
                            onClick={(isNewRating.isNew && isNewRating.studentId === studentId) ? enterRating : addRating}>
                        {(isNewRating.isNew && isNewRating.studentId === studentId) ? 'Enter' : 'Add'}</Button>
                    <RatingOptions hidden={!(isNewRating.isNew && isNewRating.studentId === studentId)}
                                   studentId={studentId} cancelHandling={cancelHandling}/>
                </span>
                </TableCell>
            </TableRow>
        )
    }
}

DiaryRow.propTypes = {
    student: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    teacher: PropTypes.object.isRequired,
    isPlus: PropTypes.bool,
    setIsPlus: PropTypes.func.isRequired,
    setIsNewRating: PropTypes.func.isRequired,
    setRatingValue: PropTypes.func.isRequired,
    isNewRating: PropTypes.object.isRequired,
    ratingValue: PropTypes.string.isRequired,
    selectedDescription: PropTypes.string.isRequired,
    selectedScales: PropTypes.number.isRequired,
    setDescription: PropTypes.func.isRequired,
    setScales: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default DiaryRow;
