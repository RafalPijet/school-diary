import React from 'react';
import {Table} from 'reactstrap';
import RatingSubject from '../../features/RatingSubject/RatingSubject';

const RatingSubjectList = props => {
    const {student} = props;
    return (
        <div>
            <Table dark>
                <tbody>
                {student.ratings.map(item => {
                    return <RatingSubject key={item.id} ratings={item}/>
                })}
                </tbody>
            </Table>
        </div>
    )
};

export default RatingSubjectList;
