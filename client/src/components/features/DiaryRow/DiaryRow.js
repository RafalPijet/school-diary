import React from 'react';
import PropTypes from 'prop-types';
import RatingItem from '../../common/RatingItem/RatingItem';
import Button from '../../common/Button/Button';
import RatingOptions from '../../features/RatingOptions/RatingOptionsContainer';
import './DiaryRow.scss';

class DiaryRow extends React.Component {
    state = {
        studentRatings: [],
        studentId: "",
        ratingValue: "",
        plusOrMinus: ""
    };

    componentDidMount() {
        const {student, teacher} = this.props;
        let result = [];
        student.ratings.forEach(item => {

            if (teacher.subject === item.subject) {
                result = item.ratings.map(rating => {
                    return rating;
                })
            }
        });
        this.setState({
            studentRatings: result,
            studentId: student.id
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isPlus !== null) {
            nextProps.isPlus ? this.setState({plusOrMinus: "+"}) : this.setState({plusOrMinus: "-"})
        } else {
            this.setState({plusOrMinus: ""})
        }

        if (nextProps.isNewRating.isNew) {
            this.setState({ratingValue: nextProps.ratingValue});
        }
    }

    addRating = () => {
        const {teacher, setIsNewRating, isNewRating} = this.props;
        const {studentId} = this.state;

        if (!isNewRating.isNew) {
            let rating = {
                value: "",
                description: "",
                scales: 1,
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
        const {ratingValue, plusOrMinus, studentRatings} = this.state;
        const {
            setIsNewRating, setIsPlus, setRatingValue, selectedDescription,
            selectedScales, setDescription, setScales
        } = this.props;

        if (ratingValue !== '' && (plusOrMinus !== "+" || ratingValue !== "6")
            && (plusOrMinus !== "-" || ratingValue !== "1")) {
            let newRating = studentRatings[studentRatings.length - 1];
            newRating.value = ratingValue + plusOrMinus;
            newRating.description = selectedDescription;
            newRating.scales = selectedScales;
            studentRatings[studentRatings.length - 1] = newRating;
            this.setState({studentRatings: studentRatings});
            setIsNewRating(false, "");
            setIsPlus(null);
            setRatingValue("");
            setDescription("");
            setScales(1);
        }
    };

    render() {
        const {student, i, isNewRating, setRatingValue} = this.props;
        const {studentRatings, studentId} = this.state;
        const {addRating, enterRating, cancelHandling} = this;

        return (
            <tr>
                <td style={{width: "1rem"}}>{i + 1}</td>
                <td style={{width: "20rem"}}>{`${student.firstName} ${student.lastName}`}</td>
                <td>{studentRatings.map((rating, index) => {
                    return <RatingItem key={index} rating={rating} isNewRating={isNewRating}
                                       setRatingValue={setRatingValue}/>
                })}
                    <span className='buttons-main'>
                    <Button disabled={isNewRating.isNew && studentId !== isNewRating.studentId}
                            variant={(isNewRating.isNew && studentId !== isNewRating.studentId) ? "off" : "success"}
                            title={isNewRating.isNew ? "Enter rating" : "Add rating"}
                            onClick={(isNewRating.isNew && isNewRating.studentId === studentId) ? enterRating : addRating}>
                        {(isNewRating.isNew && isNewRating.studentId === studentId) ? 'Enter' : 'Add'}</Button>
                    <RatingOptions hidden={!(isNewRating.isNew && isNewRating.studentId === studentId)}
                                   studentId={studentId} cancelHandling={cancelHandling}/>
                </span>
                </td>
            </tr>
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
    setScales: PropTypes.func.isRequired
};

export default DiaryRow;
