import React from 'react';
import PropTypes from 'prop-types';
import RatingItem from '../../common/RatingItem/RatingItem';
import Button from '../../common/Button/Button';
import RatingOptions from '../../features/RatingOptions/RatingOptions';
import './DiaryRow.scss';

class DiaryRow extends React.Component {
    state = {
        studentRatings: [],
        isNewRating: false,
        studentId: "",
        plusOrMinus: null
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

    addRating = () => {
        const {teacher} = this.props;
        let rating = {
            value: "",
            description: "",
            date: new Date(),
            teacher: `${teacher.firstName} ${teacher.lastName}`
        };
        this.setState({
            studentRatings: [...this.state.studentRatings, rating],
            isNewRating: true
        });
    };

    plusOrMinusHandling = event => {
        this.setState({plusOrMinus: event.target.value})
    };

    render() {
        const {student, i} = this.props;
        const {studentRatings, isNewRating, studentId} = this.state;
        const {addRating, plusOrMinusHandling} = this;

        return (
            <tr>
                <td style={{width: "1rem"}}>{i + 1}</td>
                <td style={{width: "20rem"}}>{`${student.firstName} ${student.lastName}`}</td>
                <td>{studentRatings.map((rating, index) => {
                    return <RatingItem key={index} rating={rating}/>
                })}
                <span className='buttons-main'>
                    <Button variant="success" title="Add rating" onClick={addRating}>{isNewRating ? 'Enter' : 'Add'}</Button>
                    <RatingOptions plusOrMinus={plusOrMinusHandling} hidden={!isNewRating} studentId={studentId}/>
                </span>
                </td>
            </tr>
        )
    }
}

DiaryRow.propTypes = {
    student: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    teacher: PropTypes.object.isRequired
};

export default DiaryRow;
