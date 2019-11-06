import React from 'react';
import PropTypes from 'prop-types';
import ClassBox from '../../features/ClassBox/ClassBox';

const ClassBoxList = props => {
    const {diaries} = props;
    return (
        <ul>
            {diaries.map((diary, i) => {
                return <ClassBox key={i} diary={diary}/>
            })}
        </ul>
    )
};

ClassBoxList.propTypes = {
    diaries: PropTypes.array.isRequired
};

export default ClassBoxList;
